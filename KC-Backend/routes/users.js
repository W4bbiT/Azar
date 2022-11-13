require('dotenv').config()
require('./passport')
const express = require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')


router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(passport.initialize())

//Gettign all
router.get('/', async (req, res) => {
    try {
        const allUser = await User.find()
        res.json(allUser)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
/**
 * router.get('/:id', getUser, async (req,res) => {
    res.send(res.user)
})
 * 
 */


//creating one
router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//login
router.post('/login', async (req, res) => {
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
            res.status(200).json({ accessToken: "Bearer " + accessToken })
        } else {
            res.send('Not Allowed!')
        }
    }
    catch (err) {
        res.status(500).send({ message: err.message })
    }

})


router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    return res.status(200).send(req.user)

})


//updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.fName != null) {
        res.user.fName = req.body.fName
    }
    if (req.body.lName != null) {
        res.user.lName = req.body.lName
    }
    if (req.body.dob != null) {
        res.user.dob = req.body.dob
    }
    if (req.body.address.streetAddress != null) {
        res.user.address.streetAddress = req.body.address.streetAddress
    }
    if (req.body.address.city != null) {
        res.user.address.city = req.body.address.city
    }
    if (req.body.address.state != null) {
        res.user.address.state = req.body.address.state
    }
    if (req.body.address.zipcode != null) {
        res.user.address.zipcode = req.body.address.zipcode
    }
    if (req.body.phone != null) {
        res.user.phone = req.body.phone
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.profileImage != null) {
        res.user.profileImage = req.body.profileImage
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }

})
//deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User deleted!' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Assigning cart items to User


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