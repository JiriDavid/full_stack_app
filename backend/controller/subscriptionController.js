
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const Subscription = require("../model/subscriptionModel")



// subscribe to a seller
exports.createSubscription = catchAsync(async(req, res, next)=>{
  const {sellerId} = req.params
  const user = req.user
  // check existing subscription
  const existingSubscription = await Subscription.findOne({seller: sellerId, user: user._id})
  if(existingSubscription) return next(new AppError("Already subscribed to this user"))

    await Subscription.create({seller: sellerId, user: user._id})

    res.status(201).json({
      success: true,
      message: "Subscription success"
    })
})


// unsubscribe from a seller
exports.deleteSubscription = catchAsync(async(req, res, next)=>{
  const {sellerId} = req.params
  const user = req.user
  // check existing subscription
  const existingSubscription = await Subscription.findOne({seller: sellerId, user: user._id})
  if(existingSubscription){ 
    await Subscription.findOneAndDelete({user: user._id, seller: sellerId})

    res.status(200).json({
      success: true,
      message: "Successfully unsubscribed from this seller"
    })

} else{
  return next(new AppError("Not subcribed to this seller"))
}

})



// get all subscriptions
exports.getAllSubscription = catchAsync(async(req, res, next)=>{
  const user = req.user

  const subscriptions = await Subscription.find({user: user._id,}).select("seller").populate("seller")
  
  res.status(200).json({
    success: true, 
    subscriptions
})
})

// check if user is subscribed to a seller
exports.checkSubscription = catchAsync(async(req, res, next) => {

  // check existing subscription
  const existingSubscription = await Subscription.findOne({
    seller : req.params.sellerId,
    user : req.user._id
  })
  if(existingSubscription){
    res.status(200).json({
      success: true,
      message: "Subscribed"
    })
  } else{
    res.status(200).json({
      success: false,
      message: "Not subscribed"
    })
  }
})