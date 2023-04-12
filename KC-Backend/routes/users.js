require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var passport = require('passport')

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

//getting the user info
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = await User.findById({
            _id: req.user._id
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//creating one
router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hashedPassword
    })

    emailExist = await User.findOne({
        email: req.body.email
    })

    try {
        if (!emailExist) {
            const newUser = await user.save()
            res.status(201).json(newUser)
        }
        else{
            res.send('Email already exist')
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//login
router.post('/signin', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).send({
            message: "User not found"
        })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "1d" // 1 day
            })
            console.log("Bearer " + accessToken)
            res.status(200).json({
                accessToken: "Bearer " + accessToken,
                username: user.fName,
                role: user.role,
                expiresIn : "1d"
            })
        } else {
            res.send('Not Allowed!')
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

})

//updating one
router.patch('/update-user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.body.fName != null) {
        req.user.fName = req.body.fName
    }
    if (req.body.lName != null) {
        req.user.lName = req.body.lName
    }
    if (req.body.dob != null) {
        req.user.dob = req.body.dob
    }
    if (req.body.address.streetAddress != null) {
        req.user.address.streetAddress = req.body.address.streetAddress
    }
    if (req.body.address.city != null) {
        req.user.address.city = req.body.address.city
    }
    if (req.body.address.state != null) {
        req.user.address.state = req.body.address.state
    }
    if (req.body.address.zipcode != null) {
        req.user.address.zipcode = req.body.address.zipcode
    }
    if (req.body.phone != null) {
        req.user.phone = req.body.phone
    }
    if (req.body.email != null) {
        req.user.email = req.body.email
    }
    if (req.body.password != null) {
        req.user.password = req.body.password
    }
    if (req.body.profileImage != null) {
        req.user.profileImage = req.body.profileImage
    }

    try {
        const updatedUser = await req.user.save()
        res.json(updatedUser)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})

//id to the user
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


/**
 * function authenticateToken(req, res, next) {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

 */



module.exports = router