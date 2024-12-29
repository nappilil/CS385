// This data file should export all functions using the ES6 standard as shown in the lecture code
import axios from 'axios'; //you must use axios to get the data 
import validation from '../helpers.js'

const exportedMethods = {

    async getAllPokemon() {
        let pokemonList = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        return pokemonList.data.results;
      },

      async getPokemonById(id) {
        id = validation.checkId(id, "ID");
        let pokemon;
        try { // put in try catch so if axios throws 404 have custom error message
          pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id);
        } catch (e) {
          throw `Error: ID does not exist`;        
        }
        return pokemon.data;
      }

};
export default exportedMethods;
