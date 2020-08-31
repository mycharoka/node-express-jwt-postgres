const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/model')


// TODO: CREATE USER
const createSignUp = async (request, response) => {
    const {
        username,
        password
    } = request.body;

    try {

        if ((username == "" || username.trim().length == 0) || (password == "" || password.trim().length == 0)) {
            return response.status(422).json({
                message: "USERNAME / PASSWORD GABOLEH KOSONG"
            })
        }
        const findUserResult = await User.findUserData(username);


        if (!findUserResult) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const insertDataResult = await User.insertUserData(username, hashedPassword);

            return response.json({
                message: `${username} BERHASIL TERDAFTAR`
            });
        }
        return response.status(401).json({
            message: `${username} DUPLIKAT`
        });

    } catch (error) {
        return response.status(404).json({
            message: "error"
        })
    }
};

// TODO: FIND USER BY ID
const findUserById = async (request, response) => {
    const id = request.user.id;

    try {
        const findUserIdResult = await User.findUserId(id);
        return response.json({
            message: `${id} ini terdaftar`,
            data: findUserIdResult
        });

    } catch (error) {
        return response.status(404).json({
            message: 'ID NOT FOUND'
        });

    }
};

// TODO: FIND ALL USER
const findAllRegisteredUser = async (request, response) => {
    try {
        const getAllUsersResult = await User.findRegisteredUser();
        response.json({
            message: 'Get ALL!',
            data: {
                getAllUsersResult
            }
        });
    } catch (error) {
        response.status(404).json({
            message: 'FIND ALL ONLY'
        })
    }
};

// TODO: USER LOGIN

const userLogin = async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    try {
        const userResult = await User.findUserData(username)
        const comparePassword = await bcrypt.compare(password, userResult.password); // <== compare password

        // TODO: buat generate token JWT
        const payload = {
            user: {
                id: userResult.id,
                username: userResult.username
            }
        };
        if (comparePassword) {
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            response.json({
                token: accessToken,
                data: {
                    id: userResult.id,
                    username: userResult.username
                }
            });

        } else {
            response.status(404).json({
                message: 'AKUN BLM ADA / SALAH MASUKKIN USERNAME DAN PASSWORD'
            });
        }


    } catch (error) {
        response.status(404).json({
            message: "COBA CEK LAGI USERNAME SAMA PASSWORDNYA BRAY"
        })
    }
};

//TODO: DELETE USSER

const deleteUser = async (request, response) => {
    const username = request.user.username
    const {
        password
    } = request.body


    try {

        const findUserResult = await User.findUserData(username)
        const comparePassword = await bcrypt.compare(password, findUserResult.password)
        if (findUserResult) {
            if (comparePassword) {
                const deleteUser = await User.deleteUserData(username)
                response.json({
                    message: `${username} DELETED`,
                    data: {
                        id: findUserResult.id,
                        username: findUserResult.username
                    }
                })
            } else {
                response.status(401).json({
                    message: `NOT DELETED PROPERLY`
                })
            }
        }
    } catch (error) {
        response.status(404).json({
            message: 'DELETING PROCESS ERROR'
        })
    }
}

// TODO: UPDATE PASSWORD
const updatePassword = async (request, response) => {
    const username = request.user.username
    const password = request.body.password
    const newPassword = request.body.newPassword

    try {
        if (newPassword == "" || newPassword.trim().length == 0) {
            return response.status(401).json({
                message: "PASSWORD BARU TIDAK BOLEH KOSONG"
            })
        }

        const checkUsernameResult = await User.findUserData(username)
        const comparePassword = await bcrypt.compare(password, checkUsernameResult.password)

        // TODO: compare password yg dimasukkin dari body sama yg di database..
        if (comparePassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const updatePassword = await User.updateUserPassword(hashedPassword, username)
            response.json({
                message: 'PASSWORD TELAH TERGANTI'
            })

        } else {
            response.status(401).json({
                message: 'PASSWORD TIDAK COCOK'
            })
        }

    } catch (error) {
        response.status(404).json({
            message: 'ADA KESALAHAN COBA CEK LAGI'
        })
    }
}

module.exports = {
    createSignUp,
    findAllRegisteredUser,
    findUserById,
    userLogin,
    deleteUser,
    updatePassword
};