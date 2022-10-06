const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const Product = require('../models/products')
const User = require('../models/users')
const Cart = require('../models/cart')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Gettign all
router.get('/:id/orders', getUser, async (req, res) => {
    try {
        const orders = await Order.find({
            'userId': res.user
        }).exec()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/:id/orders/:oId', getOrder, (req, res) => {
    res.send(res.order)
})
//creating one
router.post('/:id/orders/:cartId', getUser, getCart, async (req, res) => {
    const order = new Order({
        userId: res.user,
        cart: res.cart,
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
//updating one
router.patch('/:id/editorder/:oId', getUser, getOrder, async (req, res) => {
    if (req.body.trackingInfo != null || req.body.verified != null) {
        try {
            const updatedOrder = await Order.updateOne({
                userId: res.order.userId,
                _id: res.order._id
            },
                {
                    $set: {
                        verified: req.body.verified,
                        trackingInfo: req.body.trackingInfo
                    }
                })
            res.json(updatedOrder)
        } catch (err) {
            res.status(400).json({
                message: err.message
            })
        }
    }
})
//deleting one
router.delete('/:id/editorder/:oId', getUser, getOrder, async (req, res) => {
    try {
        const deletedOrder = await Order.deleteOne({
            userId: res.order.userId,
            _id: res.order._id
        })
        res.json({ message: "Order has been cancelled" })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

async function getCart(req, res, next) {
    let cart
    try {
        cart = await Cart.findById(req.params.cartId)
        if (cart == null) {
            return res.status(404).json({ message: 'Couldn\'t find cart item' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.cart = cart

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

async function getItem(req, res, next) {
    let item
    try {
        item = await Product.findById(req.params.pId)
        if (item == null) {
            return res.status(404).json({ message: 'Couldn\'t find Product' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.item = item

    next()
}

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Couldn\'t find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user

    next()
}

module.exports = router