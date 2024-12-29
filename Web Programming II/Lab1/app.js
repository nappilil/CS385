// This file should set up the express server as shown in the lecture code
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());
let serverRequests = 1;
app.use('/', async (req, res, next) => {
  console.log(
    "Total Requests to the Server: " + serverRequests);
  serverRequests++;
  next();
});
app.use('/', async (req, res, next) => {
  console.log("Request Body:", req.body);
  console.log("URL Path: " + req.originalUrl);
  console.log("HTTP verb: " + req.method);
  next();
});
let obj = {};
app.use('/', async (req, res, next) => {
  const URL = req.path;
  if (obj[URL] === undefined) {
    obj[URL] = 1;
  } else {
    obj[URL] = obj[URL] + 1;
  }
  for (let [key, value] of Object.entries(obj)) {
    console.log(
      "Total Requests to " + key + ": " + value);
  }
  console.log('\n'); // just to make viewing easier
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});