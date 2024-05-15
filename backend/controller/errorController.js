const AppError = require("../utils/AppError")

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500,
  err.status = err.status || "error"

  // 1. handle cast error
  if(err.name === "CastError"){
    const castMessage = `Invalid parameters: ${err.path}: ${err.value}`
    err = new AppError(castMessage, 400)
  }

   // 2. handle validation errors
   if(err.name === "ValidationError"){
    const error = object.values(err.error).map((el) => el.message)
    const validationMsg = `Invalid input data ${messages.json(".")}`
    err = new AppError(validationMsg, 400)
  }

   // 3. dublicate data error
   if(err.name === "CastError"){
    const castMessage = `Invalid parameters: ${err.path}: ${err.value}`
    err = new AppError(castMessage, 400)
  }


  if(process.env.NODE_ENV !== "production"){
    //development errors
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  } else {
    //production errors
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack
    })
  }
}