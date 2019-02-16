
class Person:

    #Fields---------------------------------------------------------------

    #False for disturb-able, and True for do not disturb mode on
    doNotDisturb = False
    outOfTown = False

    #Dictionary keeping record of all balances the person owes or has
    #Each balance is a dictionary itself with the following keys:
    #Creditor: (Person) object
    #Debtor: (Person) object
    #Amount: positive integer
    #Date: datetime(?) object
    balances = []

    #Dictionary keeping record of all tasks the person has ever had
    #Each task is a dictionary itself with the following keys:
    #Name: string
    #Date: datetime(?) object
    #Assignee: (Person) object
    tasks = []


    def __init__(self, name):
        self.name = name
        self.score = 600
        self.tasks = []
        self.balances = []
        self.doNotDisturb = False
        self.outOfTown = False

    #Read from database
    def readFromDataBase(self):
        #make call to database
        #search for user with 'self.name' variable
        #fill in other fields


    def getName(self):
        return self.name

    def addTask(self, task):
        self.tasks.append(task)

    def getTasks(self):
        return self.tasks

    def addBalance(self, balance):
        self.balances.append(balance)

    def getBalances(self):
        return self.balances

    def setDoNotDisturb(self, status):
        self.doNotDisturb = status

    def getDoNotDisturb(self):
        return self.doNotDisturb

    def setOutOfTown(self, status):
        self.outOfTown = status

    def getOutOfTown(self):
        return self.outOfTown