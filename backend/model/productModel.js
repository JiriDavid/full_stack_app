const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title : {
    type: String,
    required: [true, "A product must have a title"],
    maxLenth: [40, "A product length cannot be more than 40"],
    minLength: [5, "A product length can not be less than 10"]
  },
  brand : {
    type: String,
    defalut: "no brand",
    LowerCase: true
  },
  originalPrice: {
    type: Number,
    require: [true, "A product must have a price"]
  },
  discountPrice: Number,
  images:[ 
    {
    id: String,
    publicId: String,
    url: String
  }
],
shippingFee: {
  type: Number,
  required: [true, "Shipping fee is required"]
},

description : {
 type: String,
 required: [true, "A product must have a description"]
},
user: {
  type: mongoose.Schema.ObjectId,
  ref: "User"
},
size: String,
condition: {
  type: String,
  enum: {
    values: ["new", "used", "semiused"],
    message: "condition has to be new, used, semiused"
  }
},
status : {
  type: String,
  enum: {
    values: ["sale", "under reservation", "sold out", "hide"],
    default: "sale"
  }
}, 
category:{
  type: String,
  required: [true, "category is required"]
},
tags: [String],
ratingsAverage: {
  type: Number,
  default: 4.5,
  min: [1, "Ratings must be above 1.0"],
  max: [5, "Ratings must be below 5.0"]
},
ratingsQuantity: {
  type: Number,
  default: 0
},
},
{
  timestamps: true
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product