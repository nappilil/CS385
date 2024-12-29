// This data file should export all functions using the ES6 standard as shown in the lecture code
import axios from 'axios'; //you must use axios to get the data 
import validation from '../helpers.js'

const exportedMethods = {

  async getAllMoves() {
    let moveList = await axios.get('https://pokeapi.co/api/v2/move/');
    return moveList.data.results;
  },

  async getMoveById(id) {
    id = validation.checkId(id, "ID");
    let move;
    try {
      move = await axios.get('https://pokeapi.co/api/v2/move/' + id);
    } catch (e) {
      throw `Error: ID does not exist`;        
    }
    return move.data;
  }

};
export default exportedMethods;
