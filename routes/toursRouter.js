const express = require('express');
const {
  getAllTours,
  addNewTour,
  getTour,
  deleteTour,
  updateTour,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/toursController');
const { protect, restrict } = require('../controllers/authController');
const reviewRouter = require('./reviewRouter');

const tourRouter = express.Router();

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter.route('/tours-stats').get(getTourStats);

tourRouter.route('/monthly-plans/:year').get(getMonthlyPlan);

tourRouter.route('/').get(protect, getAllTours).post(addNewTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .delete(protect, restrict('admin', 'lead-guide'), deleteTour)
  .patch(updateTour);

module.exports = tourRouter;
