require('./passport')
const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const passport = require('passport')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

const { validationResult } = require('express-validator');


//Gettign all
router.get('/', async (req, res) => {
    try {
        const allProduct = await Product.find()
        res.json(allProduct)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Search by product name
router.get('/search', async (req, res) => {
    const productName = req.query.name;
    if (!productName) {
        return res.status(400).json({ message: 'Invalid product name' });
    }
    try {
        const products = await Product.find({
            ProductName: { $regex: productName, $options: 'i' }
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//getting one
router.get('/:pId', getProduct, (req, res) => {
    try {
        res.json(res.product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



async function getProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, return a 400 Bad Request response
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const product = await Product.findById(req.params.pId);
        if (!product) {
            // If the product is not found, throw an error
            throw new Error('Product not found');
        }
        res.product = product;
        next();
    } catch (err) {
        // Handle the error and pass it to the error-handling middleware
        next(err);
    }
}

module.exports = router