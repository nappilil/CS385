// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
const router = Router();
import { pokemonData } from '../data/index.js';
import { moveData } from '../data/index.js';
import { itemData } from '../data/index.js';
import validation from '../helpers.js';
import redis from 'redis';
//import * as flat from 'flat';
//const unflatten = flat.unflatten;
const client = redis.createClient();
client.connect().then(() => { });

router
  .route('/pokemon/history')
  .get(async (req, res) => {
    /** 
    This route will respond with an array of the last 25 Pokémon that were accessed in the cache from the recently viewed list
    (if there are less than 25, then just display however many there are). 
    When the pokemon/:id route is requested, you will then add that Pokémon's data to this list. 
    You can have duplicate Pokémon in your 25 Pokémon list.  
    Your middleware function will also add a Pokémon to this list when the data is returned from cache. 
    So anytime a Pokémon is accessed by id, (if it comes from the API or the cache), you will add it to this list.
    * */
    const historyList = (await client.lRange("History", 0, 24)).map(JSON.parse);
    console.log(historyList.length);
    return res.status(200).json(historyList);
  })


router
  .route('/pokemon/:id')
  .get(async (req, res) => {
    /** 
    This route will do 4 things:
    1. It will query the data from the Pokémon API for the Pokémon with the ID specified in the URL Params.  You will fail the request if the Pokémon id is not found in the API (if it can't find that Pokémon with the specified ID, you do not add anything to cache)
    2. If the Pokémon for the specified ID is found, you will then add the data for that Pokémon to the cache. 
    3. You will then send a response to the browser of the JSON returned from the API call from step 1. 
    4. If the Pokémon is found, then you will also add that Pokémon's data to a Redis list of recently viewed Pokémon (see history route below) ordered by most recent Pokémon accessed. This list can be infinitely large.
    Note:  This route must work for EVERY valid ID in the API.
     * */
    try {
      req.params.id = validation.checkId(req.params.id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      let pokemon = await pokemonData.getPokemonById(req.params.id);
      if (pokemon === undefined) throw `Error: Not a valid ID`;
      await client.set('pokemon ' + req.params.id, JSON.stringify(pokemon)); // send list to cache
      console.log('pokemon sent to cache');
      //let pokemonName = unflatten(pokemon);
      await client.lPush("History", JSON.stringify(pokemon)); // add to history
      return res.status(200).json(pokemon);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })

router
  .route('/pokemon')
  .get(async (req, res) => {
    /** 
     *  1. It will query the data from the Pokémon API for the list of Pokémon.
        2. You will then add the data of all the Pokémon returned from the API to the Cache. 
        3. You will then send a response to the browser of the JSON returned from the API call in step 1.
     * */   
    console.log(req.params.id);
    try {
      const pokemonList = await pokemonData.getAllPokemon(); // query all data
      await client.set('pokemonList', JSON.stringify(pokemonList)); // send list to cache
      console.log('pokemon list set to cache')
      return res.status(200).json(pokemonList); //  send response to browser
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })


router
  .route('/move')
  .get(async (req, res) => {
    /** 
    This route will do three things:
    1. It will query the data from the Pokémon API for the list of moves.
    2. You will then add the data of all the moves returned from the API to the Cache. 
    3. You will then send a response to the browser of the JSON returned from the API call from step 1
     * */
    try {
      if (req.originalUrl === '/api/move/') throw `Error: invalid ID`;
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const moveList = await moveData.getAllMoves();
      await client.set('moveList', JSON.stringify(moveList)); // send list to cache
      console.log('move list sent to cache');
      return res.status(200).json(moveList);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })

router
  .route('/move/:id')
  .get(async (req, res) => {
    /** 
    This route will do three things:
    1. It will query the data from the Pokémon API for the move with the ID specified in the URL Params.  You will fail the request if the move id is not found in the API (if it can't find that move with the specified ID, you do not add anything to cache)
    2. If the move for the specified ID is found, you will then add the data for that move to the cache. 
    3. You will then send a response to the browser of the JSON returned from the API call from step 1. 
    Note:  This route must work for EVERY valid ID in the API.
     * */
    try {
      req.params.id = validation.checkId(req.params.id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const move = await moveData.getMoveById(req.params.id);
      await client.set('move ' + req.params.id, JSON.stringify(move)); // send list to cache
      console.log('move sent to cache');
      return res.status(200).json(move);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })

router
  .route('/item')
  .get(async (req, res) => {
    /** 
    This route will do three things:
    1. It will query the data from the Pokémon API for the list of item.
    2. You will then add the data of all the items returned from the API to the Cache. 
    3. You will then send a response to the browser of the JSON returned from the API call from step 1
     * */
    try {
      const itemList = await itemData.getAllItems();
      await client.set('itemList', JSON.stringify(itemList)); // send list to cache
      console.log('item list sent to cache');
      return res.status(200).json(itemList);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })

router
  .route('/item/:id')
  .get(async (req, res) => {
    /** 
    1. It will query the data from the Pokémon API for the item with the ID specified in the URL Params.  You will fail the request if the item id is not found in the API (if it can't find that item with the specified ID, you do not add anything to cache)
    2. If the item for the specified ID is found, you will then add the data for that item to the cache. 
    3. You will then send a response to the browser of the JSON returned from the API call from step 1.  
    Note:  This route must work for EVERY valid ID in the API.
    * */
    try {
      req.params.id = validation.checkId(req.params.id, "ID");
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const item = await itemData.getItemById(req.params.id);
      await client.set('item ' + req.params.id, JSON.stringify(item)); // send list to cache
      console.log('item sent to cache');
      return res.status(200).json(item);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })


export default router;