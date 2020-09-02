const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Models = require('../models/model');

// TODO: CREATE USER
const createSignUp = async (username, password) => {
    // const {
    //     username,
    //     password
    // } = request.body;

    try {
        if (username == '' || username.trim().length == 0 || (password == '' || password.trim().length == 0)) {
            return {
                message: 'USERNAME / PASSWORD GABOLEH KOSONG'
            };
        }
        const findUserResult = await Models.findUserData(username);

        if (!findUserResult) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const insertDataResult = await Models.insertUserData(username, hashedPassword);
            return {
                message: `${username} BERHASIL TERDAFTAR`
            };
        }
        return {
            message: `${username} DUPLIKAT`
        };
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        };
    }
};

// TODO: FIND USER BY ID
const findUserById = async (id) => {
    // const id = request.user.id;

    try {
        const findUserIdResult = await Models.findUserId(id);
        return {
            message: `${id} ini terdaftar`,
            data: findUserIdResult
        };
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
};

// TODO: FIND ALL USER
const findAllRegisteredUser = async () => {
    try {
        const getAllUsersResult = await Models.findRegisteredUser();
        console.log('cek all >> ', getAllUsersResult)
        return {
            message: 'Get ALL!',
            data: {
                getAllUsersResult
            }
        };
    } catch (error) {
        return {
            status: "error",
            message: error.message
        };
    }
};

// TODO: USER LOGIN

const userLogin = async (username, password) => {
    // const username = request.body.username;
    // const password = request.body.password;

    try {
        const userResult = await Models.findUserData(username);
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
            return {
                token: accessToken,
                data: {
                    id: userResult.id,
                    username: userResult.username
                }
            };
        } else {
            return {
                message: 'AKUN BLM ADA / SALAH MASUKKIN USERNAME DAN PASSWORD'
            };
        }
    } catch (error) {
        return {
            status: 'COBA CEK LAGI USERNAME SAMA PASSWORDNYA BRAY',
            message: error.message
        };
    }
};

//TODO: DELETE USSER

const deleteUser = async (username, password) => {
    // const username = request.user.username;
    // const {
    //     password
    // } = request.body;

    try {
        const findUserResult = await Models.findUserData(username);
        const comparePassword = await bcrypt.compare(password, findUserResult.password);
        if (findUserResult) {
            if (comparePassword) {
                const deleteUser = await Models.deleteUserData(username);
                return {
                    message: `${username} DELETED`,
                    data: {
                        id: findUserResult.id,
                        username: findUserResult.username
                    }
                };
            } else {
                return {
                    message: `TERJADI KESALAHAN !! COBA CEK PASSWORD`
                };
            }
        }
    } catch (error) {
        return {
            status: 'DELETING PROCESS ERROR',
            message: error.message
        };
    }
};

// TODO: UPDATE PASSWORD
const updatePassword = async (username, password, newPassword) => {
    // const username = request.user.username;
    // const password = request.body.password;
    // const newPassword = request.body.newPassword;

    try {
        if (newPassword == '' || newPassword.trim().length == 0) {
            return {
                message: 'PASSWORD BARU TIDAK BOLEH KOSONG'
            };
        }

        const checkUsernameResult = await Models.findUserData(username);
        const comparePassword = await bcrypt.compare(password, checkUsernameResult.password);

        // TODO: compare password yg dimasukkin dari body sama yg di database..
        if (comparePassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const updatePassword = await Models.updateUserPassword(hashedPassword, username);
            return {
                message: 'PASSWORD TELAH TERGANTI'
            };
        } else {
            return {
                message: 'PASSWORD TIDAK COCOK'
            };
        }
    } catch (error) {
        return {
            status: 'ADA KESALAHAN COBA CEK LAGI',
            message: error.message
        };
    }
};

module.exports = {
    createSignUp,
    findAllRegisteredUser,
    findUserById,
    userLogin,
    deleteUser,
    updatePassword
};