// This data file should export all functions using the ES6 standard as shown in the lecture code
import axios from 'axios'; //you must use axios to get the data 
import validation from '../helpers.js'

const exportedMethods = {

    async getAllItems() {
        let itemList = await axios.get('https://pokeapi.co/api/v2/item/');
        return itemList.data.results;
      },

      async getItemById(id) {
        id = validation.checkId(id, "ID");
        let item;
        try {
        item = await axios.get('https://pokeapi.co/api/v2/item/' + id);
        } catch (e) {
          throw `Error: ID does not exist`;
        }
        return item.data;
      }

};
export default exportedMethods;
