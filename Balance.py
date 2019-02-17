
class Balance:

    #Fields---------------------------------------------------------------
    #creditor = ""
    #debtor = ""
    #amount = ""
    #date = ""
    


    def __init__(self, creditor, debtor, amount, date, paidAmount):
        self.creditor = creditor
        self.debtor = debtor
        self.amount = amount
        self.date = date
        self.paidAmount = paidAmount

    def getCreditor(self):
        return self.creditor

    def getDebtor(self):
        return self.debtor

    def getAmount(self):
        return self.amount

    def getDate(self):
        return self.date

    def getPaidAmount(self):
        return self.paidAmount