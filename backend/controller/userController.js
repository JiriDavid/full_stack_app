const User = require("../model/userModel")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")

const excludeFields = (requestBody, ...fieldsToInclude) => {
  const newObject  ={};

  Object.keys(requestBody).forEach((el) => {
    if(fieldsToInclude.includes(el)) newObject[el] = requestBody[el]
  })
  return newObject
}

// update me
exports.updateMe = catchAsync( async (req, res, next) => {
  //ceheck if password is part of the properties to be updated
  if(req.body.pssword){
    return next(new AppError("This route cannot be used to update password", 400))
  }
  const fieldsToUpdate = excludeFields(req.body, "email", "storename", "introduction", "photo", "bannerImage")

  const updateUser = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    success: true,
    user: updateUser
  })
})

// get all users
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    users,
  })
})

//get a single user
exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId)

  res.status(200).json({
    success: true,
    user
  })
})

//deactivate user
exports.deactivateUser = catchAsync(async (req, res, next) => {

  await User.findByIdAndUpdate(req.params.userId,
     {active:false},
     {new: true})
  
  res.status(200).json({
    success: true,
    message: "Successfully deactivated the user"
  })
})
