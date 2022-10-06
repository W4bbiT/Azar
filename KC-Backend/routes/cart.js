const express = require('express');
const cart = require('../models/cart');
const router = express.Router()
const Cart = require('../models/cart');
const products = require('../models/products');
const Product = require('../models/products');
const User = require('../models/users')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Gettign all
router.get('/:id/cart', getUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            'userId': res.user
        }).exec()
        res.json(cart)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/getcart/:cartId', getCart, async (req, res) => {
    res.send(res.cart)
})
//adding products to user cart
router.post('/:id/addtocart/:pId', getUser, getItem, async (req, res) => {

    const userId = res.user._id;
    quantity = 1;

    try {
        const cart = await Cart.findOne({ userId });
        const item = res.item;

        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const productId = item._id;
        const price = item.Price;
        const name = item.ProductName;
        //If cart already exists for user,
        if (cart) {

            const itemIndex = cart.products.findIndex((itm) => {
                return itm.productId === productId
            });
            
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.products[itemIndex];
                product.quantity = product.quantity + 1;

                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.products[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart + itemIndex);
            } else {
                cart.products.push({ productId,name, quantity, price });
                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                await cart.save();
                res.status(200).send(cart + itemIndex);
            }
        } else {
            //no cart exists, create one
            const newCart = await Cart.create({
                userId,
                products: [{ productId, name, quantity, price }],
                total: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }

})
//updating one
router.patch('/:id/editcart/:cartId/:pId', getUser, getCart, getItem, async (req, res) => {
    if (req.body.quantity != null) {
        try {
            const updatedCart = await Cart.findOneAndUpdate({
                _id: res.cart._id,
                'products.productId': res.item._id
            },
                {
                    $set: {
                        products: {
                            productId: res.item._id,
                            quantity: req.body.quantity,
                            price: res.item.Price * req.body.quantity
                        }
                    }
                })
            res.json(updatedCart)
        } catch (err) {
            res.status(400).json({
                message: err.message
            })
        }
    }

})
//deleting one
router.delete('/:id/delete-item/:cartId/:pId', getUser, getItem, getCart, async (req, res) => {
    try {
        const deletedItem = await Cart.updateOne({
            userId: res.cart.userId,
            _id: res.cart._id
        },
            {
                $pull: {
                    products: {
                        productId: res.item._id
                    }

                }
            })
        res.json(deletedItem)
        //res.json({ message: 'Item deleted!' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
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
            return res.status(404).json({ message: 'Couldn\'t find User' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user

    next()
}

module.exports = router
