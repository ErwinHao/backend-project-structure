exports.errorHandler = (err, req, res, next) => {
  if(err){
    const { statusCode, message, data } = err;

    return res.status(statusCode).json({
      message,
      data
    })
  }
}