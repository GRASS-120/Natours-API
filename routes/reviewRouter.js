const express = require('express');
const {
  getAllReviews,
  addNewReview,
  getReview,
} = require('../controllers/reviewController');
const { protect, restrict } = require('../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(protect, restrict('user'), addNewReview);

reviewRouter.route('/:id').get(getReview);

module.exports = reviewRouter;
