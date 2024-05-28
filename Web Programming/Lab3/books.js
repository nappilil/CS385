//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import axios from 'axios';

async function getBooks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
    return data;
}
// return book object for specified id within the books
const getBookById = async (id) => {
    // argument exists
    if (!id) {
        throw `Error: no arguments`
    }
    // argument is of proper type
    else if (typeof id !== "string") {
        throw `Error: not a string`
    }
    id = id.trim();
    // empty spaces
    if (id.length === 0) {
        throw `Error: empty string`
    }
    let data = await getBooks(); // get data
    let result = data.filter(book => book.id === id); // filter returns an array
    if (result.length === 0) { // not found in the array
        throw `Error: book not found`;
    }
    return result[0]; // do not return array-object
};
// return an array of book ids with page counts that fall between the min and max page counts
const booksByPageCount = async (min, max) => {
    // arguments exist
    if (!min && !max) {
        throw `Error: missing both arguments`;
    }
    else if (!min || min === undefined) {
        throw `Error: missing min argument`;
    }
    else if (!max || max === undefined) {
        throw `Error: missing max argument`;
    }
    // if not a number then error
    else if (typeof min !== "number" || isNaN(min)) {
        throw `Error: ${min || 'provided min'} is not a number`;
    }
    else if (typeof max !== "number" || isNaN(max)) {
        throw `Error: ${max || 'provided max'} is not a number`;
    }
    // if not positive then error
    else if (min <= 0 || max <= 0) {
        throw `Error: not a positive number`;
    }
    // if a decimal then error
    else if (min - Math.floor(min) !== 0) {
        throw `Error: ${min || 'provided min'} is a decimal`;
    }
    else if (max - Math.floor(max) !== 0) {
        throw `Error: ${max || 'provided max'} is a decimal`;
    }
    // if max is smaller than min then error
    else if (max <= min) {
        throw `Error: max is not greater than min`;
    }
    let data = await getBooks(); // get data
    let bookIds = []; // list of booksIds
    let flag = false; // flag to find if book was found
    publisher = publisher.to
    data.forEach((object) => { // iterate through book objects
        // if pageCount is in range
        if (object.pageCount >= min && object.pageCount <= max) {
            flag = true;
            bookIds.push(object.id); // push bookId to array
        }
    });
    // if false then book couldnt be found so throw error
    if (flag === false) {
        throw `Error: book not found`;
    } else { // otherwise return result
        return bookIds; // return result
    }
};

// return an array of all the books (full objects) published in the year provided
const sameYear = async (year) => {
    // arg exists
    if (!year) {
        throw `Error: missing year argument`;
    }
    // valid number
    else if (typeof year !== "number" || isNaN(year)) {
        throw `Error: ${year || 'provided year'} is not a number`;
    }
    // if not positive then error
    else if (year <= 0) {
        throw `Error: not a positive number`;
    }
    // if a decimal then error
    else if (year - Math.floor(year) !== 0) {
        throw `Error: ${year || 'provided year'} is a decimal`;
    }
    // valid year (1900 - 2024) inclusive
    else if (year < 1900 || year > 2024) {
        throw `Error: not a valid year`;
    }
    let data = await getBooks(); // get data
    let books = []; // list of book
    data.forEach((object) => {
        let publishedYear = object.publicationDate;
        publishedYear = new Date(publishedYear); // change to date format
        publishedYear = publishedYear.getFullYear(); // get the year
        if (Number(publishedYear) === year) { // if year is equal
            books.push(object); // add to array of book objects
        }
    });
    // if no books are found that year, return an empty array
    return books; // return result
};

import { minMaxHelper } from './helpers.js';
// return id of cheapest book and most expensive
// if a tie for more than one return all books in an array
const minMaxPrice = async () => {
    let cheapest = []; // array for cheapest books ids
    let expensive = []; // array for most expensive book ids
    let data = await getBooks(); // get data
    let max = minMaxHelper(data)[0]; // find the max
    let min = minMaxHelper(data)[1]; // find the min

    // for each book
    data.forEach((object) => {
        if (object.price === max) { // if a match
            expensive.push(object.id); // add book id to expensive
        }
        if (object.price === min) { // if a match
            cheapest.push(object.id); // add book id to cheapest
        }
    });
    // object result
    let minMax = {"cheapest": cheapest,
                  "mostExpensive": expensive }; 
    return minMax; // return result
};

const searchBooksByPublisher = async (publisher) => {
    // argument exists
    if (!publisher) {
        throw `Error: no arguments`
    }
    // argument is of proper type
    else if (typeof publisher !== "string") {
        throw `Error: not a string`
    }
    publisher = publisher.trim();
    // empty spaces
    if (publisher.length === 0) {
        throw `Error: empty string`
    }
    let data = await getBooks(); // get data
    let flag = false; // flag to find if book was found
    let bookIds = []; // book ids to return
    publisher = publisher.toLowerCase(); // case in-sensitive
    publisher = publisher[0].toUpperCase() + publisher.slice(1);
    data.forEach((object) => { // iterate through book objects
        if (object.publisher === publisher) { // if a match
            flag = true; // publisher was found
            bookIds.push(object.id); // push bookId to array
        }
    });
    // if false then publisher couldnt be found so throw error
    if (flag === false) {
        throw `Error: book not found`;
    } else { // otherwise return result
        return bookIds; // return result
    }
};

export {getBookById, booksByPageCount, sameYear, minMaxPrice, searchBooksByPublisher, getBooks };
