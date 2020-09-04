const {
    pool
} = require('../config/db')


// TODO: SEARCH USER BY USERNAME
const findUserData = async username => {
    const query = `
    SELECT *
    FROM training
    WHERE username = $1
    `
    const value = [username]

    try {
        const findUserResult = await pool.query(query, value)
        return findUserResult.rows[0]

    } catch (error) {
        throw error
    }
}

// TODO: INSERT USERNAME AND PASSWORD TO DATABASE
const insertUserData = async (username, password, role) => {
    const query = `
    INSERT INTO training (username, password, role)
    VALUES ($1, $2, $3)
    `

    const value = [username, password, role]

    try {
        const insertUserDataResult = await pool.query(query, value)
        return insertUserDataResult.rows

    } catch (error) {
        throw error
    }
}

// TODO: FIND USER BY ID
const findUserId = async id => {
    const query = `
    SELECT id, username, role
    FROM training
    WHERE id = $1
    `

    const value = [id]

    try {
        const findUserByIdResult = await pool.query(query, value)
        return findUserByIdResult.rows[0]

    } catch (error) {
        throw error
    }
}

// TODO: FIND ALL REGISTERED USER
const findRegisteredUser = async () => {
    const query = `
    SELECT id, username, role
    FROM training
    `

    try {
        const findRegisteredUserResult = await pool.query(query)
        return findRegisteredUserResult.rows

    } catch (error) {
        throw error
    }
}

// TODO: DELETE USER
const deleteUserData = async username => {
    const query = `
    DELETE FROM training
    WHERE username = $1
    `

    const value = [username]

    try {
        const deleteUserDataResult = await pool.query(query, value)
        return deleteUserDataResult.rows[0]

    } catch (error) {
        throw error
    }
}


// TODO: UPDATE PASSWORD
const updateUserPassword = async (password, username) => {
    const query = `
    UPDATE training
    SET password = $1
    WHERE username = $2
    `

    const value = [password, username]

    try {
        let updateUserPasswordResult = await pool.query(query, value)
        return {
            status: 'CHANGE PASSWORD SUCCESS',
            message: updateUserPasswordResult.rows[0]
        }

    } catch (error) {
        return {
            status: 'error!!',
            message: error.message
        }
    }
}

module.exports = {
    findUserData,
    insertUserData,
    findUserId,
    findRegisteredUser,
    deleteUserData,
    updateUserPassword
}