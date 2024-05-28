import axios from 'axios'; //you must use axios to get the data 
import validation from '../helpers.js'

export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=[your_api_key]={title}
  */
  title = validation.checkString(title, "Title"); // error check
  let movies = [];
  let pageOne = await axios.get('http://www.omdbapi.com/?apikey=[your_api_key]=' + title);
  pageOne = pageOne.data.Search; // just get the list of objects
  // if no movies found, return empty list
  if (pageOne === undefined) {
    return movies;
  } 
  pageOne.forEach((object) => {
    movies.push(object); // add all of page one
  });
  // get page two
  let pageTwo = await axios.get('http://www.omdbapi.com/?apikey=[your_api_key]='+ title +'&page=2')
  pageTwo = pageTwo.data.Search; // just get the list of objects

  if (pageTwo !== undefined) {
    pageTwo.forEach((object) => {
      movies.push(object); // add all of page two
    });
  }
  // filter to only the needed fields
  movies = movies.map(movie => {
    const {Title, imdbID, Poster} = movie;
    return {Title, imdbID, Poster};
  });
  return movies;
};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=[your_api_key]={id}
  */

 id = validation.checkImdbID(id, "imdbID"); // error check

 let movie = await axios.get('http://www.omdbapi.com/?apikey=[your_api_key]=' + id);
   // filter to only the needed field
 return movie.data;
};
