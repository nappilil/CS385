// This data file should export all functions using the ES6 standard as shown in the lecture code
import {products} from '../config/mongoCollections.js'; // import collection
import {ObjectId} from 'mongodb';
import {checkId, checkString, checkStringArray, checkPrice, checkWebsiteString, checkDateString, checkBool} from '../helpers.js'

const exportedMethods = {
  async create (
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
) {
  /** IMPORTED FROM MY LAB 4 */
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
  productName = checkString(productName, "productName");
  productDescription = checkString(productDescription, "productDescription");
  modelNumber = checkString(modelNumber, "modelNumber");
  manufacturer = checkString(manufacturer, "manufacturer");
  manufacturerWebsite = checkString(manufacturerWebsite, "manufacturerWebsite");
  dateReleased = checkString(dateReleased, "dateReleased");

  // Price Field
  price = checkPrice(price, "price");

  // manufacturerWebsite field
  manufacturerWebsite = checkWebsiteString(manufacturerWebsite, "manufacturerWebsite");

  // keywords and categories field
  keywords = checkStringArray(keywords, "keywords");
  categories = checkStringArray(categories, "categories");

  // dateReleased field
  dateReleased = checkDateString(dateReleased, "dateReleased");

  // discontinued field
  discontinued = checkBool(discontinued, "discontinued");

  // initialize
  let reviews = [],
      averageRating = 0;

  // male new product
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
    discontinued,
    reviews,
    averageRating
  };
  const productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Error: Could not add product';
  newProduct._id = newProduct._id.toString(); // convert to string
  return newProduct // return result
},

async getAll() {
  const productCollection = await products();
  let productList = await productCollection
  .find({})
  .project({_id: 1, productName: 1})   // just return the _id and name of the products w project
  .toArray();
  if (!productList) {
    throw `Could not get all products`
  }
  productList = productList.map((element) => {
    element._id = element._id.toString() // convert all element ids to strings
    return element;
  });
  return productList;
},

async get(productId) {
    // error checking
    productId = checkId(productId, 'Id URL Param');
    // convert id to ObjectId before querying to DB
    const productCollection = await products();
    const product  = await productCollection.findOne({_id: new ObjectId(productId)});
    // if no product exists with that id the method should throw
    if (product === null) {
      throw 'Error: No product with that id';
    } else {
      product._id = product._id.toString();
      return product; // return product
    }
},

async remove(productId) {
  productId = checkId(productId, 'Id URL Param'); // error checking
  const productCollection = await products();
  const deletionInfo = await productCollection.findOneAndDelete({
    _id: new ObjectId(productId)
  });
  if (!deletionInfo) {
    throw `Error: Could not delete product with id of ${productId}.`
    // if succeess return the id of the product and deleted true
  } else {
    return {"_id": deletionInfo._id, "deleted": true};
  }
},

async update(
  productId,
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
) {
  // must be a valid Object Id
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

    productId = checkId(productId, 'Id URL Param');

    // These Fields must be string
    productName = checkString(productName, "productName");
    productDescription = checkString(productDescription, "productDescription");
    modelNumber = checkString(modelNumber, "modelNumber");
    manufacturer = checkString(manufacturer, "manufacturer");
    manufacturerWebsite = checkString(manufacturerWebsite, "manufacturerWebsite");
    dateReleased = checkString(dateReleased, "dateReleased");
  
    // Price Field
    price = checkPrice(price, "price");
  
    // manufacturerWebsite field
    manufacturerWebsite = checkWebsiteString(manufacturerWebsite, "manufacturerWebsite");
  
    // keywords and categories field
    keywords = checkStringArray(keywords, "keywords");
    categories = checkStringArray(categories, "categories");
  
    // dateReleased field
    dateReleased = checkDateString(dateReleased, "dateReleased");
  
    // discontinued field
    discontinued = checkBool(discontinued, "discontinued");

    const productCollection = await products();
    const product  = await productCollection.findOne({_id: new ObjectId(productId)});
    // if no product exists with that id the method should throw
    if (product === null) {
      throw 'Error: No product with that id';
    }
    const updatedProduct = {
      productName: productName,
      productDescription: productDescription,
      modelNumber: modelNumber,
      price: price,
      manufacturer: manufacturer,
      manufacturerWebsite: manufacturerWebsite,
      keywords: keywords,
      categories: categories,
      dateReleased: dateReleased,
      discontinued: discontinued
    }
    const updatedInfo = await productCollection.findOneAndUpdate(
      {_id: new ObjectId(productId)},
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
  }
};
export default exportedMethods;
