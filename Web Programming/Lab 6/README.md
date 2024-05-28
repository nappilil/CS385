# CS-546 Lab 6: A Product API

For this lab, will create a simple server that provides an API for someone to Create, Read, Update, and Delete products and also product reviews.

## Learning Objectives
- Separating concerns into different modules: Database connection in one module, Collections defined in another, Data manipulation in another.
- Practicing the usage of async/await for asynchronous code.
- Developing a simple (10 route) API server.

## Packages Used
- Will use the [mongodb](https://www.npmjs.com/package/mongodb) package to hook into MongoDB.
- Express will be used for creating the server.

## Database Structure
- The collection you use to store products will be called `products` and  will store a sub-document of reviews.
- Only ONE collection is used. The reviews are stored in the products collection as an array of objects.

### Products
The schema for a product is as follows:

```json
{
   "_id": "ObjectId",
   "productName": "string",
   "productDescription": "string",
   "modelNumber": "string",
   "price": "number/float (e.g., 9.99, 199.99, 59.00, 100, 5 etc)",
   "manufacturer": "string", 
   "manufacturerWebsite": "string (must contain full url http://www.phillips.com)",
   "keywords": ["array", "of", "strings"],
   "categories": ["array", "of", "strings"],
   "dateReleased": "string date in mm/dd/yyyy format",
   "discontinued": "boolean",
   "reviews": "array of review objects (you will initialize this field to be an empty array when a product is created)",
   "averageRating": "number (from 0 to 5, this will be a computed average from all the product reviews posted for a product, the initial value of this field will be 0 when a product is created)"
}
```
### The Sceham for Product Review Sub-document
```json
{ 
  "_id": "ObjectId",
  "title": "string",
  "reviewDate": "string (string value of a date in MM/DD/YYYY format)",
  "reviewerName": "string",
  "review": "string", 
  "rating": "number ranging from 1-5 (floats will be accepted as long as they are in the range of 1-5)"
}
```