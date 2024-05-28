'''
Created on 10/20/21
@author:   Aditi Deshmukh and Lilli Nappi
'''
# Number of bits for data in the run-length encoding format.
# The assignment refers to this as k.
COMPRESSED_BLOCK_SIZE = 5

# Number of bits for data in the original format.
MAX_RUN_LENGTH = 2 ** COMPRESSED_BLOCK_SIZE - 1

# Do not change the variables above.
# Write your functions here. You may use those variables in your code.



##helpers
def isOdd(n):
    '''determines whether a value is even or odd'''
    if n%2 == 0:
        return False
    else:
        return True

    
def numToBinary(n):
    '''converts decimal to binary'''
    if n== 0:
        return ''
    elif isOdd(n):
        return numToBinary(int(n/2))+ '1'
    else:
        return numToBinary(int(n/2))+'0'

def zero_count(s):
    '''counts the number of 0s in a string'''
    if s== '':
        return 0
    if s[0]== '1':
        return 0
    else:
        return 1 + zero_count(s[1:])

def one_count(s):
    '''counts the number of 1s in a string'''
    if s=='':
        return 0 
    elif s[0]== '0':
        return 0
    else:
        return 1 + one_count(s[1:])
    
def length(s):
    '''takes a string and adds 0s to get a string of correct length'''
    return '0' * ((COMPRESSED_BLOCK_SIZE) - len(s)) + s

def compress(S):
    '''takes a binary string S of length 64 as input and 
returns another binary string as output'''
    if S == '':
        return ''
    total_zero = zero_count(S[:MAX_RUN_LENGTH])
    if S[total_zero:] == '':
        return length(numToBinary(total_zero)) + compress(S[total_zero:])
    else:
        total_one = one_count(S[total_zero:total_zero + MAX_RUN_LENGTH])
        return length(numToBinary(total_zero)) +length(numToBinary(total_one))+ compress(S[total_zero+total_one:])

def binaryToNum(s):
    ''' returns the integer corresponding to the binary representation in s.'''
    if s == '':
        return 0
    elif s[-1]=='0':
        return 2 *binaryToNum(s[:-1])
    else:
        return 1+ 2 *binaryToNum(s[:-1])
def uncompress(C):
    '''reverses compress'''
    if C=='' or len(C) == 0:
        return ''
    else:
        return binaryToNum(C[:COMPRESSED_BLOCK_SIZE]) * '0' + binaryToNum(C[COMPRESSED_BLOCK_SIZE : 10]) * '1' + uncompress(C[10:])

def compression(s):
    '''returns the ratio of compressed size to original size'''
    return len(compress(s))/len(s)


####1. 7 
####2. compression('0'*64) = 0.390625, compression('0'*32 + '1' *32) = 0.46875, compression(penguin) = 1.484375, smile = 1.328125, five = 1.015625
##### As strings get more complex, ratio increases
####3. This algorithm cannot exists because you cannot output a bit that is less than the original bit. For example a 64 bit string must be at least 64 bits in order to maintian the correct order. 

