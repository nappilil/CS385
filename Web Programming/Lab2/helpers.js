/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/
let longestCommonSubstringHelper = (str1, str2) => {
    let longestSub = "", // longest substring
        substringMatrix = [], // matrix for lengths of common substrings
        row = 0,
        column = 0;
    
    // dimension str1.length x str2.length matrix filled with 0s
    for (row = 0; row <= str1.length; row++) {
        substringMatrix[row] = [];
        for (column = 0; column <= str2.length; column++) {
            substringMatrix[row][column] = 0;
        }
    }
    // find common substring
    for (row = 0; row <= str1.length-1; row++) {
        for (column = 0; column <= str2.length-1; column++) {
            if (str1[row] === str2[column]) { // if common substring
                if (substringMatrix[row][column] === 0) { // if first common char in substring then set length to 1
                    substringMatrix[row+1][column+1] = 1;
                } else { // add 1 and previous length to current
                    substringMatrix[row+1][column+1] = 1 + substringMatrix[row][column];
                }
            } else { // if no common substring then current length is 0
                substringMatrix[row+1][column+1] = 0;
            }
        }
    }
    // check for longest substring
    for (row = 0; row <= str1.length-1; row++) {
        for (column = 0; column <= str2.length-1; column++) {
            if (substringMatrix[row+1][column+1] >= longestSub.length) { // if current length is greater than or same to stored longest substring
                longestSub = str1.slice(row - substringMatrix[row+1][column+1]+1, row+1); // update longest substring
            }
        }
    }
    return longestSub; // return result
}

let palindromeOrIsogramHelper = (arr) => { // modified function from my lab1
    let noDuplicates = []; // initialize new array
    let unique = true;
    for (let i = 0; i<=arr.length-1; i++) // iterate through array
      if (!noDuplicates.includes(arr[i])) { // if not already in new array then add it
        noDuplicates.push(arr[i]);
        unique = true;
      } else {
        unique = false;
        break;
      }
    return unique; //return result
  };

let nestedObjectsDiffHelper = (obj1, obj2) => {
    let differences = {}; // difference object to return
    // if an array, return array
    if (Array.isArray(obj2) === true) {
        return obj2;
    } else {
        // iterate through object 2
        for (let key in obj2) {
            // trim any strings
            if (typeof obj2[key] === "string") {
                obj2[key] = obj2[key].trim();
            }
            // if key exists in object 2 and not object 1
            if (!(key in obj1)) {
                differences[key] = obj2[key]; // add to differences
            // if nested object then recursively call
            } else if (typeof obj1[key] === "object" || typeof obj2[key] === "object") {
                let nestedDifferences = nestedObjectsDiffHelper(obj1[key], obj2[key]); // add to differences
                // trim any strings
                if (typeof nestedDifferences[key] === "string") {
                    nestedDifferences[key] = nestedDifferences[key].trim();
                }
                // if nested is not the same then add to differences object
                if (Object.entries(nestedDifferences).length !== 0) {
                    differences[key] = nestedDifferences;
                }
            // if values are different
            } else if (obj1[key] !== obj2[key]) {
                differences[key] = obj2[key]; // add to differences object
            }
        }
        // if key exists in object 1 and not object 2
        for (let key in obj1) {
            if (!(key in obj2)) {
                differences[key] = undefined; // add key with value 'undefined'
            }
        } 
    }
    return differences; // return result
}

export {longestCommonSubstringHelper, palindromeOrIsogramHelper, nestedObjectsDiffHelper};
