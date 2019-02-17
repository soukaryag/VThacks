from Task import Task
from Balance import Balance
import os
class Person:

    #Fields---------------------------------------------------------------

    #False for disturb-able, and True for do not disturb mode on
    #doNotDisturb = False
    #outOfTown = False

    #Dictionary keeping record of all balances the person owes or has
    #Each balance is a dictionary itself with the following keys:
    #Creditor: (Person) object
    #Debtor: (Person) object
    #Amount: positive integer
    #Date: datetime(?) object
    #balances = []

    #Dictionary keeping record of all tasks the person has ever had
    #Each task is a dictionary itself with the following keys:
    #Name: string
    #Date: datetime(?) object
    #Assignee: (Person) object
    #tasks = []




    def __init__(self, name):
        self.tasks = []
        self.balances = []
        self.name = name

        self.doNotDisturb = False
        self.outOfTown = False
        self.readFromDatabase()

        self.score=600-(23*len(self.tasks))


    def getBalancesToString(self):
        balances = []
        string = ""
        for balance in self.balances:
            if balance.getCreditor() == self.getName():
                print("hey")
                string += balance.getDebtor() + " owes you $" + str(int(balance.getAmount()) - int(balance.getPaid())) + "."
            else:
                print("hoe")
                string += "You owe " + balance.getCreditor() + " $" + str(int(balance.getAmount()) - int(balance.getPaid())) + "."
            balances.append(string)
            string = ""
        return balances

    #Read from database
    def readFromDatabase(self):
        f = open("database/" + (self.name).lower() + ".txt")
        for line in f.readlines():
            splitLine = line.split(",")
            dataType = splitLine[0]
            if (dataType == "Task"):
                t = Task(splitLine[1], splitLine[2], splitLine[3], splitLine[4] == "True")
                self.addTask(t)
            elif (dataType == "Balance"):
                b = Balance(splitLine[1], splitLine[2], splitLine[3], splitLine[4], splitLine[5])
                self.addBalance(b)
        #make call to database
        #search for user with 'self.name' variable
        #fill in other fields


    def getName(self):
        return self.name

    def addTask(self, task):
        self.tasks.append(task)

    def getTasks(self):
        return self.tasks

    def getTasksToString(self):
        names = []
        for task in self.tasks:
            names.append(str(task.getName()))

        return names

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

    def getScore(self):
        return self.score


#print(type(a.tasks[0])
