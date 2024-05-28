//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import {Router} from 'express';
const router = Router();
import {idErrorCheck} from '../helpers.js';
import {getPeople, getPersonById} from '../data/data.js';

router.route('/')
// Implement GET Request Method and send a JSON response  See lecture code!
  .get(async (req, res) => {
    try {
      const peopleList = await getPeople();
      return res.json(peopleList);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
router.route('/:id')
// Implement GET Request Method and send a JSON response See lecture code!
    .get(async (req, res) => {
    try {
      req.params.id = idErrorCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const person = await getPersonById(req.params.id);
      return res.json(person);
    } catch (e) {
      return res.status(404).json(e);
    }
  });
export default router;
