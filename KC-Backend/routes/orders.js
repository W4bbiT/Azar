require('./passport')
const express = require('express')
const router = express.Router()
const Order = require('../models/orders')
const Product = require('../models/products')
const passport = require('passport')
const Cart = require('../models/cart');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

//Gettign user orders
router.get('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const orders = await Order.find({
            userId: req.user._id
        })
            .populate('orderDetails.products.product')
            .exec();
        const reversedOrders = orders.reverse(); // Reverse the order list
        res.json(reversedOrders);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/orders/:oId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const orders = await Order.findById({
            _id: req.params.oId
        })
            .populate('orderDetails.products.product')
            .exec();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//creating one
router.post('/orders', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.user._id
        })
            .populate('products.productId')
            .exec();

        const order = new Order({
            userId: req.user._id,
            orderDetails: {
                products: cart.products.map((product) => ({
                    product: product.productId,
                    quantity: product.quantity
                })),
                total: cart.total
            },
            orderDate: Date.now(),
            verified: false,
            trackingInfo: "Order Placed"
        });

        const newOrder = await order.save();

        const updatedProductPromises = cart.products.map(async (product) => {
            const updatedProduct = await Product.findByIdAndUpdate(
                product.productId,
                {
                    $inc: { inStock: - product.quantity }
                },
                { new: true }
            );
            return updatedProduct;
        });

        await Promise.all(updatedProductPromises);

        res.status(201).json(newOrder.toJSON);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router