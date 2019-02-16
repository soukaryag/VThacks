const baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/";
const trainingUrlPart = "v2.2/Training/projects/";
const predictionUrlPart = "v2.0/Prediction/";

const mode = "predict";
const camera = findGetParameter("camera") || "environment";

const projectId = "485c9008-0bff-4139-be7d-b2072b892793";
const trainingApiKey = "27292699f01a4ec4b8452e544766810e";
const predictionApiKey = "029c7c7b1ca74759b6ea2b5e2bca4b44";

var tags = [];

var currentStream;
var isFrontCam = false;

function setupUIForMode(mode) {
    var spinner = new Spinner().spin(document.getElementById("loading"));
    $("#loading").hide();

    if(mode == "train" && projectId && trainingApiKey) {
        $('#tag-selector').show();
        $("#title").text("Image Classifier Training");

        fetchTags();
    }
    else if(mode == "predict" && projectId && predictionApiKey) {
      $('#tag-selector').show();
      $("#welcome").text("welcome");
    }
    else {
        $("#controls").hide();
        $("#title").text("Please specify a mode param (train, predict, or play), a projectId param, and either a trainingApiKey or predictionApiKey based on the mode");
    }
}

function flipCameraButtonPressed() {
    if(currentStream) {
        stopCamera(currentStream);

        isFrontCam = !isFrontCam;

        configureVideo();
    }
}

function stopCamera(stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }

function captureButtonPressed() {
    showLoading(true);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const video = document.getElementById("videoElement");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0,0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);

    if(mode == "train"){
        submitTrainingImage(imageDataUrl);
    }
    else if(mode == "predict") {
        predictFromImage(imageDataUrl);
    }
    else if(mode == "play") {
        predictFromImage(imageDataUrl);
    }
}

//training functions
function fetchTags() {
    $.ajax({
        url: baseUrl + trainingUrlPart + projectId + "/tags",
        headers: {
            'Training-Key': trainingApiKey,
            'Content-Type': "application/json"
        },
        async: true,
        crossDomain: true,
        method: 'GET',
        success: function(tagsArray){
            console.log("success, found " + tagsArray.length + " tags");
            tags = tagsArray.sort(function(a, b) {
                return b.name.localeCompare(a.name);
             });

            for (var i = 0; i <= tags.length - 1; i++) {
                $('#tag-selector').append('<option value="' + tags[i].name + '">' + tags[i].name + '</option>');
            }
        },
        error: function(error) {
            $.notify(error.statusText, "error");
        }
    });
}

function submitTrainingImage(imageDataUrl) {
    const selectedTagId = tags[document.getElementById('tag-selector').selectedIndex].id;

    const json = {
                    "images": [
                        {
                        "name": "imageSentByApi",
                        "contents": imageDataUrl.replace("data:image/jpeg;base64,", ""),
                        "tagIds": [selectedTagId],
                        }
                    ]
                    };

    $.ajax({
        url: baseUrl + trainingUrlPart + projectId + "/images/files",
        headers: {
            'Training-Key':trainingApiKey,
            'Content-Type': "application/json"
        },
        async: true,
        crossDomain: true,
        processData: false,
        method: 'POST',
        data: JSON.stringify(json),
        success: function(data){
            showLoading(false);

            $.notify("Image Uploaded Successfully!", "success", {
                autoHideDelay: 500,
            });
        },
        error: function(error) {
            showLoading(false);

            $.notify(error.statusText, "error");
        }
    });
}

//prediction function
function predictFromImage(imageDataUrl) { //supports predict and play modes
    $.ajax({
        url: baseUrl + predictionUrlPart + projectId + "/image",
        headers: {
            'Prediction-Key': predictionApiKey,
            'Content-Type': "application/octet-stream"
        },
        async: true,
        crossDomain: true,
        processData: false,
        method: 'POST',
        data: base64EncodedStringtoBlob(imageDataUrl),
        success: function(json){
            showLoading(false);

            var predictions = json.predictions;
            var toDisplay = "";

            if(mode == "predict") {
                for(var i = 0; i < predictions.length; i++) {
                    const prediction = predictions[i];
                    if(i == 0) { //index 0 means top probability, so add *** to highlight this
                        toDisplay += "***";
                        $('#tag-selector').show();
                        $("#welcome").text("hi, " + str(prediction.tagName));
                    }
                    toDisplay += prediction.tagName + ":" + Number.parseFloat(prediction.probability).toPrecision(2);
                    if(i == 0) {
                        toDisplay += "***";
                    }

                    toDisplay += "\n";
                }

                $.notify(toDisplay, "success", {
                    autoHideDelay: 500,
                });
            }
            else if(mode == "play") { //will only work with rock, paper, scissors project
                if(predictions.length != 0) {
                    const userPrediction = predictions[0].tagName;
                    const computerResult = rockPaperOrScissorsFromInt(Math.floor(Math.random() * 3));

                    var userWon = false;

                    if(userPrediction == "rock" && computerResult == "scissors") {
                        userWon = true;
                    }
                    else if(userPrediction == "paper" && computerResult == "rock") {
                        userWon = true;
                    }
                    else if(userPrediction == "scissors" && computerResult == "paper") {
                        userWon = true;
                    }
                    else { //negative case for user prediction
                        userWon = null;
                    }

                    var toDisplay = "";

                    if(userPrediction == computerResult) {
                        toDisplay = "It's a tie - user and computer both picked " + userPrediction;
                    }
                    else if(userWon) {
                        toDisplay = "You won! " + userPrediction + " beats " + computerResult;
                    }
                    else if(!userWon) {
                        toDisplay = "You lost! " + userPrediction + " loses to " + computerResult;
                    }
                    else { //userWon is null, this means we had negative case
                        toDisplay = "Could not detect hand-sign, please try again";
                    }

                    $.notify("Result:\n" + toDisplay, "success", {
                        autoHideDelay: 500,
                    });
                }
                else {
                    $.notify("Unable to determine hand-sign (no predictions)", "error");
                }
            }
        },
        error: function(error) {
            showLoading(false);

            $.notify(error.statusText, "error");
        }
    });
}

//Utility functions
function configureVideo() {
    //Reference:
    //https://www.twilio.com/blog/2018/04/choosing-cameras-javascript-mediadevices-api.html,
    //https://simpl.info/getusermedia/

    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        var params;

        devices = devices.filter(function (el) {
            return el.kind == "videoinput"
        });

        if(devices.length == 1) {
            params = {
                video: true,
                audio: false
            };

            $("#flip-camera-button").hide();
        }
        else {
            params = {
                video: {
                    facingMode: (isFrontCam ? "user" : "environment")
                },
                audio: false
            }

            $("#flip-camera-button").show();
        }

        navigator.mediaDevices.getUserMedia(params)
        .then(function(stream) {
            const video = document.getElementById("videoElement");

            currentStream = stream;
            window.stream = stream;
            video.srcObject = stream;
        })
        .catch(function(error) {
            $.notify(error, "error");
        });
    });
}


function rockPaperOrScissorsFromInt(num) {
    if(num == 0) {
        return "rock";
    }
    else if(num == 1) {
        return "paper";
    }
    else if(num == 2) {
        return "scissors";
    }
    else {
        return null;
    }
}


function base64EncodedStringtoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

function showLoading(show) {
    if(show) {
        $("#loading").show();
        $("#content").hide();
    }
    else {
        $("#loading").hide();
        $("#content").show();
    }
}

function findGetParameter(parameterName) {
    var result = null,tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName)
                result = decodeURIComponent(tmp[1]);
            }
        );
    return result;
}
