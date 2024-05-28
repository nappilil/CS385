// This data file should export all functions using the ES6 standard as shown in the lecture code
import {products} from '../config/mongoCollections.js'; // import collection
import {ObjectId} from 'mongodb';
import {checkId, checkString, checkRating, checkObject} from '../helpers.js'

const exportedMethods = {
  async createReview(
  productId,
  title,
  reviewerName,
  review,
  rating
) {  // Error Checking
  productId = checkId(productId, "Id URL Param");
  title = checkString(title, "title");
  reviewerName = checkString(reviewerName, "reviewerName");
  review = checkString(review, "review");
  rating = checkRating(rating, "rating");

  // Make Review Date in mm/dd/yyyy format
  let reviewDate = new Date();
  const day = reviewDate.getUTCDate()
  let month = reviewDate.getUTCMonth() + 1
  const year = reviewDate.getUTCFullYear();
  if (month.toString().length === 1) {
    month = "0" + month;
  }
  reviewDate = month + "/" + day + "/" + year;

  const productCollection = await products();
  const product  = await productCollection.findOne({_id: new ObjectId(productId)});
  // if no product exists with that id the method should throw
  if (product === null) {
    throw 'Error: No product with that id';
  }
  // make new review
  const newReview = {
    _id: new ObjectId(), // make new objectId
    title: title,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  };

  // update new review
  let updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    {$push: {reviews: newReview}}, // add new review to list
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!updatedInfo) {
    throw 'Error: Could not update product successfully';
  }

  // calculate averageRating
  let reviewRatings = await productCollection.findOne(
    {_id: new ObjectId(productId)},
    {projection: {_id: 0, 'reviews.rating': 1}} // only get the ratings
  );
  let newAverageRating = 0,
      ratingAmount = 0;
  reviewRatings.reviews.forEach((object) => {
    let rating = object.rating; // get number
    newAverageRating += rating // get sum of reviews
    ratingAmount += 1; // count number of ratings
  });
  newAverageRating = newAverageRating/ratingAmount; // get average
  newAverageRating = Number(newAverageRating.toFixed(1));

  // update new averageRating
  updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    {$set: {averageRating: newAverageRating}},
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!updatedInfo) {
    throw 'Error: Could not update product successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  // if success return the product with the updated info
  return updatedInfo;
},

async getAllReviews(productId) {
  // Error Checking
  productId = checkId(productId, "Id URL Param");
  // get all reviews for that product
  const productCollection = await products();
  const allReviews = await productCollection
  .find({_id: new ObjectId(productId)})
  .project({_id: 0, reviews: 1}) // only include reviews
  .toArray();
  // an array of review objects
  if (allReviews === null) {
    throw 'Error: No product with that id';
  }
  return allReviews[0].reviews;
},

async getReview(reviewId) {
  // Error Checking
  reviewId = checkId(reviewId, "Id URL Param");
  // get all the reviews
  const productCollection = await products();
  const foundReview = await productCollection.findOne(
    {'reviews._id': new ObjectId(reviewId)},
    {projection: {_id: 0, 'reviews.$': 1}}
  );
  if (!foundReview) {
    throw 'Review Not found';
  }
  return foundReview.reviews[0];
},

async updateReview(reviewId, updateObject) {
  // error checking
  reviewId = checkId(reviewId, "Id URL Param");

  updateObject = checkObject(updateObject, "updateObject", "update");

  // Make Review Date in mm/dd/yyyy format
  let reviewDate = new Date();
  const day = reviewDate.getUTCDate()
  let month = reviewDate.getUTCMonth() + 1
  const year = reviewDate.getUTCFullYear();
  if (month.toString().length === 1) {
    month = "0" + month;
  }
  reviewDate = month + "/" + day + "/" + year;

  const oldReview = await this.getReview(reviewId); // get old review

  // initialize updates
  let updateTitle, updateReviewerName, updateReview, updateRating;
  // check which fields are supplied if supplied update otherwise keep same as old review

  if (updateObject.title) {
    updateTitle = checkString(updateObject.title, "title");
  } else {
    if (updateObject.title !== undefined && 
      updateObject.title.length === 0) {
      throw `Error: cannot update with empty strings`
    }
    if (updateObject.title !== undefined && typeof updateObject.title !== String) {
      throw `Error: cannot update with not strings`
    }
    updateTitle = oldReview.title
  } 
  if (updateObject.reviewerName) {
    updateReviewerName = checkString(updateObject.reviewerName, "reviewerName");
  } else {
    if (updateObject.reviewerName !== undefined &&
      updateObject.reviewerName.length === 0) {
      throw `Error: cannot update with empty strings`
    }
    if (updateObject.reviewerName !== undefined && typeof updateObject.reviewerName !== String ) {
      throw `Error: cannot update with not strings`
    }
    updateReviewerName = oldReview.reviewerName
  } 

  if (updateObject.review) {
    updateReview = checkString(updateObject.review, "review");
  } else {
    if (updateObject.review !== undefined &&
      updateObject.review.length === 0) {
      throw `Error: cannot update with empty strings`
    }
    if (updateObject.review !== undefined && 
      typeof updateObject.review !== String ) {
      throw `Error: cannot update with not strings`
    }
    updateReview = oldReview.review
  } 
  if (updateObject.rating) {
    updateRating = checkRating(updateObject.rating, "rating")
  } else {
    if (updateObject.rating !== undefined && 
      typeof updateObject.rating !== Number ) {
      throw `Error: cannot update with not number`
    }
    updateRating = oldReview.rating
  }  
  
  // the updated review object, keep same id
  const updatedReview = {
    _id: new ObjectId(reviewId),
    title: updateTitle,
    reviewDate: reviewDate,
    reviewerName: updateReviewerName,
    review: updateReview,
    rating: updateRating
  }
  const productCollection = await products();
  // first add updated review to list of reviews
  let updateOne = await productCollection.findOneAndUpdate(
    {reviews: oldReview},
    {$push: {reviews: updatedReview}}, // add new review to list
    {returnDocument: 'after'});
  // if product cannot be updated method should throw
  if (!updateOne) {
    throw 'Error: Could not update review successfully';
  }
  // then remove the old review from the list of reviews
  let updateTwo = await productCollection.findOneAndUpdate(
    {reviews: oldReview},
    {$pull: {reviews: oldReview}},
    {returnDocument: 'after'});
  // if product cannot be updated method should throw
  if (!updateTwo) {
    throw 'Error: Could not update review successfully';
  }
  // calculate averageRating
  let reviewRatings = await productCollection.findOne(
    {_id: new ObjectId(updateTwo._id)},
    {projection: {_id: 0, 'reviews.rating': 1}} // only get the ratings
  );
  let newAverageRating = 0,
      ratingAmount = 0;
  reviewRatings.reviews.forEach((object) => {
    let rating = object.rating; // get number
    newAverageRating += rating // get sum of reviews
    ratingAmount += 1; // count number of ratings
  });
  newAverageRating = newAverageRating/ratingAmount; // get average
  newAverageRating = Number(newAverageRating.toFixed(1));
  // update new averageRating
  const updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(updateTwo._id)},
    {$set: {averageRating: newAverageRating}},
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!updatedInfo) {
    throw 'Error: Could not update product successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  // if success return the product with the updated info
  return updatedInfo;
},

async removeReview(reviewId) {
  reviewId = checkId(reviewId, "Id URL Param");
  const productCollection = await products();
  const product  = await productCollection.findOne(
    {'reviews._id': new ObjectId(reviewId)});
  // if no product exists with that id the method should throw
  if (product === null) {
    throw 'Error: No review with that id';
  }
  const oldReview = await this.getReview(reviewId); // get old review
  const deletedInfo = await productCollection.findOneAndUpdate(
    {reviews: oldReview},
    {$pull: {reviews: oldReview}},
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!deletedInfo) {
    throw 'Error: Could not update product successfully';
  }
  // calculate averageRating
  let reviewRatings = await productCollection.findOne(
    {_id: new ObjectId(product._id)},
    {projection: {_id: 0, 'reviews.rating': 1}} // only get the ratings
  );
  let newAverageRating = 0,
  ratingAmount = 0;
  // if there are no more reviews the average becomes 0
  if (reviewRatings.reviews.length === 0) {
    newAverageRating = 0;
  } else { // calculate new review
  reviewRatings.reviews.forEach((object) => {
    let rating = object.rating; // get number
    newAverageRating += rating // get sum of reviews
    ratingAmount += 1; // count number of ratings
  });
  newAverageRating = newAverageRating/ratingAmount; // get average
  newAverageRating = Number(newAverageRating.toFixed(1));
  }
  // update new averageRating
  const updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(product._id)},
    {$set: {averageRating: newAverageRating}},
    {returnDocument: 'after'}
  );
  // if product cannot be updated method should throw
  if (!updatedInfo) {
    throw 'Error: Could not update product successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  // if success return the product with the updated info
  return updatedInfo;
  }  
};

export default exportedMethods;
