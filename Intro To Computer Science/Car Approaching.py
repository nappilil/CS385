# < - car approaching from the left
# > - car approaching from the right
# . - speed camera

"""
Given a string S of length N, count the number of times a car
passes by a speed camera
"""
def solution(S):
    result = 0
    
    # Iterate to the left by reversing list to count number of left cars pass by camera
    for i in reversed(range(len(S))):
        if S[i] == "<":
            for j in reversed(range(i)):
                if S[j] == ".":
                    result += 1
    # Iterate to the right to count number of cars pass by camera
    for i in range(0, len(S)-1):
        if S[i] == ">":
            for j in range(i + 1, len(S)):
                if S[j] == ".":
                    result += 1
    # return total number of cars passing by speed cameras
    return result
# S = ">>>.<<<" # should output 6
# S = ".>>.<."  # should output 6
# S = ".<>..." # should output 4
S = ".<.>." # should output 2
solution(S)
