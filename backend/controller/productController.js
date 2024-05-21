const Product = require("../model/productModel")
const User = require("../model/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")


//createProduct
exports.createProduct = catchAsync(async (req, res, next) => {
  const productData = req.body;

  productData.user = req.user.id

  const product = await Product.create(productData)
  const user = User.findById(req.user.id)

  user.numProducts += 1
  await user.save

  res.status(201).json({
    success: true,
    product
  })
})

// get all products
exports.getAllProducts = catchAsync( async(req, res, next) =>{
  //{ brand: 'samsung', category: 'others' }
  //filtering products
  const queryObject = {...req.query}
  const excludedFields = ["page", "sort", "limit", "fields", "id"]
  excludedFields.forEach((el)=> delete queryObject[el])

  // adding search by title
  if(req.query.title){
    queryObject.title = {$regex: req.query.title, $options: "i"}
  }
  let queryString = JSON.stringify(queryObject);
  queryString = queryString.replace(/\b(gte|gt|lte|lt|in|ne)\b/g, (value) => `$${value}`)


  let query = Product.find(JSON.parse(queryString))

  //sorting
if(req.query.sort){
  const sortBy = req.query.sort.split(",").join(" ")
  query = query.sort(sortBy)
}else {
  query = query.sort("-createdAt")
}

// get product count before pagination
const productCount = await Product.countDocuments(query)

// field limiting
if(req.query.fields){
  const fields = req.query.fields.split(",").join(" ")
  query = query.select(fields)
}

// Pagination
const page = req.query.page * 1 || 1
const limit = req.query.limit * 1 || 3
const skip = limit * (page-1)
query = query.skip(skip).limit(limit)

let totalPages
if(req.query.page){
  totalPages = Math.ceil(productCount/limit)
}

const products = await query
  res.status(200).json({
    success: true,
    productLength: products.length,
    productCount,
    totalPages,
    products,
  })
  }
)

// get a single product
exports.getSingleProduct = catchAsync(async(req, res, next)=>{
  const product = await Product.findById(req.params.productId).populate("user")

  if(!product){
    return next(new AppError("This product is not availlable", 404))
  }

  res.status(200).json({
    success: true,
    product
  })
})

// update a single product
exports.updateSingleProduct = catchAsync(async(req, res, next)=>{
  const updatedItems = req.body
  const productId = req.params.productId

  const product = await Product.findOneAndUpdate({_id: productId}, updatedItems, {new: true})

  if(!product){
    return next(new AppError("This product is not availlable", 404))
  }

  res.status(200).json({
    success: true,
    product,
    message: "product updated successfully"
  })
})

//update many products
exports.updateManyProducts = catchAsync(async(req, res, next)=>{
  const {updatedItems} = req.body;

  const updateOperation = updatedItems.map((item) => ({
    updateOne: {
      filter: {_id: item._id},
      update: item
    }
  }))

  await Product.bulkWrite(updateOperation);

  res.status(200).json({
    success: true,
    message: "Products updated successfully"
  })
})