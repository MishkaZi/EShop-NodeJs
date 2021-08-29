let ErrorType = {
  UNAUTHORIZED: {
    id: 0,
    httpCode: 401,
    message: 'Invalid email or password.',
    isShowStackTrace: false,
  },

  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: 'General error',
    isShowStackTrace: true,
  },
};

module.exports = ErrorType;
