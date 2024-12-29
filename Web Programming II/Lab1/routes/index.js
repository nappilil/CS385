// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /api/movies use the routes defined in the movies.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import movieRoutes from './movies.js';

const constructorMethod = (app) => {
  app.use('/api/movies', movieRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;