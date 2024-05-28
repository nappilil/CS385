//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/movies.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import {searchMoviesByName, searchMovieById} from '../data/movies.js';
import validation from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home', {pageTitle: "Movie Finder"});
});

router.route('/searchmovies').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchMoviesByName and then call your data function passing in the searchMoviesByName and then rendering the search results of up to 20 Movies.
  let movieTitle = req.body;
  let errors = [];
  try {
    movieTitle.searchMoviesByName = validation.checkString(movieTitle.searchMoviesByName, 'Title');
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) {
    res.status(400).render('home', {
      errors: errors,
      hasErrors: true,
      movie: movieTitle.searchMoviesByName,
    });
    return;
  }
  let title = movieTitle.searchMoviesByName;
  let movieList;
  try {
    movieList = await searchMoviesByName(title);
    if (movieList.length === 0) {
      res.status(404).render('error', {searchMoviesByName: title, pageTitle: "Not Found", movieSearchError: true, movieIDError: false});
      return;
    }
  } catch (e) {
    res.status(404).json({error: e});
  }
  try {
    res.status(200).render('movieSearchResults', {movie: movieList, search: title, pageTitle: "Movies Found"});
  } catch (e) {
    res.status(404).json({error: e});
  }
});

router.route('/movie/:id').get(async (req, res) => {
  //code here for GET a single movie
  let id = req.params.id
  try {
    id = validation.checkImdbID(id, "imdbID");
  } catch (e) {
    res.status(400).render('error', {imdbID: id, pageTitle: "Invalid imdbID", movieSearchError: false, movieIDError: true});
    return;
  }
  let movie;
  try {
    movie = await searchMovieById(id);
    if (movie === undefined) {
      res.status(404).render('error', {searchMoviesByName: id, pageTitle: "Not Found", movieSearchError: true, movieIDError: false});
    return;
    }
  } catch (e) {
    res.status(404).json({error: e});
  }
  try {
    res.status(200).render('movieById', {movie: movie, pageTitle: movie.Title});
  } catch (e) {
    res.status(404).json({error: e});
  }
});

export default router
