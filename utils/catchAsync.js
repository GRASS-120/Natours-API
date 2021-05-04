const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next); //(err) => next(err) = next, т.к. catch передает err в следующую по вызову функцию
};

module.exports = catchAsync;
