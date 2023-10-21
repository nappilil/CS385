def isOdd(n):
    '''Returns whether or not the integer argument is odd.'''
    if n%2 == 0: return False
    if n%2 == 1: return True
    else: return False

    # 42 --> base 2
    # 42/2 = 21 remainder is 0
    # 21/2 = 10 remainder is 1
    # 10/2 = 5 remainder is 0
    # 5/2 = 2 remainder is 1
    # 2/2 = 1 remainder is 0
    # 1/2 = 0 remainder is 1
    # Base representation of 42 is 101010

print(isOdd(42))    # False
print(isOdd(43))    # True


def numToBinary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the binary representation of non-negative integer n.
    If n is 0, the empty string is returned.'''
    if n == 0: return ''
    elif isOdd(n) == True: return numToBinary(int(n/2)) + "1"
    else: return numToBinary(int(n/2)) + "0"

print(numToBinary(0))   # ''
print(numToBinary(1))   # '1'
print(numToBinary(4))   # '100'
print(numToBinary(10))  # '1010'
print(numToBinary(42))  # '101010'
print(numToBinary(100)) # '1100100'

    # If you are given an odd base-10 number, the rightmost bit in its base-2
    # representation will always be 1 since it is odd it will always have a 
    # remainder of 1 when you divide by 2. 

    
    # If you are given an even base-10 number, the rightmost bit in its base-2
    # representation will always be 0 since it is even it will always have a
    # remainder of 0 when you divide by 2.




    #    1   0    1    0
    #   2^3 2^2  2^1  2^0
    #    8   4    2    1
    #        8 + 2 = 10
    #        
    #    1011 = 11
    #    1010 = 10
    #    101 = 5
    #    
    #    1   0    1     1
    #   2^3  2^2  2^1  2^0
    #    8   4    2    1
    #        8 + 2 + 1 = 11
    #



    
    # The original value of 1010 is 10 so when you eliminate the 0 at the end
    # and get 101 you are actually dividing 10 by 2 to get 5 since the base-10
    # representation of 101 is 5. Whereas when you eliminate the 1 at the end
    # of 1011 and still get 101 it is because you are subtracting
    # 11 by 1 to get 10 and then dividing by 2 to still get 5.




    # If you are converting a number N from base 10 to base 2 using the right
    # to left method, you must keep dividing N/2 until it reaches 0
    # and marking down whether or not there is a remainder. Since this is a
    # repetitive process and recursion repeats until it reaches a base case,
    # if we already had the base 2 representation of N/2 from recursion,
    # this would easily help when converting. Therefore, when N is odd you know
    # you must return a 1 since there is always a 1 at the end of an odd base-2
    # since there is always a remainder. Meanwhile when N is even you know you
    # must return a 0 since there will not be a remainder and all even base-2
    # numbers end in a 0.
            
def binaryToNum(s):
    '''Precondition: s is a string of 0s and 1s.
    Returns the integer corresponding to the binary representation in s.
    Note: the empty string represents 0.'''
    if s == '': return 0
    else: return binaryToNum(s[:-1]) * 2 + int(s[-1])

print(binaryToNum('100'))        # 4
print(binaryToNum('1011'))       # 11
print(binaryToNum('00001011'))   # 11
print(binaryToNum(''))           # 0
print(binaryToNum('0'))          # 0
print(binaryToNum('1100100'))    # 100
print(binaryToNum('101010'))     # 42


def increment(s):
    '''Precondition: s is a string of 8 bits.
    Returns the binary representation of binaryToNum(s) + 1.'''
    if len(numToBinary(binaryToNum(s) + 1)) > 8: return '00000000'
    else: return '0' * (8-len(numToBinary(binaryToNum(s) + 1))) + numToBinary(binaryToNum(s) + 1)

print(increment('00000000'))    # 00000001
print(increment('00000001'))    # 00000010
print(increment('00000111'))    # 00001000
print(increment('11111111'))    # 00000000

def count(s, n):
    '''Precondition: s is an 8-bit string and n >= 0.
    Prints s and its n successors.'''
    if n == 0:
        print(s)
    else:
        print(s)
        count(increment(s), n - 1)

print(count('00000000', 4)) # 00000000 00000001 00000010 00000011 00000100
print(count('11111110', 5)) # 11111110 11111111 00000000 00000001 00000010 00000011

def numToTernary(n):
    '''Precondition: integer argument is non-negative.
    Returns the string with the ternary representation of non-negative integer
    n. If n is 0, the empty string is returned.'''
    if n == 0: return ''
    elif n%3 == 0: return numToTernary(int(n/3)) + "0"
    elif n%3 == 1: return numToTernary(int(n/3)) + "1"
    elif n%3 == 2: return numToTernary(int(n/3)) + "2"
    else: return numToTernary(int(n/3)) + str(n%3)

    # 59 --> base 3
    # 59/3 = 19 remainder is 2
    # 19/3 = 6  remainder is 1
    # 6/3 = 2   remainder is 0
    # 2/3 = 0   remainder is 2
    # Ternary Representation of 59 is 2012


print(numToTernary(42))       # '1120'
print(numToTernary(4242))     # '12211010'


def ternaryToNum(s):
    '''Precondition: s is a string of 0s, 1s, and 2s.
    Returns the integer corresponding to the ternary representation in s.
    Note: the empty string represents 0.'''
    if s == '': return 0
    else: return ternaryToNum(s[:-1]) * 3 + int(s[-1])
    


print(ternaryToNum('1120'))     # 42
print(ternaryToNum('12211010')) # 4242
