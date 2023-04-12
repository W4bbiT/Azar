require('./passport')
const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const passport = require('passport')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

//Gettign all
router.get('/', async (req,res) => {  
    try{
        const allProduct = await Product.find()
        res.json(allProduct)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/:id', getProduct, (req,res) => {
    res.send(res.product)
})

async function getProduct(req,res,next){
    let product
    try{
        product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({message:'Couldn\'t find product'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.product = product

    next()
}

module.exports = router