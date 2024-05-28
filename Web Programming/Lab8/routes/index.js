//Here you will import route files and export them as used in previous labs
import moviesRoutes from './movies.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  app.use('/', moviesRoutes);
  app.use('/searchmovies', moviesRoutes);
  app.use('/movie', moviesRoutes);
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;