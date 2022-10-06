const express = require('express')
const router = express.Router()
const Product = require('../models/products')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
//creating one
router.post('/', async (req,res) => {
    const product = new Product({
        ProductName: req.body.ProductName,
        Category: req.body.Category,
        Price: req.body.Price,
        inStock: req.body.inStock,
        Description: req.body.Description,
        Discount: req.body.Discount,
        ProductImage: req.body.ProductImage,
        CreatedOn: Date.now(),
        Ingredient: req.body.Ingredient,
        TopProduct: req.body.TopProduct
    })

    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
//updating one
router.patch('/:id', getProduct, async (req,res) => {
    if(req.body.ProductName != null){
        res.product.ProductName = req.body.ProductName
    }
    if(req.body.Category != null){
        res.product.Category = req.body.Category
    }
    if(req.body.Price != null){
        res.product.Price = req.body.Price
    }
    if(req.body.Discount != null){
        res.product.Discount = req.body.Discount
    }
    if(req.body.Description != null){
        res.product.Description = req.body.Description
    }
    if(req.body.inStock != null){
        res.product.inStock = req.body.inStock
    }
    if(req.body.ProductImage != null){
        res.product.ProductImage = req.body.ProductImage
    }
    if(req.body.TopProduct != null){
        res.product.TopProduct = req.body.TopProduct
    }
    if(req.body.Ingredient != null){
        res.product.Ingredient = req.body.Ingredient
    }

    try{
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})
//deleting one
router.delete('/:id', getProduct, async (req,res) => {
    try{
        await res.product.remove()
        res.json({message: 'Product deleted!'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    
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