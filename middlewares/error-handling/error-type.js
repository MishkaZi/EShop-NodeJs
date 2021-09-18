let ErrorType = {
  //General Errors
  UNAUTHORIZED: {
    id: 0,
    httpCode: 401,
    message: 'Invalid email or password',
    isShowStackTrace: false,
  },

  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: 'General error',
    isShowStackTrace: true,
  },

  //Required
  ID_REQUIRED: {
    id: 2,
    httpCode: 610,
    message: 'ID is required',
    isShowStackTrace: false,
  },

  EMAIL_REQUIRED: {
    id: 3,
    httpCode: 611,
    message: 'Email is required',
    isShowStackTrace: false,
  },

  PASSWORD_REQUIRED: {
    id: 4,
    httpCode: 612,
    message: 'Password is required',
    isShowStackTrace: false,
  },

  ALL_FIELDS_REQUIRED: {
    id: 5,
    httpCode: 613,
    message: 'All fields required',
    isShowStackTrace: false,
  },

  //Exists
  ID_EXIST: {
    id: 6,
    httpCode: 620,
    message: 'ID exist',
    isShowStackTrace: false,
  },

  EMAIL_EXIST: {
    id: 7,
    httpCode: 621,
    message: 'Email exist',
    isShowStackTrace: false,
  },

  //Incorrect password
  INCORRECT_PASSWORD: {
    id: 8,
    httpCode: 630,
    message: 'Incorrect password',
    isShowStackTrace: false,
  },

  PASSWORDS_DONT_MATCH: {
    id: 9,
    httpCode: 631,
    message: "Passwords dont match",
    isShowStackTrace: false,
  },

  INVALID_CREDITCARD: {
    id: 10,
    httpCode: 642,
    message: 'Invalid credit card number, last 4 digits only',
    isShowStackTrace: false,
  },

  NO_FILE: {
    id: 11,
    httpCode: 650,
    message: 'No image file provided',
    isShowStackTrace: false,
  },
};

module.exports = ErrorType;
