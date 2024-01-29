# nim template DNaumann (2018)
# Lilli Nappi
# 11/23/21
# Global variable used by several functions
piles = []  # list containing current pile amounts 
num_piles = 0 # number of piles, which should equal len(pile)

def play_nim():
  """ plays game of nim between user and computer; computer plays optimally """
  
  init_piles()
  dislay_piles()
  while True:
    user_plays()
    display_piles()
    if sum(piles) == 0:
      
      print("...you win")
      
      break
    computer_plays()
    display_piles()
    if sum(piles) == 0:
      
      print("I win ... AGAIN")
      break
      
def init_piles():
  """ Assign initial values to the global variables 'num_piles' and 'piles
      User chooses number of piles and initial size of each pile. 
      Keep prompting until they enter valid values."""
  global piles
  global num_piles
  
  while True:
    try:
      num_piles = int(input("How many piles do you want to play with? "))
      except ValueError:
        continue
        if num_piles < 1:
          continue
        else:
          break
 # make a while loop, appending to list until it reaches the user input
    while True:
      try: # keeps prompting user until they enter valid values
        for num in range(num_piles):
          pile = int(input("How many in pile " + str(num) + "? "))
          if pile >= 1:
            piles.append(pile) # adds user input to list
      except ValueError:
        continue
       if pile == range(num_piles):
        break
       else:
        break
        
def display_piles():
  """ display current amount in each pile """
  global piles
  global num_piles
  
  for num, pile in enumerate(piles):
    # enumerate adds a counter to an iterable
    # returns it in a form of enumerating object
      print("pile " + str(num) + " = " + str(pile))
      
def user_plays():
  """ get user's choices and update chosen pile """
  global piles
  
  print("Your turn ...")
  p = get_pile()
  amt = get_number(p)
  piles[p] = piles[p] - amt
  
  def get_pile():
    """ return user's choice of pile
    Keep prompting unti lthe choice is valid, i.e., in the range 0 to num_piles - 1 """
    global piles
    global num_piles

# keeps prompting user until amount is valid
  while True:
    try:
      remove_amount = int(input("How many? "))
    except ValueError:
      continue
    if remove_amount < 1: # must be at least 1
      continue
    if remove_amount > piles[pnum]: # at most the amount in the pile
      continue
    else:
      return remove_amount

from functools import reduce

def game_nim_sum():
  """ return the nim-sum of the piles """
  global piles
  global num_piles
  nim_sum = reduce(lambda x,y: x^y, piles)
# calculates the bitwise exclusive of all the elements in the list
  return nim_sum

import random

def opt_play():
  """ Return (p,n) where p is the pile number and n is the amt to remove, if there is an optimal play.
  Otherwise, (p,1) where is the pile number of a non-zero pile. """
  global piles
  global num_piles
  
  if game_nim_sum() == 0:
    p = random.choice(range(num_piles)) # within 0, num_piles-1
    while piles[p] <= 0:
      p = random.choice(range(num_piles))
    return (p,1)
  else:
    for pile in range(len(piles)):
      pile_sum = piles[pile] ^ game_nim_sum() # calculates pile_sum
      if pile_sum < piles[pile]:
        p = pile
        amt = piles[pile]-pile_sum
        n = amt
        return (p,n)

# return a tuple
# coins that should be removed should be pile amount - pile_sum
# remove = piles[pile] - pile_sum

def computer_plays():
  """ compute optimal play, update chosen pile, and tell user what was played
  
  Implement this using opt_play(). """
  
  global piles
  global num_piles
  
  p = opt_play()[0] # pile number
  amt = opt_play()[1] # amount to remove
  piles[p] = piles[p] - amt # update chosen pile
  
# tells the user what was played
  print("my turn ... prepare to be dazzled!!!")
  print("I remove " + str(amt) + " from pile " + str(p))
            
  
  
