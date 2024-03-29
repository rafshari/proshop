import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const  page = Number(req.query.pageNumber) || 1
  const keyword= req.query.keyword ? {
     name:{
      $regex: req.query.keyword,
      $options: 'i',
      },
  } : {}

  const count = await Product.countDocuments({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
  res.json({products, page, pages: Math.ceil(count/pageSize)})
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('کالا یافت نشد')
  }
})
// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('کالایی یافت نشد')
  }
})
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    update a product
// @route   PUT /api/products/:id
// @access  private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, brand, category, description, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.category = category
    product.brand = brand
    product.description = description
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('کالا یافت نشد')
  }
})
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } =  req.body

  const product = await Product.findById(req.params.id)
  if (product) {
const alreadyReviewed = product.reviews.find(r=>r.user.toString() === req.user._id.toString())
if(alreadyReviewed){
  res.status(400)
  throw new Error ('با تشکر، قبلا نظر شما ثبت شده است.')
}
   

const review = {
  name: req.user.name,
  rating: Number(rating),
  comment,
  user: req.user._id
}
product.reviews.push(review)
product.numReviews = product.reviews.length

product.rating =
  product.reviews.reduce((acc, item) => item.rating + acc, 0) /
  product.reviews.length

await product.save()
res.status(201).json({message: 'دیدگاه اضافه شد'})
  } else {
    res.status(404)
    throw new Error('محصول یافت نشد')
  }
})
// @desc    Get top Rated products
// @route   GET /api/products/top
// @access  public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating: -1}).limit(3)
  res.json(products)

})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
