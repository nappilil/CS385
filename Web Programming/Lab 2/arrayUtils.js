/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayPartition = (arrayToPartition, partitionFunc) => {
  //code goes here
  // parameter exists and is of proper type (an array)
  if (Array.isArray(arrayToPartition) == false) {
    throw `Error: ${arrayToPartition || 'provided array'} is not an array`;
  }
  // paramater is not an empty array
  else if (arrayToPartition.length == 0) {
    throw `Error: ${'provided array'} is empty`;
  }
  // parameter has at LEAST 2 elements
  else if (arrayToPartition.length < 2) {
    throw `Error: ${'provided array'} must have at LEAST 2 elements`;
  }
  // parameter exists and is of proper type (a function)
  if (typeof partitionFunc !== "function") {
    throw `Error: ${partitionFunc || 'provided function'} is not a function`;
  }

  let result = []; // result
  let satisfy = []; // array that satisfies function
  let unsatisfy = []; // array that does not satisfy function
  
  for (let i = 0; i<=arrayToPartition.length-1; i++) {
    // must trim string inputs
    if (typeof arrayToPartition[i] == 'string' || arrayToPartition[i] instanceof String) {
      arrayToPartition[i] = arrayToPartition[i].trim();
    }
    if (partitionFunc(arrayToPartition[i]) == true) {
      satisfy.push(arrayToPartition[i]); // push into satisfy array
    }
    else {
      unsatisfy.push(arrayToPartition[i]); // push into satisfy array
    }
  }
  result.push(satisfy);
  result.push(unsatisfy);
  return result;
};

let arrayShift = (arr, n) => {
  //code goes here
  // arr exists and is proper type
  if (Array.isArray(arr) == false) {
    throw `Error: ${arr || 'provided array'} is not an array`;
  }
  // arr is not empty 
  else if (arr.length == 0) {
    throw `Error: ${'provided array'} is empty`;
  }
  // arr has at least 2 elements 
  else if (arr.length < 2) {
    throw `Error: ${'provided array'} must have at LEAST 2 elements`;
  }
  // n paramater exists an is proper type (number)
  if (typeof n !== "number") {
    throw `Error: ${n || 'provided number'} is not a number`;
  }
  else if (isNaN(n)) {
    throw `Error: ${n || 'provided number'} is NaN`;
  }
  // n is a whole number and not a decimal (positive, negative, and 0 are all valid)
  else if (n - Math.floor(n) !== 0) {
    throw `Error: ${n || 'provided number'} is a decimal`;
  }

  // trim string inputs
  for (let i = 0; i<=arr.length-1; i++) {
    // trim string inputs
    if (typeof arr[i] == 'string' || arr[i] instanceof String) {
      arr[i] = arr[i].trim();
    }
  }
  // if n is 0 do not rotate array
  if (n == 0) {
    return arr; 
  }
  // if n is a negative number rotate to the left
  else if (n < 0) {
    n = n*(-1); // multiply by -1 to be positive for rotation
    for (let i = 0; i<=n-1; i++) {
      arr = arr.reverse(); // reverse list
      let rotate = arr.pop(); // get 'first' element
      arr = arr.reverse(); // reverse list again
      arr.push(rotate); // add to end of array
    }
  }
  // if n is positive number rotate to the right
  else if (n > 0) {
    for (let i = 0; i<=n-1; i++) {
      let rotate = arr.pop(); // get last element
      arr = arr.reverse(); // reverse list 
      arr.push(rotate); // add to 'front' of list since it is reversed
      arr = arr.reverse(); // reverse again to be back in original order for next shift
    }
  }
  return arr; // return result
};

let matrixOne = (matrix) => {
  //code goes here
  // matrix argument exists and is in proper type (array)
  if (Array.isArray(matrix) == false) {
    throw `Error: ${matrix || 'provided matrix'} is not a matrix`;
  }
  // matrix itself is not an empty array
  else if (matrix.length == 0) {
    throw `Error: ${'provided matrix'} is empty`;
  }
  for (let row = 0; row <= matrix.length-1; row++) {
    // each element in matrix argument is an array
    if (Array.isArray(matrix[row]) == false) {
      throw `Error: ${matrix[row] || 'provided element'} is not an array`;
    }
    // each element in matrix array is not an empty array
    else if (matrix[row].length === 0) {
      throw `Error: ${'provided array'} is empty`;
    }
    // each sub array has no missing elements
    else if (matrix[row].length !== matrix[0].length) {
      throw `Error: ${'missing element'}`;
    }
    for (let column = 0; column <= matrix[row].length-1; column++) {
      // each sub-array element in the matrix array is a number
      if (typeof matrix[row][column] !== "number") {
        throw `Error: ${matrix[row][column] || 'provided element'} is not a number`;
      }
      else if (isNaN(matrix[row][column])) {
        throw `Error: ${matrix[row][column] || 'provided element'} is NaN`;
      }
      // element is an integer
      else if (matrix[row][column] - Math.floor(matrix[row][column]) !== 0) {
        throw `Error: ${matrix[row][column] || 'provided number'} is not an integer`;
      }
    }
  }
  // more loops to make sure entire matrix and subarrays have been error checked before doing anything
  for (let row = 0; row <= matrix.length-1; row++) {
    for (let column = 0; column <= matrix[row].length-1; column++) {
      // check if element is 0
      if (matrix[row][column] === 0) {
        let changeRow = row;
        let changeColumn = column;
        // change each row and column to 1
        matrix.forEach((element, index) => {
          matrix[changeRow][index] = 1;
          matrix[index][changeColumn] = 1;
        });
      }
    }
  }
  return matrix; // return result
};

export {arrayPartition, arrayShift, matrixOne};

