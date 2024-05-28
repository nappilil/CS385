// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {reviewData} from '../data/index.js';
import {checkId, checkString, checkRating, checkObject} from '../helpers.js';
import { ObjectId } from 'mongodb';
router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.productId = checkId(req.params.productId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const reviewList = await reviewData.getAllReviews(req.params.productId);
      if (reviewList.length === 0) {
        return res.status(404).json({error: 'No reviews'})
      } else {
        return res.status(200).json(reviewList);
      }
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const reviewPostData = req.body;
    //make sure there is something present in the req.body
    if (!reviewPostData || Object.keys(reviewPostData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //check all inputs, that should respond with a 400
    try {
      checkObject(reviewPostData, "requestBody", "create");
      req.params.productId = checkId(req.params.productId, 'Id URL Param');
      reviewPostData.title = checkString(reviewPostData.title, 'title');
      reviewPostData.reviewerName = checkString(reviewPostData.reviewerName, 'reviewerName');
      reviewPostData.review = checkString(reviewPostData.review, 'review');
      reviewPostData.rating = checkRating(reviewPostData.rating, 'rating');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    // Make Review Date in mm/dd/yyyy format
    let reviewDate = new Date();
    const day = reviewDate.getUTCDate()
    let month = reviewDate.getUTCMonth() + 1
    const year = reviewDate.getUTCFullYear();
    if (month.toString().length === 1) {
      month = "0" + month;
    }
    reviewDate = month + "/" + day + "/" + year;
    try {
      const {title, reviewerName, review, rating} = reviewPostData;
      const newReview = await reviewData.createReview(
        req.params.productId,
        title,
        reviewerName,
        review,
        rating);
      return res.status(200).json(newReview);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    //check inputs that produce 400 status
    try {
      req.params.reviewId = checkId(req.params.reviewId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try getting the review by ID
    try {
      const review = await reviewData.getReview(req.params.reviewId);
      return res.status(200).json(review);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    let requestBody = req.body;
    //check to make sure there is something in req.body
    if (!requestBody || Object.keys(requestBody).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    //console.log(requestBody);
    //check the inputs that will return 400 is fail
    try {
      req.params.reviewId = checkId(req.params.reviewId, 'Review ID');
      checkObject(requestBody, "requestBody", "update");
      if (requestBody.title) {
        requestBody.title = checkString(requestBody.title, 'title');
      } else {
        if (requestBody.title !== undefined && requestBody.title.length === 0) {
          throw `Error: cannot update title with empty strings`
        }
        if (requestBody.title !== undefined && typeof requestBody.title !== String ) {
          throw `Error: cannot update title with not strings`
        }
      }
      if (requestBody.reviewerName) {
        requestBody.reviewerName = checkString(requestBody.reviewerName, 'reviewerName');
      } else {
        if (requestBody.reviewerName !== undefined && requestBody.reviewerName.length === 0) {
          throw `Error: cannot update reviewerName with empty strings`
        }
        if (requestBody.reviewerName !== undefined && typeof requestBody.reviewerName !== String ) {
          throw `Error: cannot update reviewerName with not strings`
        }
      }
      if (requestBody.review) {
        requestBody.review = checkString(requestBody.review,'review');
      } else {
        if (requestBody.review !== undefined && requestBody.review.length === 0) {
          throw `Error: cannot update review with empty strings`
        }
        if (requestBody.review !== undefined && typeof requestBody.review !== String ) {
          throw `Error: cannot update review with not strings`
        }
      }
      if (requestBody.rating) {
        requestBody.rating = checkRating(requestBody.rating,'rating');
      } else {
        if (requestBody.rating !== undefined && typeof requestBody.rating !== Number ) {
          throw `Error: cannot update rating with not number`
        }
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to perform update
    try {
      const updatedReview = await reviewData.updateReview(
        req.params.reviewId,
        requestBody
      );
      return res.status(200).json(updatedReview);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.reviewId = checkId(req.params.reviewId, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //try to delete post
    try {
      let deletedReview = await reviewData.removeReview(req.params.reviewId);
      return res.status(200).json(deletedReview);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

  export default router;