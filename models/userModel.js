const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tell us your name!!!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please input a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please input your password'],
    minlength: 7,
    maxlength: 30,
    select: false, // делает поле невидимым при выводе данных (например в postman)
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password!'],
    // this only works on CREATE or SAVE!
    validate: {
      validator: function (passConf) {
        return passConf === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // шифрование пароля
  this.password = await bcrypt.hash(this.password, 12);

  // удаляем поле passwordConfirmation
  this.passwordConfirmation = undefined;
  next();
});

// методы доступны там, где исп данная модель*
// метод для проверки сходства пароля
userSchema.methods.correctPassword = async function (
  potentialPassword,
  userPassword
) {
  return await bcrypt.compare(potentialPassword, userPassword);
};

userSchema.methods.passwordIsModified = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
