//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {users} from './config/mongoCollections.js'; // import collection

const checkName = (strVal, varName) => {
/** 
 * valid string (no strings with just spaces, 
 * should not contain numbers) 
 * and should be at least 2 characters long with a max of 25 characters. 
 */ 
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    if (strVal.length < 2 || strVal.length > 25) {
        throw `Error: ${varName} must be between 2-25 chars`
    }
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    for (let i=0; i<=strVal.length-1; i++) {
        if(numbers.includes(strVal[i])) {
            throw `Error: ${varName} cannot contain numbers`
        }
    }
    return strVal;
}

const checkUsername = (strVal, varName) => {
/** 
 *  should be a valid string (no strings with just spaces, should not contain numbers)
 *  and should be at least 5 characters long with a max of 10 characters.
 *  should be case-insensitive. So "PHILL", "phill", "Phill" should be treated as the same username. 
 */
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    if (strVal.length < 5 || strVal.length > 10) {
        throw `Error: ${varName} must be between 5-10 chars`
    }
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    for (let i=0; i<=strVal.length-1; i++) {
        if(numbers.includes(strVal[i])) {
            throw `Error: ${varName} cannot contain numbers`
        }
    }
    strVal = strVal.toLowerCase();
    return strVal;
}

const checkSameUsername = async (strVal, varName) => {
    const userCollection = await users();
    const existingUser = await userCollection.find({ username: username }).toArray();
    if (existingUser.length !== 0) throw `Error: Username is already in use`;   
    return strVal;       
}

const checkPassword = (password, varName) => {
/**
 * must be a valid string (no strings with just spaces and no spaces
 * and should be a minimum of 8 characters long.
 * There needs to be at least one uppercase character
 * there has to be at least one number 
 * there has to be at least one special character
 */
    if (!password) throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;
    if (typeof password !== 'string') throw `Error: ${varName} must be a string!`;
    password = password.trim();
    if (password.length === 0) throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    let regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password.match(regEx))  throw `Error: ${varName} must be at least 8 chars, has one upper case letter, 1 digit, & contains at least one special character`;
    return password;
}

const checkConfirmPassword = (confirmPassword, password, varName) => {
    /**
     * Must be a valid string (no strings with just spaces and no spaces
     * Must match password
     */
    if (!password) throw `Error: You must supply a ${varName}!`;
    if (typeof password !== 'string') throw `Error: ${varName} must be a string!`;
    password = password.trim();
    if (password.length === 0) throw `Error: ${varName} cannot just be spaces`;
    if (password !== confirmPassword) throw `Error: Confirm password does match password`;
    return confirmPassword;
}

const checkFavoriteQuote = (strVal, varName) => {
/**
 * should be a valid string (no strings with just spaces, should not contain numbers) 
 * should be at least 20 characters long with a max of 255 characters.
 */
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    if (strVal.length < 20 || strVal.length > 255) {
        throw `Error: ${varName} must be between 20-255 chars`;
    }
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    for (let i=0; i<=strVal.length-1; i++) {
        if(numbers.includes(strVal[i])) {
            throw `Error: ${varName} cannot contain numbers`;
        }
    }
    return strVal;
}

const checkThemePreference = (strVal, varName) => {
/**
 * the ONLY two valid values are "light" or "dark"
 * should be stored as lowercase in the DB
 */
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    strVal = strVal.toLowerCase();
    if (strVal !== 'light') if (strVal !== 'dark') throw `Error: ${varName} must be 'light' or 'dark'`
    return strVal;
}

const checkRole = (strVal, varName) => {
/**
 * the ONLY two valid values are "admin" or "user". 
 * should be stored as lowercase in the DB
 */
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot just be spaces`;
    strVal = strVal.toLowerCase();
    if (strVal !== 'admin') if (strVal !== 'user') throw `Error: ${varName} must be 'admin' or 'user'`
    return strVal;
}

export {checkName, checkUsername, checkPassword, checkConfirmPassword, checkFavoriteQuote, checkThemePreference, checkRole, checkSameUsername}