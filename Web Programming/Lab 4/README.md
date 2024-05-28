# CS-546 Lab 4: MongoDB

For this lab, we are going to make a few parts of a product database. You will create the first of these data modules, the module to handle a listing of products.

## Objectives

You will:

- Separate concerns into different modules.
- Store the database connection in one module.
- Define and store the database collections in another module.
- Define your Data manipulation functions in another module.
- Continue practicing the usage of `async` / `await` for asynchronous code.
- Continue our exercises of linking these modules together as needed.

## Packages
Use the [mongodb](https://www.npmjs.com/package/mongodb) package to hook into MongoDB.

# Product Schema
The schema for a Product is as follows:

```json
{
    "_id": "ObjectId", 
    "productName": "string",
    "productDescription": "string",
    "modelNumber": "string",
    "price": "number/float (9.99, 199.99, 59.00, 100, 5 etc)",
    "manufacturer": "string", 
    "manufacturerWebsite": "string (must contain full url http://www.phillips.com)",
    "keywords": ["array", "of", "strings"],
    "categories": ["array", "of", "strings"],
    "dateReleased": "string date in mm/dd/yyyy format",
    "discontinued": "boolean"
}
```

## Example
An example of how the 83 inch LG C3 OLED TV would be stored in the DB:

```json
{
    "_id": "ObjectId(\"507f1f77bcf86cd799439011\")",     
    "productName": "83 inch LG C3 OLED TV",
    "productDescription": "The advanced LG OLED evo C-Series is better than ever...",
    "modelNumber": "OLED83C3PUA",    
    "price": 4757.29,
    "manufacturer": "LG", 
    "manufacturerWebsite": "http://www.lgelectronics.com",
    "keywords": ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],
    "categories": ["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
    "dateReleased": "02/27/2023",
    "discontinued": false
}
```
