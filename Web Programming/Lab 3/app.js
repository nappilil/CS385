/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.


import * as authors from "./authors.js";

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import * as authors from "./authors.js";
import * as books from "./books.js";

console.log('---------------------------------- getAuthorById ------------------------------------');
try {
    const authorData = await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorById(-1);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorById();
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(authorData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- searchAuthorsByAge ------------------------------------');
try {
    const authorData = await authors.searchAuthorsByAge(40);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByAge(5000);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByAge("  ");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByAge("abc");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByAge();
    console.log(authorData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- getBooksByState ------------------------------------');
try {
    const authorData = await authors.getBooksByState("NJ");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getBooksByState(123);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getBooksByState("  ");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getBooksByState("Patrick");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getBooksByState();
    console.log(authorData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- searchAuthorsByHometown ------------------------------------');
try {
    const authorData = await authors.searchAuthorsByHometown("garDen grOve", "cA");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByHometown("New York City", "NY");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByHometown(123, 456);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByHometown("", "");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByHometown("Patrick", "Hill");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.searchAuthorsByHometown();
    console.log(authorData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- getAuthorBooks ------------------------------------');
try {
    const authorData = await authors.getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorBooks("2155574a-80b0-4389-8bb3-3240da52b770");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorBooks("  ");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorBooks(230);
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorBooks();
    console.log(authorData);
} catch (e) {
    console.log(e);
}
try {
    const authorData = await authors.getAuthorBooks("AuthorId");
    console.log(authorData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- getBookById ------------------------------------');
try {
    const bookData = await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.getBookById(-1);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.getBookById(1001);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.getBookById();
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.getBookById('hello');
    console.log(bookData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- booksByPageCount ------------------------------------');
try {
    const bookData = await books.booksByPageCount(300, 500);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.booksByPageCount(-1, 100);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.booksByPageCount("ABC", "3");
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.booksByPageCount();
    console.log(bookData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- sameYear ------------------------------------');
try {
    const bookData = await books.sameYear(2000);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.sameYear(-1);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.sameYear(1001);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.sameYear();
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.sameYear(false);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.sameYear("foo bar");
    console.log(bookData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- minMaxPrice ------------------------------------');
try {
    const bookData = await books.minMaxPrice();
    console.log(bookData);
} catch (e) {
    console.log(e);
}
console.log ('---------------------------------- searchBooksByPublisher ------------------------------------');
try {
    const bookData = await books.searchBooksByPublisher("skilith");
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.searchBooksByPublisher("A fake publisher");
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.searchBooksByPublisher();
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.searchBooksByPublisher(false);
    console.log(bookData);
} catch (e) {
    console.log(e);
}
try {
    const bookData = await books.searchBooksByPublisher("foo bar");
    console.log(bookData);
} catch (e) {
    console.log(e);
}