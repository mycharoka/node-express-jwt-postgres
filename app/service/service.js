require('dotenv').config()
const {
    pool
} = require('../config/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// TODO: CREATE USER
const createSignUp = async (request, response) => {
    const {
        username,
        password
    } = request.body;
    // console.log('req body >> ', request.body)
    // console.log('request username: ', username);

    const insertDataQuery = `
    INSERT INTO latihan (username,password)
    VALUES ($1,$2)
    `;

    const findUserQuery = `
    SELECT *
    FROM latihan
    WHERE username = $1
    `;

    const usernameInput = [username]
    // console.log('username value >>', usernameInput)
    try {

        if ((username != "" && username.trim().length != 0) && (password != "" && password.trim().length != 0)) {
            const findUserResult = await pool.query(findUserQuery, usernameInput);

            if (!findUserResult.rows[0]) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                // console.log(salt);
                // console.log(hashedPassword);
                const insertDataValue = [username, hashedPassword];
                // console.log('check inser table value >>', insertDataValue)
                const insertDataResult = await pool.query(insertDataQuery, insertDataValue);
                // console.log('check isert table >> ', insertDataResult);
                return response.json({
                    message: `${username} BERHASIL TERDAFTAR`
                });
            }
            return response.status(401).json({
                message: `${username} DUPLIKAT`
            });


        }
        return response.status(422).json({
            message: "GABOLEH KOSONG"
        })



    } catch (error) {
        return response.status(404).json({
            message: "error"
        })
    }
};

// TODO: FIND USER BY ID
const findUserById = async (request, response) => {
    console.log('data user dari middleware >> ', request.user)
    const id = request.user.id;
    console.log('data id >> ', id);

    const findUserIdQuery = `
    SELECT *
    FROM latihan
    WHERE id = $1
    `;

    const value = [id]

    try {

        const findUserIdResult = await pool.query(findUserIdQuery, value);
        console.log('data => ', findUserIdResult.rowCount)
        console.log('isi container => ', findUserIdResult.rows[0]['id']);
        if (findUserIdResult.rowCount > 0)
            return response.json({
                message: `${id} ini terdaftar`,
                data: {
                    id: findUserIdResult.rows[0]['id'],
                    username: findUserIdResult.rows[0]['username']
                }
            });

    } catch (error) {
        return response.status(404).json({
            message: 'ID NOT FOUND'
        });

    }
};

// TODO: FIND ALL USER
const findAllRegisteredUser = async (request, response) => {
    const getAllUsersQuery = `
    SELECT id, username
    FROM latihan
    `;
    try {
        const getAllUsersResult = await pool.query(getAllUsersQuery);
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

    const getUserQuery = `
    SELECT *
    FROM latihan
    WHERE username = $1
    `;
    const value = [username]
    try {
        const userResult = await pool.query(getUserQuery, value);
        console.log('login rows>>', typeof (userResult))
        console.log('login rows>>', userResult.rows[0]['username'])
        const comparePassword = await bcrypt.compare(password, userResult.rows[0]['password']); // <== compare password
        console.log('status compare password ->> ', comparePassword)
        if (userResult) {
            // TODO: buat generate token JWT
            const payload = {
                user: {
                    id: userResult.rows[0]['id'],
                    username: userResult.rows[0]['username']
                }
            };
            if (comparePassword) {
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1h'
                });
                response.json({
                    token: accessToken,
                    data: {
                        id: userResult.rows[0]['id'],
                        username: userResult.rows[0]['username']
                    }
                });
                console.log(accessToken);
            } else {
                response.status(404).json({
                    message: 'AKUN BLM ADA / SALAH MASUKKIN USERNAME DAN PASSWORD'
                });
            }
        }

    } catch (error) {
        response.status(404).json({
            message: "COBA CEK LAGI USERNAME SAMA PASSWORDNYA BRAY"
        })
    }
};

//TODO: delete user
//FIXME: perbaiki sistem untuk menghapus user..antara pake USERNAME atau pake ID,
// karena kalo yg diapus pake username yg username ke apus semua
// yg jadi pertanyaan adalaah : buat ngapus enak dari ketika input username dan password
// atau ambil cara paling gampang
// pilih id yg mau di apus dari id yg di input di parameter (params) 
// nanti id yg di input dia ngecek ke database..id nya ada atau engga
// kalo ada ya keapus
// kalo gada ya ga keapus

const deleteUser = async (request, response) => {
    const username = request.user.username
    const {
        password
    } = request.body
    console.log('data username >>', username);
    console.log('data password >>', password);

    const findUserQuery = `
    SELECT *
    FROM latihan
    WHERE username = $1
    `

    const deleteRowQuery = `
    DELETE FROM latihan
    WHERE username = $1
    `

    const values = [username]
    // const values = [username]
    console.log('data values >>', values);
    try {
        const findUserResult = await pool.query(findUserQuery, values)
        console.log('data user result >>', findUserResult);
        const comparePassword = await bcrypt.compare(password, findUserResult.rows[0]['password'])
        console.log('data password dari database >>', findUserResult.rows[0]['password'])
        console.log('compare password >>', comparePassword)
        if (findUserResult) {
            if (comparePassword) {
                console.log('data delete values >>', values)
                const deleteUser = await pool.query(deleteRowQuery, values)
                console.log('proses delete >>', deleteUser)
                response.json({
                    message: `${username} DELETED`,
                    data: {
                        id: findUserResult.rows[0]['id'],
                        username: findUserResult.rows[0]['username']
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

// TODO: update data user
/// FIXME: disini buat update user apa yg mau diupdate?? dan gimana cara updatenya?? dari masukkin username dan password?
// atau mau dari ID yg ditaro di params terus di body nya buat hal yg mau di update???
// gimana kalo yg di update adalah username??? 
// jadi sebelum mau update username...harus di cek dlu di database
// jika username mau diubah terus dia sama kayak yg di database, sistem ngasih tau kalo username udah kepake
// kalo gada si user bisa ngubah usernamenya dia
// jadi kurang lebih syarat untuk perubahan username hampir sama kayak begitu buat user baru

const updatePassword = async (request, response) => {
    console.log('request body', request.body)
    // const username = request.body.username
    const username = request.user.username
    const password = request.body.password
    const newPassword = request.body.newPassword
    console.log('data request body username >> ', username)
    console.log('data request body password >> ', typeof (password))
    console.log('data request body newPassword >> ', typeof (newPassword))

    const checkUsernameQuery = `
    SELECT *
    FROM latihan
    WHERE username = $1
    `

    const updateUserPasswordQuery = `
    UPDATE latihan
    SET password = $1
    WHERE username = $2 
    `
    const value = [username]
    console.log('value cek username >> ', value)

    try {
        console.log('panjang password baru >>', newPassword.trim().length == 0)
        if (newPassword == "" || newPassword.trim().length == 0) {
            return response.status(401).json({
                message: "PASSWORD BARU TIDAK BOLEH KOSONG"
            })
        }
        const checkUsernameResult = await pool.query(checkUsernameQuery, value)
        const comparePassword = await bcrypt.compare(password, checkUsernameResult.rows[0]['password'])
        console.log('ambil password di db => ', checkUsernameResult.rows[0]['password'])
        if (checkUsernameResult) {
            // TODO: compare password yg dimasukkin dari body sama yg di database..
            // kalo match baru jalanin query UPDATE buat masukkin password yg baru
            // yg dimasukkin dari body juga
            if (comparePassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                console.log('hash password >> ', hashedPassword)
                const valueUpdatePasswordQuery = [hashedPassword, username]
                const updatePassword = await pool.query(updateUserPasswordQuery, valueUpdatePasswordQuery)
                console.log('password updated = > ', updatePassword)
                response.json({
                    message: 'PASSWORD TELAH TERGANTI'
                })

            } else {
                response.status(401).json({
                    message: 'PASSWORD TIDAK COCOK'
                })
            }
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