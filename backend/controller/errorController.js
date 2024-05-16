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
    const messages = Object.values(err.errors).map((el) => el.message)
    const validationMsg = `Invalid input data ${messages.join(".")}`
    err = new AppError(validationMsg, 400)
  }

   // 3. dublicate data error
   if(err.code === 11000){
    const regex = /\{([^}]*)\}/
    const match = err.message.match(regex)

    let str = ""
    if(match && match.length > 1){
      str = match[1]
    } else {
      str = "A field"
    }
    const dublicateMsg = `${str} already exist. try a different value`


    err = new AppError(dublicateMsg, 400)
  }


  // 4. handle jsonwebtoken error
  if(err.name === "jsonWebTokenError"){
    
    const jwtMsg = `Your url is invalid please try again later`
    err = new AppError(jwtMsg, 400)
  }

  // 5. handle expired jsonwebtoken error
  if(err.name === "TokenExpiredError"){
    const jwtMsg = `Your url has epired try again later`
    err = new AppError(jwtMsg, 400)
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