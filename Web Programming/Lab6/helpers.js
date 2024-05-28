// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';
import isUrl from 'is-url';
export {checkId, checkString, checkStringArray, checkPrice, checkWebsiteString, checkDateString, checkBool, checkRating, checkObject};

const checkId = (id, varName) => {
    if (!id) {
      throw `Error: You must provide a ${varName}`;
    }
    if (typeof id !== 'string') {
      throw `Error:${varName} must be a string`;
    }
    id = id.trim();
    if (id.length === 0) {
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    }
    if (!ObjectId.isValid(id)) {
      throw `Error: ${varName} invalid object ID`;
    }
    return id;
};
const checkString = (strVal, varName) => {
    if (!strVal) {
        throw `Error: You must supply a ${varName}!`
    }
    if (typeof strVal !== 'string') {
        throw `Error: ${varName} must be a string!`
    }
    strVal = strVal.trim();
    if (strVal.length === 0) {
      throw `Error: ${varName} cannot be an empty string or string with just spaces`
    }
    if (!isNaN(strVal)) {
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`
    }
    return strVal;
};

const checkStringArray = (arr, varName) => {
    if (!arr || !Array.isArray(arr)) {
      throw `Error: You must provide an array of ${varName}`;
    }
    if (arr.length === 0) {
    throw `Error: ${varName} cannot be an empty array`
    } 
    for (let i in arr) {
        if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
          throw `One or more elements in ${varName} array is not a string or is an empty string`;
        }
        arr[i] = arr[i].trim();
    }
    if (arr.length < 1) {
        throw `Error: ${varName} must contain at LEAST one element that is a valid string`
    }
    return arr;
};

const checkPrice = (price, varName) => {
    if (!price || typeof price !== "number") {
        throw `Error: must provide a number of ${varName}`
      }
    if (price <= 0) {
        throw `Error: ${varName} must be greater than 0`
    }
    // if a decimal 
    if (!Number.isInteger(price)) {
        // must be whole or decimal with two points
        let priceString = price.toString();
        let decimal = 0; // decimal index
        for (let i=0; i<=priceString.length-1; i++) {
          if (priceString[i] === ".") {
            decimal = i;
            break;
          }
        }
        let decimalPlaces = priceString.slice(decimal);
        if (decimalPlaces.length !== 3) { // .'xx'
          throw `Error: ${varName} must be a whole number or a decimal with 2 points`
        }
      }
    return price;
};

const checkWebsiteString = (website, varName) => {
    website = checkString(website, varName);
    // manufacturerWebsite field
    if (website.slice(0, 11) !== "http://www." || 
        website.slice(-4) !== ".com" || 
        website.slice(11, -4).length < 5) {
                throw `Error: ${varName} must begin with http://www. and end with .com`
              }
    // check for valid website
    if (!isUrl(website)) {
      throw `Error: ${varName} is an invalid website link`
    }
    return website;
};

const checkDateString = (date, varName) => {
  date = checkString(date, varName);
  if (date.length !== 10) {
      throw `Error: ${varName} is not a valid date in mm/dd/yyyy format`
    }
    let today = new Date(),
    day = new Date(date);
    if (day > today) {
      throw `Error: ${varName} cannot be in the future`
    }
    let mm = date.slice(0, 2),
        dd = date.slice(3,5);
    if (date[2] !== "/" || date[5] !== "/") {
      throw `Error: ${varName} is missing / in date format`
    }
    let validMonths = ["01", "02", "03", "04", "05", "06",
                         "07", "08", "09", "10", "11", "12"],
        ThirtyOneDays = ["01", "02", "03", "04", "05", "06",
          "07", "08", "09", "10", "11", "12", "13", "14", "15",
          "16", "17", "18", "19", "20", "21", "22", "23", "24", 
          "25", "26", "27", "29", "29", "30", "31" ],
        ThirtyDays = ["01", "02", "03", "04", "05", "06",
          "07", "08", "09", "10", "11", "12", "13", "14", "15",
          "16", "17", "18", "19", "20", "21", "22", "23", "24", 
          "25", "26", "27", "29", "29", "30"],
        February = ["01", "02", "03", "04", "05", "06",
          "07", "08", "09", "10", "11", "12", "13", "14", "15",
          "16", "17", "18", "19", "20", "21", "22", "23", "24", 
          "25", "26", "27", "29", "29"]
    if (!validMonths.includes(mm)) {
      throw `Error: not a valid month in mm/dd/yyyy format`;
    } else if (mm === "01" || mm === "03" || mm === "05" || 
                 mm === "07" || mm === "08" || mm === "12") {
                  if (!ThirtyOneDays.includes(dd)) {
                    throw `Error: ${varName} is not valid day in mm/dd/yyyy format`
                  }
    } else if (mm === "02") {
      if (!February.includes(dd)) {
        throw `Error: ${varName} is not a valid day in mm/dd/yyyy format`
      }
    } else {
      if (!ThirtyDays.includes(dd)) {
        throw `Error: ${varName} is not a valid day in mm/dd/yyyy format`
      }
    }
  return date;
};

const checkBool = (bool, varName) => {
  if (bool === undefined || typeof bool !== "boolean") {
      throw `Error: ${varName} must be a boolean`
    }
  return bool;
}

const checkRating = (rating, varName) => {
  if (!rating || typeof rating !== "number") {
      throw `Error: must provide a number of ${varName}`
    }
  if (rating <= 0) {
      throw `Error: ${varName} must be greater than 0`
  }
  if (rating < 1 || rating > 5) {
    throw `Error: ${varName} must be between 1-5`
  }

  // if a decimal 
  if (!Number.isInteger(rating)) {
      // must be whole or decimal with one point
      let ratingString = rating.toString();
      let decimal = 0; // decimal index
      for (let i=0; i<=ratingString.length-1; i++) {
        if (ratingString[i] === ".") {
          decimal = i;
          break;
        }
      }
      let decimalPlaces = ratingString.slice(decimal);
      if (decimalPlaces.length !== 2) { // .'x'
        throw `Error: ${varName} must be a whole number or a decimal with 1 point`
      }
    }
  return rating;
};

const checkObject = (updateObject, varName, functionName) => {
  const keys = Object.keys(updateObject),
        validKeys = ["title", "reviewerName", "review", "rating"];
  if (!updateObject || keys.length === 0) {
    throw `Error: ${varName} must have at least ONE valid key`
  } 
  // since upate can have bad fields
  if (functionName === "update") {
    const includes = keys.some((key) => {
      return validKeys.includes(key)
    });
    if (includes === false) {
        throw `Error: ${functionName} must have at least ONE valid key`
    }
  }
  if (functionName === "create") {
    keys.forEach((key) => {
      if (!validKeys.includes(key)) {
        throw `Error: ${functionName} must have all valid keys`
      }
    });
  }
  return updateObject;

};