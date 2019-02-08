const express = require('express')
const router = express.Router()

const User = require('../models/user')
const mongoose = require('mongoose')
const db = "mongodb://user1:password1@ds127115.mlab.com:27115/authdb"

mongoose.connect(db, err => {
    if (err) {
        console.error('Error! ' + err)
    } else {
        console.log('Connection successful')
    }
})

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

module.exports = router