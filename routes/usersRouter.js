const express = require('express');
const {
  getAllUsers,
  addNewUser,
  getUser,
  deleteUser,
} = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(addNewUser);

userRouter
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .patch((req, res) => {});

module.exports = userRouter;
