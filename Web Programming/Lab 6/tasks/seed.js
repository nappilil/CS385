import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import products from '../data/products.js';
import reviews from '../data/reviews.js';

const db = await dbConnection();
await db.dropDatabase();

let TV = undefined,
    appleWatch = undefined,
    laptop = undefined,
    review1 = undefined,
    review2 = undefined,
    allReviews = undefined;

TV = await products.create(
    "83 inch LG C3 OLED TV",
    "The advanced LG OLED evo C-Series is better than ever.",
    "OLED83C3PUA",
    4757.29,
    "LG",
    "http://www.lgelectronics.com",
    ["TV", "Smart TV", "OLED", "LG", "Big Screen", "83 Inch"],
    ["Electronics", "Television & Video", "Televisions",  "OLED TVs"],
    "02/27/2023",
    false
 );
try {
    appleWatch = await products.create(
        "Apple Watch Series 7", 
        "Experience the future on your wrist with the Apple Watch Series 7.",
        "AW7-2024", 
        399.99, 
        "Apple Inc" , 
        "http://www.apple.com",  
        ["Apple Watch", "Smartwatch", "fitness tracking", "wearable technology"],
        ["Electronics", "Smartwatches", "Health & Fitness",  "OLED TVs"],
        "10/15/2021", 
        false
    );
} catch (e) {
    console.log(e);
}
//let all = await products.getAll();
//console.log(all);
try {
    laptop = await products.update(
        appleWatch._id.toString(),
        "ThinkPad X1 Yoga Gen 6", 
        "Introducing the ThinkPad X1 Yoga Gen 6, the epitome of business-class 2-in-1 laptops.",
        "20Y0CTO1WW", 
        1540.00, 
        "Lenovo" , 
        "http://www.lenovo.com",  
        ["ThinkPad", "X1 Yoga", "2-in-1 laptop", "Touchscreen"],
        ["Electronics", "Laptops", "School"],
        "01/11/2021", 
        false 
    )
} catch (e) {
    console.log(e);
}
//let all = await products.getAll();
//console.log(all);
try {
    review1 = await reviews.createReview(
        TV._id.toString(),
        "Wow!!",
        "Patrick Hill",
        "This TV was amazing! I don't know how I'll ever go back after experiencing OLED!", 
        5
    ) // return review object
} catch (e) {
    console.log(e);
}
review2 = await reviews.createReview(
    TV._id.toString(),
    "Trash!!",
    "Lilli Nappi",
    "DO NOT buy this", 
    1.5
) // return review object

//let all = await products.getAll();
//console.log(all);


allReviews = await reviews.getAllReviews(TV._id.toString()); // array of objects

let noReviews = await reviews.getAllReviews(laptop._id.toString()); // empty array
try {
review1 = await reviews.getReview(allReviews[0]._id.toString()); // returns patrick review
} catch (e) {
    console.log(e);
}
review2 = await reviews.getReview(allReviews[1]._id.toString()); // returns my review

// await reviews.getReview(TV._id.toString()); throws review not found
try {
    await reviews.updateReview(allReviews[1]._id.toString(), {
        "reviewerName": "Anonymous",
        "badfield": "Terrible product, do not waste your money. Would give a 0 rating if I could", 
        "rating": 1.0
    })
} catch (e) {
    console.log(e);
}
let removedReview = allReviews[0]
try {
    await reviews.removeReview(removedReview._id.toString()) // get rid of first review
} catch (e) {
    console.log(e);
}
// try again should throw since no product with that id
/** 
try {
    await reviews.removeReview(removedReview._id.toString()) // get rid of first review
} catch (e) {
    console.log(e);
}
*/

console.log()




console.log('Done seeding database');

await closeConnection();