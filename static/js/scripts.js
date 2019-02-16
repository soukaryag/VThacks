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

    $("#title").text("Welcome");

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

    predictFromImage(imageDataUrl);

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

            var name = (predictions[0]).tagName;
            if(name != 'Nothing'){
              window.location.href = "/user_" + (String(name)).toLowerCase();}

            if(mode == "predict") {


                for(var i = 0; i < predictions.length; i++) {
                    const prediction = predictions[i];

                    if(i == 0) { //index 0 means top probability, so add *** to highlight this
                        toDisplay += "*******";
                    }
                    toDisplay += prediction.tagName + ":" + Number.parseFloat(prediction.probability).toPrecision(2);
                    if(i == 0) {
                        toDisplay += "*******";
                    }

                    toDisplay += "\n";
                }

                $.notify(toDisplay, "success", {
                    autoHideDelay: 500,
                });
            }

        },
        
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
