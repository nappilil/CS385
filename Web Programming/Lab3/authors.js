//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json
import axios from 'axios'; //you must use axios to get the data
import { sortLastNames } from './helpers.js';

async function getAuthors() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
    return data;
}

async function getBooks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json');
    return data;
}


// return the author for the specified id within the authors.json array
const getAuthorById = async (id) => {
    // if no argument
    if (!id || id === undefined) {
        throw `Error: no arguments`;
    }
    // if ID is not a string
    else if (typeof id !== "string") {
        throw `Error: Not a string`;
    }
    id = id.trim(); // trim string
    // if empty string
    if (id.length === 0) {
        throw `Error: empty string`;
    }
    let data = await getAuthors(); // get data
    let result = data.filter(author => author.id === id); // filter returns an array
    if (result.length === 0) {
        throw `Error: author not found`;
    }
    return result[0]; // do not return array-object

};
// return an array of author names whose age is equal to or older than age
const searchAuthorsByAge = async (age) => {
    // if no argument
    if (!age || age === undefined) {
        throw `Error: no arguments`;
    }
    // if not a number then error
    if (typeof age !== "number" || isNaN(age)) {
        throw `Error: ${age || 'provided age'} is not a number`;
    }
    // if a decimal then error
    else if (age - Math.floor(age) !== 0) {
        throw `Error: ${age || 'provided age'} is a decimal`;
    }
    // if not between 1-100 then error
    else if (age <= 1 || age >= 100) {
        throw `Error: no one is ${age} years old`;
    }
    let authors = []; // list of authors
    let data = await getAuthors(); // get data
    data.forEach((object) => {
        let birthday = object.date_of_birth;
        birthday = new Date(birthday); // change to date format
        birthday = birthday.getFullYear(); // get the year
        let today = new Date().getFullYear(); // get today's date
        let authorAge = Number(today) - Number(birthday); // get their age
        // if age is equal to or older 
        if (authorAge >= age) {
            let firstName = object.first_name; // get first name
            let lastName = object.last_name; // get last name
            let fullName = firstName + " " + lastName; // concatenate
            authors.push(fullName); // add to array of names
        }
    });
    return authors; // return names
};

// return an array of book names from authors  whose hometownn state is the same as state
const getBooksByState = async (state) => {
    // if no argument
    if (!state || state === undefined) {
        throw `Error: no arguments`;
    }
    // if ID is not a string
    else if (typeof state !== "string") {
        throw `Error: Not a string`;
    }
    state = state.trim(); // trim string
    // if empty string
    if (state.length === 0) {
        throw `Error: empty string`;
    }
    // if not two chars
    else if (state.length !== 2) {
        throw `Error: not two chars`;
    }
    state = state.toUpperCase(); // case in-sensitive
    let validStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    // if not valid state abbreviation
    if (!validStates.includes(state)) {
        throw `Error: not a valid state`;
    }
    let stateBooks = [] // list of book titles by state
    let books = []; // list of books by state
    let authorData = await getAuthors(); // get author data
    let bookData = await getBooks(); // get book data
    authorData.forEach((object) => {
        let homeState = object.HometownState; // get homeState
        if (homeState === state) { // if a match
            let authorId = object.id; // get book ids for that state
            books = books.concat(bookData.filter(book => book.authorId === authorId)); // filter returns an array
            // get array of book objects of authors from state based on author id
        }
    });
    // push only the title of the books to an array
    books.forEach((object) => {
        let title = object.title;
        stateBooks.push(title);
    });
    return stateBooks; // return array of book titles by state
};

// retun an array of author names whose hometown matches the town and state
const searchAuthorsByHometown = async (town, state) => {
    // town and state exist
    if (!town || town === undefined) {
        throw `Error: missing town argument`;
    }
    else if (!state || state === undefined) {
        throw `Error: missing state argument`;
    }
    // town and state are strings
    else if (typeof town !== "string" || typeof state !== "string") {
        throw `Error: not a string`;
    }
    town = town.trim();
    state = state.trim();
    if (town.length === 0 || state.length === 0) {
        throw `Error: empty string`;
    }
    // state is must be only two chars
    else if (state.length !== 2 ) {
        throw `Error: invalid state abbreviation`;
    }
    state = state.toUpperCase(); // case in-sensitive
    town = town.toLowerCase(); // case in-sensitive
    town = town.split(' ');
    let validTown = []; // correct format of town names
    // format each town to start each word with capital and rest lower case
    town.forEach((word) => {
        word = word[0].toUpperCase() + word.slice(1); // uppercase first letter of each word
        validTown.push(word);
    });
    validTown = validTown.join(" "); // put back in a string
    town = validTown // overwrite
    // state is valid abbreviation
    let validStates = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    if (!validStates.includes(state)) {
        throw `Error: not a valid state`;
    }
    let authors = []; // list of authors
    let authorData = await getAuthors(); // get author data
    authorData.forEach((object) => {
        let homeTown = object.HometownCity; // get homeState
        let homeState = object.HometownState; // get homeState
        if (homeState === state && homeTown === town) { // if a match
            let firstName = object.first_name; // get first name
            let lastName = object.last_name; // get last name
            let fullNames = {};
            // make object of FirstName: name, LastName: name, objects
            fullNames["FirstName"] = firstName;
            fullNames["LastName"] = lastName;
            authors.push(fullNames); // add to authors array to be an array of objects
            //let fullName = firstName + " " + lastName; // concatenate
            //authors.push(fullName);
        }
    });
    // sort authors names in AZ order by last name
    authors = authors.sort(sortLastNames); // sort last names
    // make a new array for author names
    let fullNames = [];
    // concatenate full names in AZ order
    authors.forEach((object) => {
        fullNames.push(object["FirstName"] + " " + object["LastName"]);
    });
    return fullNames; // return array
};

// return all the books for the author with the given id
const getAuthorBooks = async (authorid) => {
    // argument exists
    if (!authorid || authorid === undefined) {
        throw `Error: no arguments`
    }
    // argument is a string
    else if (typeof authorid !== "string") {
        throw `Error: not a string`
    }
    authorid = authorid.trim();
    if (authorid.length === 0) {
        throw `Error: empty string`
    }
    // is valid author id
    let authorData = await getAuthors(); // get data
    let bookData = await getBooks(); // get data
    let bookNames = []; // books to return
    let flag = false;
    authorData.forEach((object) => {
        if (object.id === authorid) { // if a match
            flag = true; // flag to indicate author was found
            let books = object.books;
            // get array of book objects of authors based on author id
            books.forEach((bookId) => { // look up bookId of book in books
                bookNames = bookNames.concat(bookData.filter(book => book.id === bookId)); // filter returns an array
            });
        }
    });
    let result = [];
    // push only the title of the books to an array
    bookNames.forEach((object) => {
        let title = object.title;
        result.push(title);
    });
    // if false then author couldnt be found so throw error
    if (flag === false) {
        throw `Error: author not found`;
    } else { // otherwise return result
        return result; // return result
    }
};

export {getAuthors, getAuthorById, searchAuthorsByAge, getBooksByState, searchAuthorsByHometown, getAuthorBooks };
