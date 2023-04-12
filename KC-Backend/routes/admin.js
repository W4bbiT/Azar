//these are admin specific
require('dotenv').config()
require('./passport')
const express = require('express')
const router = express.Router()
const Product = require('../models/products')
const passport = require('passport')
const Order = require('../models/orders')


router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())



//Gettign all users 
router.get('/gau', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (req.user.admin != true) {
            res.send("You don't have admin acces!")
        } else {
            res.send("You are admin!")
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Gettign all
router.get('/', async (req, res) => {
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            const allUser = await User.find()
            res.json(allUser)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//deleting one
router.delete('/du', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            await req.user.remove()
            res.json({ message: 'User deleted!' })
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//creating a product listing
router.post('/ap', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            const newProduct = await product.save()
            res.status(201).json(newProduct)
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//updating a product
router.patch('/up/:id', passport.authenticate('jwt', { session: false }), getProduct, async (req, res) => {
    if (req.body.ProductName != null) {
        res.product.ProductName = req.body.ProductName
    }
    if (req.body.Category != null) {
        res.product.Category = req.body.Category
    }
    if (req.body.Price != null) {
        res.product.Price = req.body.Price
    }
    if (req.body.Discount != null) {
        res.product.Discount = req.body.Discount
    }
    if (req.body.Description != null) {
        res.product.Description = req.body.Description
    }
    if (req.body.inStock != null) {
        res.product.inStock = req.body.inStock
    }
    if (req.body.ProductImage != null) {
        res.product.ProductImage = req.body.ProductImage
    }
    if (req.body.TopProduct != null) {
        res.product.TopProduct = req.body.TopProduct
    }
    if (req.body.Ingredient != null) {
        res.product.Ingredient = req.body.Ingredient
    }
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            const updatedProduct = await res.product.save()
            res.json(updatedProduct)
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
//deleting a product
router.delete('/dp/:id', passport.authenticate('jwt', { session: false }), getProduct, async (req, res) => {
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            await res.product.remove()
            res.json({ message: 'Product deleted!' })
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

//getting all orders
router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            const orders = await Order.find().exec()
            res.json(orders)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//updating an order
router.patch('/up/:oId', passport.authenticate('jwt', { session: false }), getOrder, async (req, res) => {
    if (req.body.trackingInfo != null || req.body.verified != null) {
        try {
            if (!req.user.admin) {
                res.send.json({message : 'you are not authorized to access this page!'})
            } else {
                const updatedOrder = await Order.updateOne({
                    userId: req.user._id,
                    _id: res.order._id
                },
                    {
                        $set: {
                            verified: req.body.verified,
                            trackingInfo: req.body.trackingInfo
                        }
                    })
                res.json(updatedOrder)
            }
        } catch (err) {
            res.status(400).json({
                message: err.message
            })
        }
    }
})

//deleting an order
router.delete('/do/:oId', passport.authenticate('jwt', { session: false }), getOrder, async (req, res) => {
    try {
        if (!req.user.admin) {
            res.send.json({message : 'you are not authorized to access this page!'})
        } else {
            const deletedOrder = await Order.deleteOne({
                userId: req.user._id,
                _id: res.order._id
            })
            res.json({ message: "Order has been cancelled" })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})



async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Couldn\'t find product' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.product = product

    next()
}

async function getOrder(req, res, next) {
    let order
    try {
        order = await Order.findById(req.params.oId)
        if (order == null) {
            return res.status(404).json({ message: 'Couldn\'t find order' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.order = order

    next()
}

module.exports = router