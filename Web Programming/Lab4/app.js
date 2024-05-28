/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/
import {create, getAll, get, remove, rename} from "./data/products.js";

import {dbConnection, closeConnection} from './config/mongoConnection.js';
//lets drop the database each time this is run

const db = await dbConnection();
await db.dropDatabase();

let appleWatch = undefined;
let laptop = undefined;
let iPhone = undefined;

async function main() {
    // Create a product of your choice.
    console.log("---------------------- 1st Product -----------------")
    try {
        appleWatch = await create(
        "Apple Watch Series 7", 
        "Experience the future on your wrist with the Apple Watch Series 7.",
        "AW7-2024", 
        399.99, 
        "Apple Inc" , 
        "http://www.apple.com",  
        ["Apple Watch", "Smartwatch", "fitness tracking", "wearable technology"],
        ["Electronics", "Smartwatches", "Health & Fitness",  "OLED TVs"],
        "10/15/2021", 
        false );
        // Log the newly created product. (Just that product, not all products)
        console.log(appleWatch)
    } catch (e) {
        console.log(e);
    }
    // Create another product of your choice.
    console.log("---------------------- 2nd Product -----------------")
    try {
        laptop = await create(
        "ThinkPad X1 Yoga Gen. 6", 
        "Introducing the ThinkPad X1 Yoga Gen 6, the epitome of business-class 2-in-1 laptops.",
        "20Y0CTO1WW", 
        1540.00, 
        "Lenovo" , 
        "http://www.lenovo.com",  
        ["ThinkPad", "X1 Yoga", "2-in-1 laptop", "Touchscreen"],
        ["Electronics", "Laptops", "School"],
        "01/11/2021", 
        false );
    } catch (e) {
        console.log(e);
    }
    // Query all products, and log them all
    console.log("---------------------- All Products -----------------")
    let allProducts = await getAll();
    console.log(allProducts);
    // Create the 3rd product of your choice.
    console.log("---------------------- 3rd Product -----------------")
    try {
        iPhone = await create(
        "iPhone XR", 
        "Experience the perfect blend of performance and affordability with the iPhone XR.",
        "A1984", 
        599.99, 
        "Apple Inc" , 
        "http://www.apple.com",  
        ["iPhone XR", "Smartphone", "iPhone", "Face ID"],
        ["Electronics", "Smartphone", "Mobile", "Apple"],
        "10/26/2018", 
        false );
        // Log the newly created 3rd product. (Just that product, not all product)
        console.log(iPhone);
    } catch (e) {
        console.log(e);
    }
    // Rename the first product
    try {
        appleWatch = await rename(appleWatch._id.toString(), "My Apple Watch Series 7");
        console.log("---------------------- Updated 1st Product -----------------")
        console.log(appleWatch);
    } catch (e) {
        console.log(e);
    }
    // Remove the second product you created.
    try {
        laptop = await remove(laptop._id.toString());
        console.log("---------------------- Removed 2nd Product -----------------")
        console.log(laptop);
    } catch (e) {
        console.log(e);
    }
    console.log("---------------------- All Products -----------------")
    allProducts = await getAll();
    console.log(allProducts);

    //Try to create a product with bad input parameters to make sure it throws errors.
    try {
        const badProduct = await create(
        "Bad Input");
        // Log the newly created 3rd product. (Just that product, not all product)
        console.log(iPhone);
    } catch (e) {
        console.log(e);
    }
    //Try to remove a product that does not exist to make sure it throws errors.
    try {
        laptop = await remove('not-real-id');
        console.log("---------------------- Removed 2nd Product -----------------")
        console.log(laptop);
    } catch (e) {
        console.log(e);
    }
    //Try to rename a product that does not exist to make sure it throws errors.
    try {
        laptop = await rename('not-real-id', 'New Name');
    } catch (e) {
        console.log(e);
    }
    //Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
    try {
        const product = await rename(appleWatch._id.toString(), '');
    } catch (e) {
        console.log(e);
    }
    //Try getting a product by ID that does not exist to make sure it throws errors.
    try {
        laptop = await get();
    } catch (e) {
        console.log(e);
    }
await closeConnection();
}
main();


