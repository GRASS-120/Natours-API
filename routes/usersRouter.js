const express = require('express');
const {
  getAllUsers,
  addNewUser,
  updateMe,
  deleteMe,
} = require('../controllers/usersController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/authController');

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.post('/forgotPassword', forgotPassword);
userRouter.post('/resetPassword', resetPassword);

userRouter.route('/').get(getAllUsers).post(addNewUser);

userRouter.patch('/updateMe', protect, updateMe);
userRouter.delete('/deleteMe', protect, deleteMe);

// не доделано
userRouter.patch('/updateMyPassword', protect, updatePassword);

module.exports = userRouter;
