const express = require('express')
const User = require('../models/User')
const router = express.Router()

router.post('/register', async (req, res) => {

    try {
        
        console.log('req.body is', req.body)

        const {email, username, pass} = req.body

        if (!email || !username || !pass) return res.send({success: false, errorId: 1})

        const newUser = new User(req.body)

        const user = await newUser.save()

        console.log('Register: user created is', user)

        res.send({success: true})
    } catch (error) {
        
        console.log('Register ERROR:', error.message)
        res.send(error.message)
    }
})

router.post('/login', async (req, res) => {
    console.log("Body is:", req.body)
    try {
        
        console.log('req.body is', req.body)

        const {email, pass, username} = req.body

        if (!(email || username) || !pass) return res.send({success: false, errorId: 1})

        const user = await User.findOne({$or: [{email}, {username}], pass}).select('email username')



        console.log('Login: user is', user)

        if (!user) return res.send({success: false, errorId: 2})

        res.send({success: true, user})
    } catch (error) {
        
        console.log('Register ERROR:', error.message)
        res.send(error.message)
    }
})

module.exports = router