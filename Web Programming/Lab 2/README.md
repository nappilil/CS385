# CS-546 Lab 2

## Overview
The purpose of this lab is to become familiarized with Node.js modules and gain further understanding of JavaScript syntax. This lab implements several utility functions across different files and ensures proper error handling for each function.

## Project Structure
- `arrayUtils.js`: Contains utility functions for arrays.
- `stringUtils.js`: Contains utility functions for strings.
- `objectUtils.js`: Contains utility functions for objects.
- `app.js`: Imports functions from the above modules and contains test cases for each function.

## Functions

### arrayUtils.js
1. **arrayPartition(arrayToPartition, partitionFunc)**
   - Partitions the elements of an array into two subarrays based on a partition function.
   - Throws error if:
     - `arrayToPartition` is not an array, empty, or has fewer than 2 elements.
     - `partitionFunc` is not a function.

2. **arrayShift(arr, n)**
   - Rotates the elements in an array `n` positions.
   - Throws error if:
     - `arr` is not an array or has fewer than 2 elements.
     - `n` is not a whole number.

3. **matrixOne(matrix)**
   - Sets entire row and column to 1's if an element is 0.
   - Throws error if:
     - `matrix` is not a valid matrix (array of arrays of numbers).

### stringUtils.js
1. **swapChars(string1, string2)**
   - Swaps the first 4 characters of two strings and concatenates them.
   - Throws error if:
     - `string1` or `string2` is not a string or has fewer than 4 characters.

2. **longestCommonSubstring(str1, str2)**
   - Finds the longest common substring between two strings.
   - Throws error if:
     - `str1` or `str2` is not a string or has fewer than 5 characters.

3. **palindromeOrIsogram(arrStrings)**
   - Determines if each string in an array is a palindrome, isogram, both, or neither.
   - Throws error if:
     - `arrStrings` is not an array or contains non-string elements.

### objectUtils.js
1. **objectStats(arrObjects)**
   - Calculates statistical measures from an array of objects.
   - Throws error if:
     - `arrObjects` is not an array or contains non-object elements.

2. **nestedObjectsDiff(obj1, obj2)**
   - Compares two nested objects and returns their differences.
   - Throws error if:
     - `obj1` or `obj2` is not an object or is empty.

3. **mergeAndSumValues(...args)**
   - Merges objects and sums values of the same keys.
   - Throws error if:
     - Any argument is not an object or contains invalid values.
