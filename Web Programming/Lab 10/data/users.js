//import mongo collections, bcrypt and implement the following data functions
import {users} from '../config/mongoCollections.js'; // import collection
import bcrypt from 'bcryptjs';
import {checkName, checkUsername, checkPassword, checkFavoriteQuote, checkThemePreference, checkRole } from '../helpers.js';

export const registerUser = async (
  firstName,
  lastName,
  username,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  // Error checking
  firstName = checkName(firstName, "First Name");
  lastName = checkName(lastName, "Last Name");
  username = checkUsername(username, "Username");
  password = checkPassword(password, "Password");
  favoriteQuote = checkFavoriteQuote(favoriteQuote, "Favorite Quote");
  themePreference = checkThemePreference(themePreference, "Theme Preference");
  role = checkRole(role, "Role");

  // Check that username is Not Already In Use
  const userCollection = await users();
  const existingUser = await userCollection.find({ username: username }).toArray();
  if (existingUser.length !== 0) throw `Error: Username is already in use`;

  // Hash Password
  password = await bcrypt.hash(password, 10);

  // Create new user w all info
  const newUser = {
    firstName,
    lastName,
    username,
    password,
    favoriteQuote,
    themePreference,
    role
  };

  // Add New User
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Error: Could not add user';
  return {signUpCompleted: true};
};

export const loginUser = async (username, password) => {
  if (!username || !password) {
    throw `Error: All fields must be supplied`;
  }
  username = checkUsername(username, "Username");
  password = checkPassword(password, "Password");

  // Check if username is found
  const userCollection = await users();
  const existingUser = await userCollection.find({ username: username }).toArray();
  if (existingUser.length === 0) throw `Error: Either the username or password is invalid`;

  // Check if password matches
  let compare = await bcrypt.compare(password, existingUser[0].password);
  if (!compare) throw `Error: Either the username or password is invalid`;

  return {firstName: existingUser[0].firstName, lastName: existingUser[0].lastName, favoriteQuote: existingUser[0].favoriteQuote, themePreference: existingUser[0].themePreference, role: existingUser[0].role}

};
