const User = require("../model/userModel")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")
const jwt = require("jsonwebtoken")


exports.isAuthenticated = catchAsync(async (req, res, next) => {
  // 1. get token from req.cookies
  const {bk_token} = req.cookies;
  console.log(bk_token)

  if(!bk_token) return next(new AppError("Please login to continue", 400))

  // 2. decode token if available
  const decode = jwt.verify(bk_token, process.env.JWT_SECRET)

  // 3. find user based on decoded token
  const user = await User.findById(decode.id)
  if(!user){
    return next(
      new AppError("The user belonging to this token is nolonger avilable", 404)
    )
  }

  // 4. check if password changed after jwt was issued
  if(user.changedPasswordAfter(decode.iat)) return next(new AppError("User recently changed their password",404))

  // 5. set user to the request
  req.user = user

  next()
})

exports.restrictToAdmin = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return next(new AppError(`${req.user.role} can not access this resource`, 400))
    }
    return next()
  }
}