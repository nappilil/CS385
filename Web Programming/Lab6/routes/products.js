// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {productData} from '../data/index.js';
import {checkId, checkString, checkStringArray, checkPrice, checkWebsiteString, checkDateString, checkBool} from '../helpers.js';


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const productList = await productData.getAll();
      return res.status(200).json(productList);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const productPostData = req.body;
    //make sure there is something present in the req.body
    if (!productPostData || Object.keys(productPostData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check all inputs, that should respond with a 400
    try {
      productPostData.productName = checkString(productPostData.productName, 'productName');
      productPostData.productDescription = checkString(productPostData.productDescription, 'productDescription');
      productPostData.modelNumber = checkString(productPostData.modelNumber, 'modelNumber');
      productPostData.price = checkPrice(productPostData.price, 'price');
      productPostData.manufacturer = checkString(productPostData.manufacturer, 'manufacturer');
      productPostData.manufacturerWebsite = checkWebsiteString(productPostData.manufacturerWebsite, 'manufacturerWebsite');
      productPostData.keywords = checkStringArray(productPostData.keywords, 'keywords'); 
      productPostData.categories = checkStringArray(productPostData.categories, 'categories');           
      productPostData.dateReleased = checkDateString(productPostData.dateReleased, 'dateReleased');
      productPostData.discontinued = checkBool(productPostData.discontinued, 'discontinued');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //insert new product
    try {
      const {
        productName, 
        productDescription, 
        modelNumber, 
        price, 
        manufacturer, 
        manufacturerWebsite, 
        keywords,
        categories,
        dateReleased,
        discontinued} = productPostData;
      const newProduct = await productData.create(
        productName, 
        productDescription, 
        modelNumber, 
        price, 
        manufacturer, 
        manufacturerWebsite, 
        keywords,
        categories,
        dateReleased,
        discontinued);
      return res.status(200).json(newProduct);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });
router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    //check inputs that produce 400 status
    try {
      req.params.productId = checkId(req.params.productId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try getting the product by ID
    try {
      const product = await productData.get(req.params.productId);
      return res.status(200).json(product);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    //check the id
    try {
      req.params.productId = checkId(req.params.productId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to delete post
    try {
      let deletedProduct = await productData.remove(req.params.productId);
      return res.status(200).json(deletedProduct);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let updatedData = req.body;
    //make sure there is something in the req.body
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check all the inputs that will return 400 if they fail
    try {
      req.params.productId = checkId(req.params.productId, 'ID url param');
      updatedData.productName = checkString(updatedData.productName, 'productName');
      updatedData.productDescription = checkString(updatedData.productDescription, 'productDescription');
      updatedData.modelNumber = checkString(updatedData.modelNumber, 'modelNumber');
      updatedData.price = checkPrice(updatedData.price, 'price');
      updatedData.manufacturer = checkString(updatedData.manufacturer, 'manufacturer');
      updatedData.manufacturerWebsite = checkWebsiteString(updatedData.manufacturerWebsite, 'manufacturerWebsite');
      updatedData.keywords = checkStringArray(updatedData.keywords, 'keywords'); 
      updatedData.categories = checkStringArray(updatedData.categories, 'categories');           
      updatedData.dateReleased = checkDateString(updatedData.dateReleased, 'dateReleased');
      updatedData.discontinued = checkBool(updatedData.discontinued, 'discontinued');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to update the product
    try {
      const updatedProduct = await productData.update(
        req.params.productId,
        updatedData.productName,
        updatedData.productDescription,
        updatedData.modelNumber,
        updatedData.price,
        updatedData.manufacturer,
        updatedData.manufacturerWebsite,
        updatedData.keywords,
        updatedData.categories,        
        updatedData.dateReleased,
        updatedData.discontinued
      );
      return res.status(200).json(updatedProduct);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

export default router;