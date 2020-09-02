require('dotenv').config()
const {
    client
} = require('./db')
const auth = require('../service/migrations')

let migration = async () => {
    try {
        await client.connect()
        await auth.migration(client)
        await client.end()
    } catch (error) {
        console.error(error.message)
        await client.end()
    }
}

migration()