const express = require('express')
const router = express.Router()
const User = require('../service/service')
const {
    authToken
} = require('../config/middleware')


// buat user baru
router.post('/', User.createSignUp)

// cari user 1 aja
router.get('/auth', authToken, User.findUserById)

// cari semua user
router.get('/', User.findAllRegisteredUser)

// user login
router.post('/login', User.userLogin)

// delete user
router.delete('/delete', authToken, User.deleteUser)

// update user
router.put('/update', authToken, User.updatePassword)

module.exports = router