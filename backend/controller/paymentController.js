const stripe = require("stripe")(process.env.SRIPE_KEY)
const catchAsync = require("../utils/catchAsync")


exports.processPayment = catchAsync(async (req, res, next)=>{
  const payment = await stripe.paymentIntents.create({
    ammount: req.body.ammount,
    currency: "usd",
    metadata: {
      company: "Brokang-Youtube"
    }
  })
  res.status(201).json({success: true, client_secret: payment.client_secret})
})
