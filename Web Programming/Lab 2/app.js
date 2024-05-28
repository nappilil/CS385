/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
import {
    arrayPartition,
    arrayShift,
    matrixOne
  } from './arrayUtils.js';

// -------------------------------------- arrayPartition ----------------------------------------------------- //
console.log("-------------------------------------- arrayPartition -----------------------------------------------------")
/*
const partitionFunc1 = (num) => num % 2 === 0; 
try {
    console.log(arrayPartition("hi", partitionFunc1)); // check if an array
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(arrayPartition()); // check if array exists
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(arrayPartition([], 3)); // check if array is empty
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayPartition([1], 3)); // check if array is at least 2
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayPartition([1,2], 3)); // check if function is a function
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayPartition([1,2])); // check if function exists
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayPartition([1,2,3,4,5], partitionFunc1)); // Expected Result: [[2,4], [1,3,5]]
} catch (e) {
    console.log(e);
}
const partitionFunc2 = (num) => num > 18;
try {
    console.log(arrayPartition([10,15,20,25,30], partitionFunc2)); // Expected Result: [[20, 25, 30], [10,15]]
} catch (e) {
    console.log(e);
}
const partitionFunc3 = (fruit) => fruit.length >= 6;
try {
    console.log(arrayPartition(["apple", "banana", "cherry", "date"], partitionFunc3)); // Expected Result: [["banana", "cherry"], ["apple","date"]]
} catch (e) {
    console.log(e);
}
*/
const partitionFunc4 = (num) => num >= 0; 
try {
    console.log(arrayPartition([0, -5, 10, -3, 7], partitionFunc4)) // Expected Result: [[0, 10, 7], [-5, -3]]
} catch (e) {
    console.log(e);
}
// -------------------------------------------- arrayShift --------------------------------------------------- //
console.log("-------------------------------------- arrayShift -----------------------------------------------------")
/*
try {
    console.log(arrayShift("hi", 1)); // check if an array
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift()); // check if array exists
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(arrayShift([], 3)); // check if array is empty
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(arrayShift([1], 3)); // check if array is at least 2
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([1,2], 'hi')); // check if number is a number
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([1,2])); // check if number exists
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([1,2], 1.5)); // check if number is a decimal
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([3,4,5,6,7], 3))   // returns [5,6,7,3,4]

} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift(["Hello",true, 5,"Patrick","Goodbye"], 4))   // returns [true, 5, "Patrick", "Goodbye", "Hello"]
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([1,2,3,4], -2))   // returns [3,4,1,2]
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([7,8,9,10], 0)) // returns [7,8,9,10]
} catch (e) {
    console.log(e);
}
try {
    console.log(arrayShift([7,11,15], 3.5)) // throws error
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(arrayShift([7,11,15], 4)) // when n is larger than length of array
} catch (e) {
    console.log(e);
}
// -------------------------------------------- matrixOne --------------------------------------------------- //
console.log("-------------------------------------- matrixOne -----------------------------------------------------")
/*
try {
    console.log(matrixOne()) // error: argument does not exist
} catch (e) {
    console.log(e);
}
try {
    console.log(matrixOne('hello')) // error: argument is not an array
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(matrixOne([6, 'hi', 1, 3])) // error: each element is not in an array
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(matrixOne([])) // error: is empty
} catch (e) {
    console.log(e);
}

try {
    console.log(matrixOne([[1,2,3],[4,2,'hi']])) // error: each is not a number
} catch (e) {
    console.log(e);
}

try {
    console.log(matrixOne([[1,2],[3,4.4]])) // error: each is not an integer
} catch (e) {
    console.log(e);
}
try {
    console.log(matrixOne([[1,2,6],[3,4,5],[1,2,3,4,5,6,7],[6,7,8]])) // error: missing elements
} catch (e) {
    console.log(e);
}
try {
    console.log(matrixOne([[2,2,2],[2,0,2],[2,2,2]])) //returns [[2,1,2],[1,1,1],[2,1,2]] 
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(matrixOne([[0,1,2,0],[3,5,4,2],[1,7,3,5]])) //returns [[1,1,1,1],[1,5,4,1],[1,7,3,1]] 
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(matrixOne([[0,1,2,0],[3,5,4]])) // missing element
} catch (e) {
    console.log(e);
}
*/
import {
    swapChars,
    longestCommonSubstring,
    palindromeOrIsogram
  } from './stringUtils.js';
// -------------------------------------------- swapChars --------------------------------------------------- //
console.log("-------------------------------------- swapChars -----------------------------------------------------")
/*
try {
    console.log(swapChars("Patrick", "")) //Throws error not enough chars
} catch (e) {
    console.log(e);
}
try {
    console.log(swapChars()) // Throws Error missing arguments
} catch (e) {
    console.log(e);
}
try {
    console.log(swapChars("John")) // Throws error missing arguments
} catch (e) {
    console.log(e);
}
try {
    console.log(swapChars ("h", "Hello")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}
try {
    console.log(swapChars ("hello","e")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(swapChars ("    ","    ")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}
try {
    console.log(swapChars ("Patrick","Hill")) // Returns "Hillick Patr"
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(swapChars ("hello","world")) // Returns "worlo helld"
} catch (e) {
    console.log(e);
}
*/
// -------------------------------------------- longestCommonSubstring --------------------------------------------------- //
console.log("-------------------------------------- longestCommonSubstring -----------------------------------------------------")
/*
try {
    console.log(longestCommonSubstring("Patrick", "")) //Throws error not enough chars
} catch (e) {
    console.log(e);
}
try {
    console.log(longestCommonSubstring()) // Throws Error missing arguments
} catch (e) {
    console.log(e);
}
try {
    console.log(longestCommonSubstring("John")) // Throws error missing arguments
} catch (e) {
    console.log(e);
}
try {
    console.log(longestCommonSubstring("h", "Hello")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}

try {
    console.log(longestCommonSubstring("hello","e")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}

try {
    console.log(longestCommonSubstring("     ","     ")) // Throws Error not enough chars
} catch (e) {
    console.log(e);
}
try {
    console.log(longestCommonSubstring("abcdxyz","xyzabcd")) // Expected Result: abcd
} catch (e) {
    console.log(e);
}
try {
    console.log(longestCommonSubstring("programming","programmer")) // Expected Result: programm
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(longestCommonSubstring("abcdef","123456")) // Expected Result: ""
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(longestCommonSubstring("abcdef","acdfgh")) // Expected Result: "cd"
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(longestCommonSubstring("hellosubishere","bruhsubhowareyou")) // Expected Result: "sub"
} catch (e) {
    console.log(e);
}
// -------------------------------------------- palindromeOrIsogram --------------------------------------------------- //
console.log("-------------------------------------- palindromeOrIsogram -----------------------------------------------------")
/*
try {
    console.log(palindromeOrIsogram()) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram('hi there')) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram([])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram([1, 2])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(['hi', 2])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(['hi'])) // Throw error
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(palindromeOrIsogram(['', '', ''])) // Throw error
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(palindromeOrIsogram(['what', '   '])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(["Madam", "Lumberjack", "He did, eh?", "Background", "Taco cat? Taco cat.", "Invalid String"])) // { "Madam": "Palindrome", "Lumberjack": "Isogram", "He did, eh?": "Palindrome", "Background": "Isogram", "Taco cat? Taco cat.": "Palindrome", "Invalid String": "Neither" }
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(["level", "Racecar", "Palindrome", "Isogram"])) // { "level": "Palindrome", "Racecar": "Palindrome", "Palindrome": "Isogram", "Isogram": "Isogram" }
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(["hello", "world", "Java", "Python"])) // { "hello": "Neither", "world": "Isogram", "Java": "Neither", "Python": "Isogram" }
} catch (e) {
    console.log(e);
}
try {
    console.log(palindromeOrIsogram(["abba", "abcd", "Is it OK?", "No lemon, no melon", "a"])) // { "abba": "Palindrome", "abcd": "Isogram", "Is it OK?": "Neither", "No lemon, no melon": "Palindrome", "a": "Both" }
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(palindromeOrIsogram(["1234", "1111"])) // { "1111": "Palindrome", "1234": "Isogram" }
} catch (e) {
    console.log(e);
}
// -------------------------------------------- objectStats --------------------------------------------------- //
console.log("-------------------------------------- objectStats -----------------------------------------------------")
/*
try {
    console.log(objectStats()) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats("whats up")) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats(["howdy"])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([{}])) // Throw error
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(objectStats([{"key": "value"}])) // Throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([{"a": 1.3456}])) // Should work to be 1.346
} catch (e) {
    console.log(e);
}
/*
try {
    console.log(objectStats([{ a: 12, b: 8, c: 15, d: 12, e: 10, f: 15 }, { x: 5, y: 10, z: 15 }, { p: -2, q: 0, r: 5, s: 3.5 }])) // / Expected Result:{ mean: 8.346, median: 10, mode: 15, range: 17, minimum: -2, maximum: 15, count: 13, sum: 108.5 }
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([{ a: 1, b: 2, c: 3, d: 4, e: 5}])); // / Expected Result:{ mean: 3, median: 3, mode: 0, range: 4, minimum: 1, maximum: 5, count: 5, sum: 15 }
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([{ a: 1, b: 2, c: 5, d: 4, e: 2}, {x: 5, y: 2, z: 5}])); // / Expected Result:{ mean: 3.25, median: 3, mode: [2, 5], range: 4, minimum: 1, maximum: 5, count: 8, sum: 26 }
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([{ p: 10, q: 15, r: 20 }, { x: -5, y: 8, z: 10 }, { a: 5, b: 5, c: 5 }])); // Expected Result:{ mean: 8.111, median: 8, mode: 5, range: 25, minimum: -5, maximum: 20, count: 9, sum: 73 }
} catch (e) {
    console.log(e);
}
try {
    console.log(objectStats([ { alpha: 3.5, beta: 7.2, gamma: 4.8 }, { x: 0, y: 0, z: 0 }, { p: -2, q: -8, r: -5 }])); // Expected Result: { mean: 0.056, median: 0, mode: 0, range: 15.2, minimum: -8, maximum: 7.2, count: 9, sum: 0.5 }
} catch (e) {
    console.log(e);
}
*/
// -------------------------------------------- nestedObjectsDiff --------------------------------------------------- //
console.log("-------------------------------------- nestedObjectsDiff -----------------------------------------------------")
/*
try {
    console.log(nestedObjectsDiff()); // throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(nestedObjectsDiff({'key': 'value'})); // throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(nestedObjectsDiff({'key': 'value'}, {'key': 'value'})); // no error
} catch (e) {
    console.log(e);
}
try {
    console.log(nestedObjectsDiff({ key1: "value1", key2: { nestedKey: "nestedValue", arrayKey: [1, 2, 3], } }, { key1: "value1", key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey" })); 
    // Example Output:   { key2: { nestedKey: "differentValue", arrayKey: [1, 2, 4], }, key3: "newKey" }
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(nestedObjectsDiff({ a: 1, b: { c: 2, d: [3, 4] }, e: "hello" }, { a: 1, b: { c: 2, d: [3, 5] }, f: "world" })); // no error
} catch (e) {
    console.log(e);
}
// Expected Result: { b: { d: [3, 5] }, e: undefined, f: "world" }
try {
    console.log(nestedObjectsDiff({ x: { y: { z: 1 } } }, { x: { y: { z: 1 } } })); // no error
} catch (e) {
    console.log(e);
}
// Expected Result: {} // Both objects are identical, so no differences are found.
// -------------------------------------------- mergeAndSumValues --------------------------------------------------- //
console.log("-------------------------------------- mergeAndSumValues -----------------------------------------------------")
/*
try {
    console.log(mergeAndSumValues()); // throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues("hello")); // throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues({}, {})); // throw error
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues({ a: 3, b: 7, c: "5" }, 
    { b: 2, c: "8", d: "4" },
    { a: 5, c: 3, e: 6 })); 
    // Expected Result: { a: 8, b: 9, c: 16, d: 4, e: 6 }
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues({ a: 1, b: 2, c: 3 }, 
    { b: 3, c: 4, d: 5 },
    { a: 2, c: 1, e: 6 })); 
// Expected Result: { a: 3, b: 5, c: 8, d: 5, e: 6 }
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues({ x: 10, y: 5, z: 3 }, 
    { x: 5, y: 2, z: 7 },
    { x: 3, y: 8, z: 1 })); 
// Expected Result: { x: 18, y: 15, z: 11 }
} catch (e) {
    console.log(e);
}
*/
try {
    console.log(mergeAndSumValues({ one: 15, two: 20 }, 
    { one: 5, two: 10 },
    { two: 5, three: 8 })); 
// Expected Result: { one: 20, two: 35, three: 8 }
} catch (e) {
    console.log(e);
}
try {
    console.log(mergeAndSumValues({ a: 1, b: "2", c: 3 }, 
    { b: 3, c: 4, d: 5 },
    { a: 2, c: "hello", e: 6 })); 
// Throws an error
} catch (e) {
    console.log(e);
}
import {
    objectStats,
    nestedObjectsDiff,
    mergeAndSumValues
  } from './objectUtils.js';