// You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from 'mongodb';
export {idErrorCheck, newProductNameErrorCheck};
const idErrorCheck = (id) => {
    // if no id is provided the method should throw
    if (!id || id === undefined) {
        throw `Error: no id provided`
    }
    // if id is not a string or is an empty string should throw
    else if (typeof id !== "string") {
        throw `Error: ${id || 'provided id'} is not a string`   
    }
    id = id.trim() // trim id
    if (id.length === 0) {
        throw `Error: id is empty`
    }
    // if id is not valid ObjectId the method should throw
    else if (!ObjectId.isValid(id)) {
        throw `Error: id is not a valid ObjectId`
    }
    // otherwise it is valid id
    else {
        return id;
    }
};
const newProductNameErrorCheck = (newProductName) => {
// if newProductName is not provided, the method should throw
    if (!newProductName || newProductName === undefined) {
        throw `Error: no new product name provided`
    }
    // if id is not a string or is an empty string should throw
    else if (typeof newProductName !== "string") {
        throw `Error: ${newProductName || 'provided new product name'} is not a string`   
    }
    newProductName = newProductName.trim() // trim product name
    if (newProductName.length === 0) {
        throw `Error: new product name is empty`
    }
    // otherwise it is valid product name
    else {
        return newProductName;
    }
};
