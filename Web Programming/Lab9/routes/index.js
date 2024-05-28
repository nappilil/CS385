//Here you will require route files and export them as used in previous labs.
import textdecoderRoutes from './textdecoder.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  app.use('/', textdecoderRoutes);
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

export default constructorMethod;