# Optimal Nim Player

## Overview

This Python program plays the game of Nim optimally, allowing the user to play against the computer. Nim is a classic two-player game where players take turns removing objects from piles. The objective is to force the opponent to take the last object. The program employs an optimal playing strategy based on bitwise operations to ensure the best possible moves.

## How to Play

1. **Setting up the Game:**
   - The program prompts the user to specify the number of piles they want to play with.
   - For each pile, the user is asked to input the initial number of objects.

2. **Gameplay:**
   - The user goes first, followed by the computer.
   - After each move, the program displays the updated number of objects in each pile.

3. **Optimal Strategy:**
   - The program calculates the nim-sum of the game by computing the bitwise exclusive-or of the sizes of all piles.
   - It then calculates the bitwise exclusive-or of the nim-sum with each individual pile, obtaining pile-sums.
   - If a pile-sum is smaller than the number of coins in that pile, the optimal play is to remove coins from that pile, reducing it to its pile-sum.

4. **Example:**
```plaintext
We're going to play Nim. You'd better play optimally or I'll win.
How many piles do you want to play with? 3
How many in pile 0? 3
How many in pile 1? 4
How many in pile 2? 5
pile 0 = 3
pile 1 = 4
pile 2 = 5
Your turn ...
Which pile? 2
How many? 1
pile 0 = 3
pile 1 = 4
pile 2 = 4
My turn ... prepare to be dazzled!!!
I remove 3 from pile 0
pile 0 = 0
pile 1 = 4
pile 2 = 4
Your turn ...
Which pile? 1
How many? 2
pile 0 = 0
pile 1 = 2
pile 2 = 4
My turn ... prepare to be dazzled!!!
I remove 2 from pile 2
pile 0 = 0
pile 1 = 2
pile 2 = 2
Your turn ...
Which pile? 1
How many? 1
pile 0 = 0
pile 1 = 1
pile 2 = 2
My turn ... prepare to be dazzled!!!
I remove 1 from pile 2
pile 0 = 0
pile 1 = 1
pile 2 = 1
Your turn ...
Which pile? 2
How many? 1
pile 0 = 0
pile 1 = 1
pile 2 = 0
My turn ... prepare to be dazzled!!!
I remove 1 from pile 1
pile 0 = 0
pile 1 = 0
pile 2 = 0
I win ... AGAIN
