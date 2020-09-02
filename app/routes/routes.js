const express = require('express');
const router = express.Router();
const {
    authToken
} = require('../config/middleware');
const {
    findAllRegisteredUser,
    findUserById,
    createSignUp,
    userLogin,
    updatePassword,
    deleteUser
} = require('../service/service');
const {
    response
} = require('express');
// const User = require('../service/service');

// buat user baru
// router.post('/register', User.createSignUp);
router.post('/register', async (request, response) => {
    const {
        username,
        password
    } = request.body
    let result = await createSignUp(username, password)
    response.json(result)
});

// cari user 1 aja
// router.get('/auth', authToken, User.findUserById);
router.get('/auth', authToken, async (request, response) => {
    const result = await findUserById(request.user.id)
    response.json(result)
});

// cari semua user
router.get('/', async (request, response) => {
    let result = await findAllRegisteredUser();
    console.log('result routes >> ', result)
    response.json(result);
});

// user login
// router.post('/login', User.userLogin);
router.post('/auth', async (request, response) => {
    const {
        username,
        password
    } = request.body
    let result = await userLogin(username, password)
    response.json(result)
});

// delete user
// router.delete('/delete', authToken, User.deleteUser);
router.delete('/delete', authToken, async (request, response) => {
    const username = request.user.username
    const password = request.body.password
    let result = await deleteUser(username, password)
    response.json(result)
});

// update user
// router.put('/update', authToken, User.updatePassword);
router.put('/update', authToken, async (request, response) => {
    const username = request.user.username
    const {
        password,
        newPassword
    } = request.body
    let result = await updatePassword(username, password, newPassword)
    response.json(result)
});

module.exports = router;