// TODO: Export and implement the following functions in ES6 format
import {products} from '../config/mongoCollections.js'; // import collection
import {ObjectId} from 'mongodb';
import isUrl from 'is-url';

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  // All fields need to be supplied
  if (productName === undefined || 
    productDescription === undefined || 
    modelNumber === undefined || 
    price === undefined||
    manufacturer === undefined ||
    manufacturerWebsite === undefined ||
    keywords === undefined ||
    categories === undefined || 
    dateReleased === undefined ||
    discontinued === undefined) {
      throw `Error: All fields need to be supplied`
    }
    // These Fields must be string
    let data = [productName, productDescription, modelNumber,
      manufacturer, manufacturerWebsite, dateReleased ]
    for (let i = 0; i<=data.length-1; i++) {
      if (typeof data[i] !== "string") {
        throw `Error: ${data[i]} must be a string`
      }
      data[i] = data[i].trim();
      if (data[i].length === 0) {
        throw `Error: Field cannot be an empty string`
      }
    }
    // trim all strings
    productName = productName.trim();
    productDescription = productDescription.trim();
    modelNumber = modelNumber.trim();
    manufacturer = manufacturer.trim();
    manufacturerWebsite = manufacturerWebsite.trim();
    dateReleased = dateReleased.trim();
    // Price Field
    if (typeof price !== "number") {
      throw `Error: Price must be a number`
    }
    if (price <= 0) {
      throw `Error: Price must be greater than 0`
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
        throw `Error: Price must be a whole number or a decimal with 2 points`
      }
    }
    // manufacturerWebsite field
    if (manufacturerWebsite.slice(0, 11) !== "http://www." || 
            manufacturerWebsite.slice(-4) !== ".com" || 
            manufacturerWebsite.slice(11, -4).length < 5) {
                throw `Error: Must begin with http://www. and end with .com`
              }
    // check for valid website
    if (!isUrl(manufacturerWebsite)) {
      throw `Error: Invalid website link`
    }
    // keywords and categories field
    if (Array.isArray(keywords) === false || Array.isArray(categories) === false) {
      throw ("Error: Keywords and Categories must be arrays")
    } // cannot be empty array
    if (keywords.length === 0 || categories.length === 0) {
      throw `Error: keywords or categories cannot be an empty array`
    } // must be strings and cannot be empty string
      for (let i=0; i<=keywords.length-1; i++) {
        if (typeof keywords[i] !== "string") {
          throw `Error: element of keyword must be a string`
        }
        keywords[i] = keywords[i].trim() // trim keyword
        if (keywords[i].length === 0) {
          throw `Error: element of keywords cannot be an empty string`
        }
      }
      for (let i=0; i<=categories.length-1; i++) {
        if (typeof categories[i] !== "string") {
          throw `Error: element of categories must be a string`
        }
        categories[i] = categories[i].trim() // trim category
        if (categories[i].length === 0) {
          throw `Error: element of categories cannot be an empty string`
        }
      }
    if (keywords.length < 1 || categories.length < 1 ) {
      throw `Error: arrays must contain at LEAST one element that is a valid string`
    }
    // dateReleased field
    if (dateReleased.length !== 10) {
      throw `Error: not a valid date in mm/dd/yyyy format`
    }
    let today = new Date(),
    day = new Date(dateReleased);
    if (day > today) {
      throw `Error: cannot be in the future`
    }
    let mm = dateReleased.slice(0, 2),
        dd = dateReleased.slice(3,5);
    if (dateReleased[2] !== "/" || dateReleased[5] !== "/") {
      throw `Error: missing / in date format`
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
                  throw `Error: not valid day in mm/dd/yyyy format`
                }
    } else if (mm === "02") {
      if (!February.includes(dd)) {
        throw `Error: not a valid day in mm/dd/yyyy format`
      }
    } else {
      if (!ThirtyDays.includes(dd)) {
        throw `Error: not a valid day in mm/dd/yyyy format`
      }
    }
    if (typeof discontinued !== "boolean") {
      throw `Error: discontinued must be a boolean`
    }

  const newProduct = {
    productName,
    productDescription,
    modelNumber,
    price,
    manufacturer,
    manufacturerWebsite,
    keywords,
    categories,
    dateReleased,
    discontinued
  };
  const productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Error: Could not add product';
  newProduct._id = newProduct._id.toString(); // convert to string
  return newProduct // return result
};

import {idErrorCheck, newProductNameErrorCheck} from '../helpers.js'
// return an arry of all products in collection
// if no products return an empty array
const getAll = async () => {
  const productCollection = await products();
  let productList = await productCollection.find({}).toArray();
  if (!productList) {
    throw `Could not get all products`
  }
  productList = productList.map((element) => {
    element._id = element._id.toString() // convert all element ids to strings
    return element;
  });
  return productList;
};


// return a product from the database
const get = async (id) => {
  // error checking
  id = idErrorCheck(id);
  // convert id to ObjectId before querying to DB
  const productCollection = await products();
  const product  = await productCollection.findOne({_id: new ObjectId(id)});
  // if no product exists with that id the method should throw
  if (product === null) {
    throw 'Error: No product with that id';
  } else {
    product._id = product._id.toString();
    return product; // return product
  }
};

// remove the product from the datavase
const remove = async (id) => {
  id = idErrorCheck(id); // error checking
  const productCollection = await products();
  const deletionInfo = await productCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deletionInfo) {
    throw `Error: Could not delete product with id of ${id}.`
    // if succeess return the name of the product and the following text:
    // "Product_Name_here has been successfully deleted!"
  } else {
    return `${deletionInfo.productName} has been successfully deleted!`
  }
};

// update the name of the product currently in the database
const rename = async (id, newProductName) => {
  id = idErrorCheck(id);
  newProductName = newProductNameErrorCheck(newProductName);
  const productCollection = await products();
  const product  = await productCollection.findOne({_id: new ObjectId(id)});
  // if no product exists with that id the method should throw
  if (product === null) {
    throw 'Error: No product with that id';
  // if newProductName is same as current value the method should throw
  } else if (product.productName === newProductName) {
    throw 'Error: Cannot update with same name';
  }
  const updatedProduct = {
    productName: newProductName,
    productDescription: product.productDescription,
    modelNumber: product.modelNumber,
    price: product.price,
    manufacturer: product.manufacturer,
    manufacturerWebsite: product.manufacturerWebsite,
    keywords: product.keywords,
    categories: product.categories,
    dateReleased: product.dateReleased,
    discontinued: product.discontinued
  }
  const updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updatedProduct},
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!updatedInfo) {
    throw 'Error: Could not update product successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  // if success return enitre product object after it is updated
  return updatedInfo;
};
export {create, getAll, get, remove, rename};