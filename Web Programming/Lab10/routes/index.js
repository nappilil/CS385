//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import usersRoutes from './auth_routes.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  app.use('/', usersRoutes);
  app.use('/register', usersRoutes);
  app.use('/login', usersRoutes);
  app.use('/user', usersRoutes);
  app.use('/admin', usersRoutes);
  app.use('/logout', usersRoutes);
  app.use('/public', staticDir('public'));
  app.use('/user/admin', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;