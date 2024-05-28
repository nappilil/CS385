/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the text analyzer page.

you just need one route to send the static homepage.html file
*/
import {Router} from 'express';
const router = Router();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.route('/').get(async (req, res) => {
    res.sendFile(path.join(__dirname,'../static/homepage.html'));
    //https://bobbyhadz.com/blog/path-must-be-absolute-or-specify-root-to-res-sendfile
});

export default router;