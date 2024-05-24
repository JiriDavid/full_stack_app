const Order = require("../model/orderModel")
const Product = require("../model/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")


//create an Order
exports.createOrder = catchAsync(async(req, res, next)=>{
  const {
    totalPrice,
    shippingAddress,
    paymentInfo,
    product
  } = req.body;

  const productToOrder = await Product.findById(product)

  const order = await Order.create({
    totalPrice,
    shippingAddress,
    paymentInfo,
    product,
    user: req.user.id,
  })

  productToOrder.status = "under reservation"
  await productToOrder.save()

  res.status(201).json({
    success: true,
    order
  })
})

// get all user orders
exports.getUserOrders = catchAsync(async(req, res, next)=>{
  const orders = await Order.find({user: req.user.id})

  res.status(200).json({
    success: true,
    orders
  })
})

//get an order 
exports.getAnOrder = catchAsync(async(req, res, next)=>{
  
  const order = await Order.findById(req.params.id).populate("product", "title images userId")

  if (!order) {
    return next(new AppError("Order not found", 404)); 
  }
  res.status(200).json({
    success: true,
    order
  })
})