// This file should set up the express server as shown in the lecture code
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import redis from 'redis';
const client = redis.createClient();
client.connect().then(() => { });

app.use('/api/pokemon', async (req, res, next) => {
  if (req.originalUrl === '/api/pokemon' || req.originalUrl === '/api/pokemon/') {
    let exists = await client.exists('pokemonList');
    if (exists) {
      console.log('Pokemon List is In Cache');
      let cacheList = await client.get('pokemonList');
      console.log('Sending pokemonList from Redis....');
      return res.status(200).json(JSON.parse(cacheList)); // send cache list instead of hitting route
      //console.log(cacheList)
    } else {
      console.log('Pokemon List not in cache');
      next();
    }
  } else {
    next();
  }
});

app.use('/api/pokemon/:id', async (req, res, next) => {
  if ((req.originalUrl === '/api/pokemon/' + req.params.id || 
       req.originalUrl === '/api/pokemon/' + req.params.id + '/') && 
       req.originalUrl !== '/api/pokemon/history') {
    let exists = await client.exists('pokemon ' + req.params.id);
    if (exists) {
      console.log('Pokemon is In Cache');
      let pokemon = await client.get('pokemon ' + req.params.id);
      console.log('Sending pokemon from Redis....');
      pokemon = JSON.parse(pokemon);
      await client.lPush("History", JSON.stringify(pokemon)); // add to history      
      return res.status(200).json(pokemon); // send cache instead of hitting route
    } else {
      console.log('Pokemon is not in cache');
      next();
    }
  } else {
    next();
  }
});

app.use('/api/move/', async (req, res, next) => {
  if (req.originalUrl === '/api/move' || (req.originalUrl === '/api/move/')) {
    let exists = await client.exists('moveList');
    if (exists) {
      console.log('Move List is In Cache');
      let cacheList = await client.get('moveList');
      console.log('Sending moveList from Redis....');
      return res.status(200).json(JSON.parse(cacheList)); // send cache list instead of hitting route
      //console.log(cacheList)
    } else {
      console.log('Move List not in cache');
      next();
    }
  } else {
    next();
  }
});

app.use('/api/move/:id', async (req, res, next) => {
  if (req.originalUrl === '/api/move/' + req.params.id ||
      req.originalUrl === '/api/move/' + req.params.id + '/') {
    let exists = await client.exists('move ' + req.params.id);
    if (exists) {
      console.log('Move is In Cache');
      let move = await client.get('move ' + req.params.id);
      console.log('Sending move from Redis....');
      return res.status(200).json(JSON.parse(move)); // send cache instead of hitting route
      //console.log(move)
    } else {
      console.log('Move is not in cache');
      next();
    }
  } else {
    next();
  }
});

app.use('/api/item/', async (req, res, next) => {
  if (req.originalUrl === '/api/item' || (req.originalUrl === '/api/item/')) {
    let exists = await client.exists('itemList');
    if (exists) {
      console.log('Item List is In Cache');
      let cacheList = await client.get('itemList');
      console.log('Sending itemList from Redis....');
      return res.status(200).json(JSON.parse(cacheList)); // send cache list instead of hitting route
      //console.log(cacheList)
    } else {
      console.log('Item List not in cache');
      next();
    }
  } else {
    next();
  }
});

app.use('/api/item/:id', async (req, res, next) => {
  if (req.originalUrl === '/api/item/' + req.params.id ||
      req.originalUrl === '/api/item/' + req.params.id + '/') {
    let exists = await client.exists('item ' + req.params.id);
    if (exists) {
      console.log('Item is In Cache');
      let item = await client.get('item ' + req.params.id);
      console.log('Sending item from Redis....');
      return res.status(200).json(JSON.parse(item)); // send cache instead of hitting route
      //console.log(item)
    } else {
      console.log('Item is not in cache');
      next();
    }
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});