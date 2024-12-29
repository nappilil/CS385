// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
const router = Router();
import { movieData } from '../data/index.js';
import validation from '../helpers.js';


router
  .route('/')
  .get(async (req, res) => {
    /** 
     * GET api/movies : shows a list of movies by default
     * shows first 20 movies in the collection. If a querystring links to an exernal site variable ?skip=n is provided you will skip the first n movies. 
     * If a querystring variable ?take=y is provided, it will show y number of movies. By default, the route will show up to 20 movies; at most, it will show 100 movies
     * */
    try {
      const movieList = await movieData.getAll();
      let result;
      if (Object.keys(req.query)[0] === undefined) { // by default show up to first 20 movies
        result = movieList.slice(0, 20);
      } else {
        if (Object.keys(req.query).length > 2) throw `Error: Query String must be either Skip or Take`;
        if (Object.keys(req.query).length === 1) {
          if (Object.keys(req.query)[0] !== 'skip' && Object.keys(req.query)[0] !== 'take') throw `Error: Query String must be either skip or take`;
          if (Object.keys(req.query)[0] === 'skip') {
            let n = req.query.skip;
            // If the client requests a value for skip that exceeds the total number of available records, we should return an empty array in the response.
            n = validation.checkNumber(n, 'Skip Number');
            result = movieList.slice(n, n + 20); // skip the first n movies, up to 20 movies by default
          }
          if (Object.keys(req.query)[0] === 'take') {
            let y = req.query.take;
            y = validation.checkNumber(y, 'Take Number');
            if (y > 100) throw `Error: Can only show up to 100 movies`;
            result = movieList.slice(0, y); // show y number of movies
          }
        } else if (Object.keys(req.query).length === 2) {
          if ((Object.keys(req.query)[0] !== 'skip' && Object.keys(req.query)[1] !== 'take') && (Object.keys(req.query)[1] !== 'skip' && Object.keys(req.query)[0] !== 'take'))
            throw `Error: Query String must be skip and/or take`;
          let n = req.query.skip, y = req.query.take;
          n = validation.checkNumber(n, 'Skip Number');
          y = validation.checkNumber(y, 'Take Number');
          if (y > 100) throw `Error: Can only show up to 100 movies`;
          // If the client requests a value for skip that exceeds the total number of available records, we should return an empty array in the response.
          result = movieList.slice(n, n + y); // skip the first n movies, up to 20 movies by default
        }
      }
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .post(async (req, res) => {
    /** 
     * POST api/movies : creates a movie with the supplied detail and returns created object
     * fails request if not all details supplied
     */
    //check all inputs, that should respond with a 400
    const moviePostData = req.body;
    if (!moviePostData || Object.keys(moviePostData).length === 0) {
      return res.status(400).json({ error: 'There are no fields in the request body' });
    }
    //check all inputs, that should respond with a 400
    try {
      moviePostData.title = validation.checkString(moviePostData.title, 'Title');
      if (moviePostData.title.length > 150) throw `Error: 'Title' must be less than 150 chars`;
      moviePostData.cast = validation.checkCast(moviePostData.cast, 'Cast');
      moviePostData.info = validation.checkInfo(moviePostData.info, 'Info');
      moviePostData.plot = validation.checkString(moviePostData.plot, 'Plot');
      if (moviePostData.plot.length > 500) throw `Error: 'Plot' must be less than 500 chars`;
      moviePostData.rating = validation.checkRating(moviePostData.rating, 'Rating');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //insert new movie
    try {
      const {
        title,
        cast,
        info,
        plot,
        rating } = moviePostData;
      const newMovie = await movieData.create(
        title,
        cast,
        info,
        plot,
        rating);
      return res.status(200).json(newMovie);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });
router
  .route('/:id')
  .get(async (req, res) => {
    /** GET api/movies/:id : shows the movie with the supplied ID */
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try getting the movie by ID
    try {
      const movie = await movieData.get(req.params.id);
      return res.status(200).json(movie);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    /** 
     * PUT api/movies/:id : Updates the movie with the supplied ID and returns the new movie object
     * NOTE: these calls must have all details of the new state of the objct to update
     * NOTE: cannot manipulate comments in this route!
     */
    let updatedData = req.body;
    try {
      //make sure there is something in the req.body
      if (updatedData === undefined || Object.keys(updatedData).length === 0)
        throw `Error: There are no fields in the request body`;
      if (Object.keys(updatedData).length !== 5)
        throw `Error: Need to supply all fields`;
      if (updatedData.title === undefined || 
        updatedData.cast === undefined || 
        updatedData.info === undefined ||
        updatedData.plot === undefined || 
        updatedData.rating === undefined)
          throw `Error: Need to supply all fields`;
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //check all the inputs that will return 400 if they fail
    try {
      req.params.id = validation.checkId(req.params.id, 'ID url param');
      updatedData.title = validation.checkString(updatedData.title, 'Title');
      if (updatedData.title.length > 150) throw `Error: 'Title' must be less than 150 chars`;
      updatedData.cast = validation.checkCast(updatedData.cast, 'Cast');
      updatedData.info = validation.checkInfo(updatedData.info, 'Info');
      updatedData.plot = validation.checkString(updatedData.plot, 'Plot');
      if (updatedData.plot.length > 500) throw `Error: 'Plot' must be less than 500 chars`;
      updatedData.rating = validation.checkRating(updatedData.rating, 'Rating');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const updatedMovie = await movieData.update(
        req.params.id,
        updatedData.title,
        updatedData.cast,
        updatedData.info,
        updatedData.plot,
        updatedData.rating
      );
      return res.status(200).json(updatedMovie);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .patch(async (req, res) => {
    /** 
    * PATCH api/movies/:id : Updates the movie with the supplied ID and returns the new movie object
    * NOTE: these calls only provide details of the value to update!
    * NOTE: cannot manipulate comments in this route!
    */
    let requestBody = req.body;
    //check to make sure there is something in req.body
    if (!requestBody || Object.keys(requestBody).length === 0) {
      return res.status(400).json({ error: 'There are no fields in the request body' });
    }
    //check the inputs that will return 400 is fail
    let title = undefined,
      cast = undefined,
      info = undefined,
      plot = undefined,
      rating = undefined;
    try {
      req.params.id = validation.checkId(req.params.id, 'Review ID');
      // check requestBody is an object and that there is at least 1 valid key
      requestBody = validation.checkObject(requestBody, "requestBody", "patchMovie");
      const existingMovieData = await movieData.get(req.params.id);
      // If update field exists and is valid, make update with new data
      if (requestBody.title) {
        requestBody.title = validation.checkString(requestBody.title, 'Title');
        if (requestBody.title.length > 150) throw `Error: 'Title' must be less than 150 chars`;
        title = requestBody.title;
        // otherwise grab existing data
      } else {
        title = existingMovieData.title;
      }
      if (requestBody.cast) {
        requestBody.cast = validation.checkCast(requestBody.cast, 'Cast');
        cast = requestBody.cast;
      } else {
        cast = existingMovieData.cast;
      }
      if (requestBody.info) {
        requestBody.info = validation.checkInfo(requestBody.info, 'Info');
        info = requestBody.info;
      } else {
        info = existingMovieData.info;
      }
      if (requestBody.plot) {
        requestBody.plot = validation.checkString(requestBody.plot, 'Plot');
        if (requestBody.plot.length > 500) throw `Error: 'Plot' must be less than 500 chars`;
        plot = requestBody.plot;
      } else {
        plot = existingMovieData.plot;
      }
      if (requestBody.rating) {
        requestBody.rating = validation.checkRating(requestBody.rating, 'Rating');
        rating = requestBody.rating;
      } else {
        rating = existingMovieData.rating;
      }
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try to perform update
    try {
      const updatedMovie = await movieData.update(
        req.params.id,
        title,
        cast,
        info,
        plot,
        rating
      );
      return res.status(200).json(updatedMovie);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });
router
  .route('/:id/comments')
  .post(async (req, res) => {
    /** 
     * POST api/movies/:id/comments : Adds a new comment ot the movie
     * ids must be generated by the server and not supplied
     */
    let commentPostData = req.body;
    //make sure there is something present in the req.body
    if (!commentPostData || Object.keys(commentPostData).length === 0)
      return res.status(400).json({ error: 'There are no fields in the request body' });
    //check all inputs, that should respond with a 400
    try {
      commentPostData = validation.checkObject(commentPostData, "requestBody", "postComment");
      req.params.id = validation.checkId(req.params.id, 'Id URL Param');
      commentPostData.name = validation.checkString(commentPostData.name, 'Name');
      commentPostData.name = validation.checkName(commentPostData.name, 'Name');
      commentPostData.comment = validation.checkString(commentPostData.comment, 'Comment');
      if (commentPostData.comment > 500) throw `Error: comment must be less than 500 chars`;
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const { name, comment } = commentPostData;
      const newComment = await movieData.createComment(
        req.params.id,
        name,
        comment);
      return res.status(200).json(newComment);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });
router
  .route('/:movieId/:commentId')
  .delete(async (req, res) => {
    /** DELETE api/movies/:movieId/commentId : Deletes the comment with an id of the commentId on the movie with an id of movieId*/
    try {
      req.params.movieId = validation.checkId(req.params.movieId, 'Id URL Param');
      req.params.commentId = validation.checkId(req.params.commentId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    //try to delete comment
    try {
      let deletedComment = await movieData.deleteComment(
        req.params.movieId,
        req.params.commentId
      );
      return res.status(200).json(deletedComment);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });

export default router;