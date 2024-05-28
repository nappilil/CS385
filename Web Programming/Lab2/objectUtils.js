/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let objectStats = (arrObjects) => {
  //Code goes here
  // arr exists and is proper type
  if (Array.isArray(arrObjects) == false) {
    throw `Error: ${arrObjects || 'provided array'} is not an array`;
  }
  // each element in the array is an object
  for (let i = 0; i<=arrObjects.length-1; i++) {
    if (typeof arrObjects[i] !== 'object') {
      throw `Error: ${arrObjects[i] || 'provided element'} is not an object`;
    }
    // cannot be empty and must have at least 1 key/value pair
    if (Object.keys(arrObjects[i]).length === 0) {
      throw `Error: ${'provided object'} is empty`;
    }
    // each value for each key is a number
    for (let [key, value] of Object.entries(arrObjects[i])) {
      if (typeof value !== "number") {
        throw `Error: ${value || 'provided value'} is not a number`;
      }
      else if (isNaN(value)) {
        throw `Error: ${value || 'provided value'} is NaN`;
      }
      // if a decimal then should be rounded to 3 places
      else if (value - Math.floor(value) !== 0) {
        value = value.toFixed(3);
      }
    }
  }
  let nums = []; // array of numbers 
  for (let i = 0; i <= arrObjects.length-1; i++) { // iterate through list
    for (let [key, value] of Object.entries(arrObjects[i])) { // iterate through object
      nums.push(value); // extract all numbers
    }
  }
  nums = nums.sort(function (x, y) {return x - y}); // sort from lowest to highest
  // object of stats to be returned
  let objStats = {"mean" : 0,
                  "median" : 0,
                  "mode": 0,
                  "range": 0,
                  "minimum": 0,
                  "maximum": 0,
                  "count": 0,
                  "sum": 0 };
  // find median when it is odd
  if (nums.length % 2 === 1) {
    let position = ((nums.length + 1) / 2);
    objStats["median"] = +(nums[position-1]).toFixed(3);
  } else { // if odd find both positions
    let position1 = (nums.length / 2);
    let position2 = (nums.length / 2) + 1;
    objStats["median"] = +((nums[position1] + nums[position2]) / 2).toFixed(3); // take mean of both positions
  }
  // find mode
  let modes = {}; // numbers and their amount of occurences
  for (let i = 0; i <= nums.length; i++) { // iterate through list of all numbers
    if (!modes[nums[i]]) { // if not in modes object
      modes[nums[i]] = 1; // then add one occurence
    } else { // if already in then increment occurences
      modes[nums[i]]++;
    }
  }
  let current = 0, // current number of occurences
      mode = []; // store list of possible modes
  for (let [key, value] of Object.entries(modes)) { // iterate through object
    if (current < modes[key]) {
      mode = [Number(key)]; // convert key back to a number
      current = modes[key]; // make count current most number
    } else if (current === modes[key]) { // if current occurences is the same then add the key (number) to list
      key = Number(key); // make key a number
      mode.push(key); // add to list of modes
    }
  }
  if (current > 1) { // if there is a mode
    if (mode.length === 1) { // return one mode
      objStats["mode"] = mode[0];
    } else { // if more than one return array with all modes from lowest to highest
      objStats["mode"] = mode.sort(function (x, y) {return x - y});    
    }
  } else { // if none return 0
    objStats["mode"] = 0;
  }
  objStats["minimum"] = nums[0]; // first number in list
  objStats["maximum"] = +nums[nums.length-1].toFixed(3); // last number in list
  objStats["range"] = +(objStats["maximum"] - objStats["minimum"]).toFixed(3);  // range = (max - min)
  objStats["count"] = nums.length; // length of list
  for (let i = 0; i<= nums.length-1; i++) {
    objStats["sum"] += +nums[i].toFixed(3); // add all nums together
  }
  // mean = (sum / count) must be max 3 decimals and an int not a string
  objStats["mean"] = +(objStats["sum"] / objStats["count"]).toFixed(3);

  return objStats;

};
import {
  nestedObjectsDiffHelper
} from './helpers.js';

let nestedObjectsDiff = (obj1, obj2) => {
  //Code goes here
  // both input parameters exist and is of proper type
  if (typeof obj1 !== 'object') {
    throw `Error: ${obj1 || 'provided object'} is not an object`;
  }
  if (typeof obj2 !== 'object') {
    throw `Error: ${obj2 || 'provided object'} is not an object`;
  }
  if (!obj1 || !obj2) {
    throw `Error: no object provided`;
  }
  // each object parameter is not empty
  if (obj1.length == 0 || obj2.length == 0) {
    throw `Error: object is empty`;
  }
  let differences = {}; // difference to return
  if (obj1 === obj2) { // if no differences then return empty {}
    return differences; // return result
  } else { // otherwise call helper
    differences = nestedObjectsDiffHelper(obj1, obj2);
    return differences;
  }
};

let mergeAndSumValues = (...args) => {
  //this function takes in a variable number of objects that's what the ...args signifies
  // each argument is an object
  let sums = {};
  if (!args) {
    throw `Error: no arguments provided`;
  }
  for (const arg of args) {
    if (typeof arg !== 'object') {
      throw `Error: ${arg || 'provided object'} is not an object`;
    }
    if (!arg) {
      throw `Error: no object provided`;
    }
    // each object has at least 1 key/value
    if (arg.length === 0) {
      throw `Error: object is empty`;
    }
    // if not a number throw an error
    for (let [key, value] of Object.entries(arg)) {
      if (isNaN(value)) {
        throw `Error: ${value || 'provided value'} is NaN`;
      }
    }
  }
  // initialize sums object
    for (const arg of args) {
      for (let [key, value] of Object.entries(arg)) {
        sums[key] = 0;
      }
    }
    // add sums of same keys
    for (const arg of args) {
      for (let [key, value] of Object.entries(arg)) {
      if (typeof value === "number") {
        sums[key] += value; // add values
      }
      else if (typeof value === "string") {
        sums[key] += Number(value); // add and convert value
      }
    }
  }
  // if sum wasnt filled then no arguments were provided
  if (Object.entries(sums).length === 0) {
    throw `Error: no arguments provided`;
  }
  return sums;
};
export {objectStats, nestedObjectsDiff, mergeAndSumValues};


