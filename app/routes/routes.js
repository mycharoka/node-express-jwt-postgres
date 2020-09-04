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


//TODO: buat user baru
// router.post('/register', User.createSignUp);
router.post('/register', async (request, response) => {
    const {
        username,
        password,
        role
    } = request.body
    let result = await createSignUp(username, password, role)
    response.json(result)
});

//TODO: cari user 1 aja
// router.get('/auth', authToken, User.findUserById);
router.get('/auth', authToken('admin', 'tester'), async (request, response) => {
    const result = await findUserById(request.user.id)
    response.json(result)
});

//TODO: cari semua user
router.get('/', async (request, response) => {
    let result = await findAllRegisteredUser();
    console.log('result routes >> ', result)
    response.json(result);
});

//TODO: user login
// router.post('/login', User.userLogin);
router.post('/auth', async (request, response) => {
    const {
        username,
        password
    } = request.body
    let result = await userLogin(username, password)
    response.json(result)
});

//TODO: delete user
// router.delete('/delete', authToken, User.deleteUser);
router.delete('/delete', authToken('admin'), async (request, response) => {
    const {
        username,
        password
    } = request.body
    let result = await deleteUser(username, password)
    response.json(result)
});

//TODO: update user
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