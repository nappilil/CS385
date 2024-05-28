//import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkImdbID(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    if (strVal.slice(0, 2) !== "tt") {
      throw `Error: Invalid ${varName} does not begin with tt`;
    }
    if (strVal.slice(2).length !== 7 ) {
      throw `Error: Invalid ${varName} does not have 7 digits`;
    }
    strVal.slice(2).split("").forEach((num) => {
      if (isNaN(num)) {
        throw `Error: Invalid ${varName} last 7 chars are not numbers`;
      }
    });
    return strVal;
  },
  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    return strVal;
  }
};

export default exportedMethods;