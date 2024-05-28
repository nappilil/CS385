import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {registerUser, loginUser} from '../data/users.js';

const db = await dbConnection();
await db.dropDatabase();

let userOne = undefined;

try {
    let userOne = await registerUser("Patrick", "Hill", "graffixnyc", "Test123$", "We have two lives, the 2nd begins when you realize you only have one.", "light", "admin");
    console.log(userOne);
} catch (e) {
    console.log(e);
}

try {
    let userOne = await loginUser("graffixnyc", "Test123$");
    console.log(userOne);
} catch (e) {
    console.log(e);
}



console.log()




console.log('Done seeding database');

await closeConnection();
