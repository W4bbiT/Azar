require('./passport')
const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const Product = require('../models/products')
const passport = require('passport')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

//Gettign user orders
router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const orders = await Order.findById({
            'userId': req.user._id
        })
        .populate('cart')
        .exec()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//creating one
router.post('/orders/:cartId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const order = new Order({
        userId: req.user._id,
        cart: req.user.cart,
        orderDate: Date.now(),
        verified: false,
        trackingInfo: "Order Placed"
    })

    try {
        const newOrder = await order.save()

        const updatedProduct = await Product.updateMany({
            _id: res.cart.products.productId
        },
            {
                $set:{
                    inStock: inStock - res.cart.products.quantity
                }
            }
        )
    

        res.status(201).json(newOrder)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



module.exports = router