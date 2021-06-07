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

const tourRouter = express.Router();

tourRouter.route('/tours-stats').get(getTourStats);

tourRouter.route('/monthly-plans/:year').get(getMonthlyPlan);

tourRouter.route('/').get(protect, getAllTours).post(addNewTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .delete(protect, restrict('admin', 'lead-guide'), deleteTour)
  .patch(updateTour);

module.exports = tourRouter;
