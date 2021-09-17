


let errorHandler = (error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  // error = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
  if (error.errorType !== undefined) {
    if (error.errorType.isShowStackTrace) {
      console.error(error);
    }

    res.status(error.errorType.httpCode).json({ error: error.errorType.message });
    return;
  }

  // This is most definitely a bug (not a ServerError) and so we want the log
  // Reaching here means that we got an UNEXPECTED BUG which we didn't wrap with a ServerError
  console.error(error.message);
  res.status(700).json({ error: error.message });
};

module.exports = errorHandler;
