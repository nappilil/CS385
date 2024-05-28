/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from 'axios'; //you must use axios to get the data
import {idErrorCheck} from '../helpers.js'

// I used the work I did from lab3 for most of the following code:
const getCompanies = async () => {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
};

const getPeople = async () => {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
};

const getCompanyById = async (id) => {
    id = idErrorCheck(id);
    let data = await getCompanies(); // get data
    let result = data.filter(company => company.id === id); // filter returns an array
    if (result.length === 0) {
        throw `Error: Company Not Found!`;
    }
    return result[0]; // do not return array-object
};

const getPersonById = async (id) => {
    id = idErrorCheck(id);
    let data = await getPeople(); // get data
    let result = data.filter(person => person.id === id); // filter returns an array
    if (result.length === 0) {
        throw `Error: Person Not Found!`;
    }
    return result[0]; // do not return array-object
};

export {getCompanies, getPeople, getCompanyById, getPersonById};