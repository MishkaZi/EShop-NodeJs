const { v4 } = require('uuid');
const ErrorType = require('./error-handling/error-type');
const ServerError = require('./error-handling/server-error');

function uploadFile(req, res, next) {
  console.log(req.body.image);

  if (req.body.image !== undefined) {
    return next();
  } else if (!req.files) {
    return next(new ServerError(ErrorType.NO_FILE));
  }

  const { productImage } = req.files;
  const fileExtinstionIndex = productImage.name.lastIndexOf('.');
  const fileExtinstion = productImage.name.substr(fileExtinstionIndex);
  const newFileName = v4() + fileExtinstion;
  productImage.mv('./uploads/' + newFileName, (e) =>
    console.log('file upload successfully')
  );
  req.body.image = `${newFileName}`;
  return next();
}

module.exports = uploadFile;
