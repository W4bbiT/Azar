const express = require('express');
const router = express.Router()
const Cart = require('../models/cart');
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

    const userId = res.user;
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
            //getting the index of the product from the cart
            const itemIndex = cart.products.findIndex((p) => {
                return p.productId.toString() === productId.toString()
            })
            //check if product exists or not
            if (itemIndex > -1) {
                let product = cart.products[itemIndex];
                product.quantity = product.quantity + 1;

                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.products[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.products.push({ productId, name, quantity, price });
                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                await cart.save();
                res.status(200).send(cart);
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
router.patch('/:id/editcart/:pId', getUser, getItem, async (req, res) => {
    const userId = res.user;
    try {
        const cart = await Cart.findOne({ userId });
        const item = res.item;

        if (!item) {
            res.status(404).send({ message: "item not found" });
            return;
        }
        const productId = item._id;
        //If cart already exists for user,
        if (cart) {
            const itemIndex = cart.products.findIndex((p) => {
                return p.productId.toString() === productId.toString()
            })

            if (itemIndex > -1) {
                let product = cart.products[itemIndex];
                product.quantity = req.body.products[itemIndex].quantity;

                cart.total = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0)

                cart.products[itemIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }

})
//deleting one
router.delete('/:id/delete-item/:pId', getUser, getItem, async (req, res) => {
    const userId = res.user;
    try {
        const productId = res.item._id;
        let cart = await Cart.findOne({ userId });
        const itemIndex = cart.products.findIndex((p) => {
            return p.productId.toString() === productId.toString()
        })
        if (itemIndex > -1) {
            let item = cart.products[itemIndex];
            cart.total -= item.quantity * item.price;

            if (cart.total < 0) {
                cart.total = 0;
            }
            cart.products.splice(itemIndex, 1);
            cart.total = cart.products.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0)
            cart = await cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send("item not found")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send();
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
