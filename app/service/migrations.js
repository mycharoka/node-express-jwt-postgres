const bcrypt = require('bcrypt')

let migration = async (client) => {
    try {
        await client.query(
            "CREATE TABLE IF NOT EXISTS training( id serial PRIMARY KEY, username VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, role VARCHAR NOT NULL)"
        )

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(process.env.PASSWORD, salt)

        let firstUserQuery = "INSERT INTO training (username, password, role) VALUES($1, $2, $3)"
        let firstUserValue = [process.env.USERNAME_TISU, hashedPassword, "admin"]
        let response = await client.query(firstUserQuery, firstUserValue)
        if (response) {
            console.info("INITIALIZE FIRST USER AND PASSWORD SUCCESS!!")
        }
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    migration
}