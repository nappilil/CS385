// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { ObjectId } from 'mongodb';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },
    checkString(strVal, varName) {
        if (strVal === undefined) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0) throw `Error: ${varName} cannot be blank`;
        return strVal;
    },

    checkRating(rating, varName) {
        if (!rating || typeof rating !== "number") throw `Error: must provide a number for ${varName}`
        if (rating <= 0) throw `Error: ${varName} must be greater than 0`
        if (rating < 1 || rating > 5) throw `Error: ${varName} must be between 1-5`
        // if a decimal 
        if (!Number.isInteger(rating)) {
            // must be whole or decimal with one point
            let ratingString = rating.toString();
            let decimal = 0; // decimal index
            for (let i = 0; i <= ratingString.length - 1; i++) {
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
    },

    checkName(name, varName) {
        if (!name) throw `Error: You must supply a ${varName}!`;
        if (typeof name !== 'string') throw `Error: ${varName} must be a string!`;
        name = name.trim();
        if (name.length === 0) throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (name.length < 2 || name.length > 25) throw `Error: ${varName} must be between 2-25 chars`
        if (!isNaN(name)) throw `Error: ${name} is not a valid value for ${varName} as it only contains digits`;
        return name;
    },

    // [{firstName: name, lastName: name}, ...]
    checkCast(arrObjects, varName) {
        if (Array.isArray(arrObjects) == false) {
            throw `Error: ${varName || 'provided array'} is not an array`;
        }
        if (arrObjects.length === 0) throw `Error: cast cannot be empty`;
        // each element in the array is an object
        for (let i = 0; i <= arrObjects.length - 1; i++) {
            if (typeof arrObjects[i] !== 'object')
                throw `Error: ${varName} is not an object`;

            // cannot be empty and must have at least 1 key/value pair
            if (Object.keys(arrObjects[i]).length === 0)
                throw `Error: ${varName} is empty`;

            // should there be a max cast size of people?
            if (arrObjects.length >= 50) throw `Error: cast can be up to 50 people`;
            // must be only first and last name for keys in an object
            if (Object.keys(arrObjects[i]).length !== 2)
                throw `Error: ${varName} must have a first and last name`;

            // must have firstName and lastName as keys in that order
            let firstName = Object.keys(arrObjects[i])[0], lastName = Object.keys(arrObjects[i])[1];
            if (firstName !== 'firstName' || lastName !== 'lastName')
                throw `Error: ${varName} must be in {firstName: name, lastName: name} format`

            // each value for each key is a string and valid name
            for (let [key, value] of Object.entries(arrObjects[i])) {
                key = this.checkString(key, 'name');
                value = this.checkString(value, 'name');
                value = this.checkName(value, 'name');
            }
        }
        return arrObjects;
    },

    checkYear(yearReleased, varName) {
        const currentYear = new Date().getFullYear();
        // check it is a number
        if (typeof yearReleased !== 'number') throw `${varName || 'provided variable'} is not a number`;
        // can be max 5 years in the future
        if (yearReleased - currentYear > 5) throw `Error: Movie cannot be released more than 5 years in the future`;
        // cannot be before 1888
        if (yearReleased < 1878) throw `Error: Movie cannot be older than 1888`;
        return yearReleased;
    },

    // {director: string, yearReleased: number}
    checkInfo(obj, varName) {
        // check if an object
        if (typeof obj !== 'object') throw `Error: ${varName} is not an object`;
        // cannot be empty and must have two key/value pair
        if (Object.keys(obj).length !== 2)
            throw `Error: ${varName} must have director and yearReleased`;
        // must have director and yearReleased as keys in that order
        let director = Object.keys(obj)[0], yearReleased = Object.keys(obj)[1];
        if (director !== 'director' || yearReleased !== 'yearReleased')
            throw `Error: ${varName} must be in {director: name, yearReleased: number} format`;
        obj.director = this.checkString(obj.director, 'Director Name');
        obj.director = this.checkName(obj.director, 'Director Name');
        obj.yearReleased = this.checkYear(obj.yearReleased, 'Year Released');
        return obj;
    },

    checkNumber(number, varName) {
        if (isNaN(number))`Error: ${varName} must be a number`;
        number = Number(number);
        if (typeof number !== "number") throw `Error: must provide a positive whole number for ${varName}`;
        if (number <= 0) throw `Error: ${varName} must be greater than 0`;
        // if a decimal 
        if (!Number.isInteger(number)) throw `Error: ${varName} must be a positive whole number`;
        return number;
    },

    checkObject(obj, varName, functionName) {
        if (typeof obj !== 'object') throw `Error: ${varName} is not an object`;
        // cannot be empty and must have 1 key/value pair
        const keys = Object.keys(obj);
        if (obj === undefined || keys.length === 0) throw `Error: ${varName} canont be empty`;
        if (functionName === "patchMovie") {
            if (Object.keys(obj).length < 1) throw `Error: ${varName} must have at least 1 key/value`;
            for (let [key, value] of Object.entries(obj)) {
                if (key !== "title" && key !== "cast" && key !== "info" && key !== "plot" && key !== "rating")
                    throw `Error: must have at least 1 VALID key to update`;
            }
        } else if (functionName === "postComment") {
            const validKeys = ["name", "comment"];
            if (keys[0] !== validKeys[0] && keys[1] !== validKeys[1])
                throw `Error: must have all VALID keys to create a comment`;
        }
        return obj;
    }
};

export default exportedMethods;