class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // мб message наследуется у Error

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // отслеживает, явлеятся ли статус кода ошибкой (ошибка начинается с 4)
    this.isOperational = true; // то есть ошибка, которую можно предвидеть; для тестов

    Error.captureStackTrace(this, this.constructor); // для отслеживание, где произошла ошибка?
  }
}

module.exports = AppError;
