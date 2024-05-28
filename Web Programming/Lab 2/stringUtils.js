/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let swapChars = (string1, string2) => {
  //code goes here
  // both input parameters exist
  if (string1 === undefined || string2 === undefined) {
    throw `Error: missing a parameter`;
  }
  // input parameters are of the proper type
  else if (typeof string1 !== 'string' ) {
    throw `Error: ${string1 || 'provided string'} is not a string`;
  }
  else if (typeof string2 !== 'string' ) {
    throw `Error: ${string2 || 'provided string'} is not a string`;
  }
  else if (string1.length === 0 || string2.length === 0) {
    throw `Error: ${`provided string`} is empty`;
  }
  // cannot just be a string with spaces and must trim anyway
  string1 = string1.trim();
  string2 = string2.trim();
  if (string1.length < 4) {
    throw `Error: ${string1 || `provided string`} is not at LEAST 4 characters long`;
  }
  else if (string2.length < 4) {
    throw `Error: ${string2 || `provided string`} is not at LEAST 4 characters long`;
  }
  let temp = string1; // temp string to be swapped with string 2
  for (let i = 0; i<4; i++) { // first four characters
    string1 = string1.replace(string1[i], string2[i]); // swap string1 char w/ string2
    string2 = string2.replace(string2[i], temp[i]); // swap string2 char w/ string1
  }
  return string1 + " " + string2; // return concatenated strings w/ space
};
import {
  longestCommonSubstringHelper,
  palindromeOrIsogramHelper
} from './helpers.js';
let longestCommonSubstring = (str1, str2) => {
  //code goes here
    // both input parameters exist
    if (str1 === undefined || str2 === undefined) {
      throw `Error: missing a parameter`;
    }
    // input parameters are of the proper type
    else if (typeof str1 !== 'string' ) {
      throw `Error: ${str1 || 'provided string'} is not a string`;
    }
    else if (typeof str2 !== 'string' ) {
      throw `Error: ${str2 || 'provided string'} is not a string`;
    }
    else if (str1.length === 0 || str2.length === 0) {
      throw `Error: ${`provided string`} is empty`;
    }
    // cannot just be a string with spaces and must trim anyway
    str1 = str1.trim();
    str2 = str2.trim();
    if (str1.length < 5) {
      throw `Error: ${str1 || `provided string`} is not at LEAST 5 characters long`;
    }
    else if (str2.length < 5) {
      throw `Error: ${str2 || `provided string`} is not at LEAST 5 characters long`;
    }
    let longestSub = longestCommonSubstringHelper(str1, str2); // call helper
    return longestSub; // return result
};

let palindromeOrIsogram = (arrStrings) => {
  //code goes here
    // arr exists and is proper type
    if (Array.isArray(arrStrings) == false) {
      throw `Error: ${arrStrings || 'provided array'} is not an array`;
    }
    // arr is not empty 
    else if (arrStrings.length == 0) {
      throw `Error: ${'provided array'} is empty`;
    }
    // arr has at least 2 elements 
    else if (arrStrings.length < 2) {
      throw `Error: ${'provided array'} must have at LEAST 2 elements`;
    }
      // trim string inputs
  for (let i = 0; i<=arrStrings.length-1; i++) {
    // trim string inputs
    if (typeof arrStrings[i] == 'string' || arrStrings[i] instanceof String) {
      arrStrings[i] = arrStrings[i].trim();
      if (arrStrings[i].length === 0) {
        throw `Error: ${arrStrings[i] || 'provided element'} is empty`;
      }
    } else {
      throw `Error: ${arrStrings[i] || 'provided element'} is not a string`;
    }
  }
  let obj = {}; // object to be returned
  // do not include punctuation
  const punctuation = ['.', ',', ';', ':', '!', '?', "'", '"', '(', ')', '[', ']', '{', '}', '-', '—']; // from my lab1
  let copy = []; // make a copy
  for (let i = 0; i<= arrStrings.length-1; i++) {
    arrStrings[i] = arrStrings[i].trim();
    copy.push(arrStrings[i]) // copy elements into array
    obj[arrStrings[i]] = "";
  }
  // get rid of punctuation and spaces
  for (let i = 0; i <= copy.length-1; i++) { // iterate through array
    copy[i] = copy[i].split(" ").join(""); // remove spaces between words
    for (let j = 0; j <= copy[i].length-1; j++) { // iterate through string
      if (punctuation.includes(copy[i][j])) { // check to see if char in string is in punctuation
        copy[i] = copy[i].replace(copy[i][j], ""); // get rid of punctuation
      }
    }
  }
  // iterate through array of strings
  for (let i = 0; i<=copy.length-1; i++) {
    let str1 = copy[i].toLowerCase(); // initial string
    let strRev = str1.split(""); // put string into array
    strRev = strRev.reverse(); // reverse array
    strRev = strRev.join(""); // put array back in a string
    // check Palindrome
    if (str1 === strRev) {
      obj[arrStrings[i]] = "Palindrome";
    }
    // check Isogram 
    let str2 = copy[i].toLowerCase(); // initial string
    str2 = str2.split(""); // put string into array
    let unique = palindromeOrIsogramHelper(str2); // checks if is an isogram or not
    if (unique === true && obj[arrStrings[i]] === "Palindrome") {
      obj[arrStrings[i]] = "Both"; // if was already palindrome and is also isogram then put both
    } else if (unique === true && obj[arrStrings[i]] !== "Palindrome") {
      obj[arrStrings[i]] = "Isogram"; // if was not palindome but is an isogram put isogram
    } else if (unique === false && obj[arrStrings[i]] === "Palindrome"){
      obj[arrStrings[i]] = "Palindrome"; // if not isogram but is palindrome stay as palindrome
    } else { // otherwise put neither
      obj[arrStrings[i]] = "Neither";
    }
  }
  return obj; // return result
};
export {swapChars, longestCommonSubstring, palindromeOrIsogram};

