
# Lilli Nappi and Aditi Deshmukh
# I pledge my honor that I have abided by the Stevens Honor System.

class Board(object):
    """Constructor for Board objects in addition to self"""
    def __init__(self, width = 7, height = 6):
        self.width = width
        self.height = height
        self.board = self.makeBoard()
        
    def makeRow(self):
        """Makes a row in the Connect Four Board"""
        row = []
        for col in range(self.width):
            row += ['']
        return row

    def makeBoard(self):
        """Makes the Connect Four Board"""
        board = []
        for r in range(self.height):
            board = board + [self.makeRow()]
        return board

    def __str__(self):
        """Returns a string representing the Board object that calls it"""
        answer = ""
        for row in range(len(self.board)):
            for col in range(len(self.board[row])):
                answer = answer + '|' + self.board[row][col]
            answer = answer + "|" + "\n"
        answer = answer + (self.width * "--") + "-" + "\n"
        answer = answer + " "
        for space in range(len(self.board[1])):
            answer = answer + str(space) + " "
        return answer
    
    def allowsMove(self, col):
        """Return true if calling Board object can allow a move into column c.
        Returns false if c does not have space or if it is not a valid column.
        Check that c is within range from 0 to last column and make sure
        there is still room left in the column"""
        if col in list(range(self.width)):
            if self.board[0][col] == '': return True
        return False
        
    def addMove(self, col, ox):
        """ox is a variable holding a string that is either 'x' or 'o' into col.
        Must find highest row number avaiable and put checker in that row."""
        if self.allowsMove(col) != False:
            r = -1
            for row in self.board:
                if row[col] == '':
                    r += 1
                else:
                    break
            self.board[r][col] = ox
                                     
    def setBoard(self, moveString):
        """ takes in a string of columns and places 
            alternating checkers in those columns, 
            starting with 'X' 
             
            For example, call b.setBoard('012345') 
            to see 'X's and 'O's alternate on the 
            bottom row, or b.setBoard('000000') to 
            see them alternate in the left column. 
 
            moveString must be a string of integers 
        """ 
        nextCh = 'X'   # start by playing 'X' 
        for colString in moveString: 
            col = int(colString) 
            if 0 <= col <= self.width: 
                self.addMove(col, nextCh) 
            if nextCh == 'X': nextCh = 'O' 
            else: nextCh = 'X'
                    
    def winsFor(self, ox):
        """Return True if given checker 'x' or 'o' held in ox has won the
        calling Board. Return False otherwise. Check if player has won
        horizontally, vertically, or diagonally"""
        # vertically
        for col in range(self.width):
            count = 0
            for row in range(self.height):
                if self.board[row][col] == ox:
                    count += 1
                    if count >= 4: return True
                else: count = 0
        # horizontally
        for row in range(self.height):
            count = 0
            for col in range(self.width):
                if self.board[row][col] == ox:
                    count += 1
                    if count >= 4: return True
                else: count = 0
        # diagonally
        for col in range(self.width):
            row = self.height - 1
            count =  0
            while row > - 1 and col < self.width:
                if self.board[row][col] == ox:
                    count +=1
                    if count >= 4: return True
                    else:
                        row -= 1
                        col -= 1
                else:
                    count = 0
                    row -= 1
                    col -= 1
        for row in range(self.height):
            col = 0
            count =  0
            while col < self.width:
                if self.board[row][col] == ox:
                    count +=1
                    if count >= 4: return True
                    col += 1
                    row -= 1
                else:
                    count = 0
                    row -= 1
                    col += 1
        return False
                    
    def hostGame(self):
         """When called from a connect four board object, will run a loop
         allowing user to play a game"""
         print("Welcome to Connect Four!")
         while True:
            print(self)
            print("\n")
            # X's turn
            X = input("X's choice: ")
            while True:
                if self.allowsMove(X) != False:
                    self.addMove(int(X), "X")
                    print(self)
                    print("\n")
                    break
                else:
                    X = input(X + " is not a valid input, try again.")
                    print("\n")    
            if self.winsFor("X") != False:
                print("X wins -- Congratulations!")
                break
            # 0's turn
            O = input("O's choice: ")
            while True:
                if self.allowsMove(O) == True:
                    self.addMove(int(O), "O")
                    print(self)
                    print("\n")
                    break
                else:
                    O = input(O + " is not a valid input, try again")
                    print("\n")    
            if self.winsFor("O") != False:
                print("O wins -- Congratulations!")
                break
