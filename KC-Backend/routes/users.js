const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Product = require('../models/products')
const Cart = require('../models/cart')
const Order = require('../models/orders')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Gettign all
router.get('/', async(req,res) => {
    try{
        const allUser = await User.find()
        res.json(allUser)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})
//getting one
router.get('/:id', getUser, async (req,res) => {
    res.send(res.user)
})
//creating one
router.post('/', async (req,res) => {
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        dob: req.body.dob,
        address : {
            streetAddress: req.body.address.streetAddress,
            city: req.body.address.city,
            state: req.body.address.state,
            zipcode: req.body.address.zipcode
        },
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
        profileImage: req.body.profileImage

        /*orders:[
            {
                oProductId: req.body.oProductId,
                qty: req.body.qty,
                orderDate: req.body.orderDate,
                trackingInfo: req.body.trackingInfo
            }
            
        ],
        cart: [
            {
                productId: req.body.productId,
                quantity: req.body.quantity
            }
        ]*/
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
//updating one
router.patch('/:id', getUser, async (req,res) => {
    if(req.body.fName != null){
        res.user.fName = req.body.fName
    }
    if(req.body.lName != null){
        res.user.lName = req.body.lName
    }
    if(req.body.dob != null){
        res.user.dob = req.body.dob
    }
    if(req.body.address.streetAddress != null){
        res.user.address.streetAddress = req.body.address.streetAddress
    }
    if(req.body.address.city != null){
        res.user.address.city = req.body.address.city
    }
    if(req.body.address.state != null){
        res.user.address.state = req.body.address.state
    }
    if(req.body.address.zipcode != null){
        res.user.address.zipcode = req.body.address.zipcode
    }
    if(req.body.phone != null){
        res.user.phone = req.body.phone
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.admin != null){
        res.user.admin = req.body.admin
    }
    if(req.body.password != null){
        res.user.password = req.body.password
    }
    if(req.body.profileImage != null){
        res.user.profileImage = req.body.profileImage
    }
    
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
    
})
//deleting one
router.delete('/:id', getUser, async (req,res) => {
    try{
        await res.user.remove()
        res.json({message: 'User deleted!'})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})

//Assigning cart items to User


//id to the user
async function getUser(req,res,next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:'Couldn\'t find user'})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.user = user

    next()
}


module.exports = router