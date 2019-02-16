
class Task:

    #Fields---------------------------------------------------------------
    #name = ""
    #date = ""
    #creator = None
    #status = False
    


    def __init__(self, name, date, creator, status):
        self.name = name
        self.date = date
        self.creator = creator
        self.status = status

    def getName(self):
        return self.name

    def getDate(self):
        return self.date

    def getCreator(self):
        return self.creator

    def getStatus(self):
        return self.status

    