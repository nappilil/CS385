//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.
import {Router} from 'express';
const router = Router();
import {idErrorCheck} from '../helpers.js';
import {getCompanies, getCompanyById} from '../data/data.js';

router.route('/')
// Implement GET Request Method and send a JSON response See lecture code!
  .get(async (req, res) => {
    try {
      const companiesList = await getCompanies();
      return res.json(companiesList);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
router.route('/:id')
//Implement GET Request Method and send a JSON response See lecture code!
    .get(async (req, res) => {
    try {
      req.params.id = idErrorCheck(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const company = await getCompanyById(req.params.id);
      return res.json(company);
    } catch (e) {
      return res.status(404).json(e);
    }
  });
export default router;
