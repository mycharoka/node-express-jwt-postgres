require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();

const apiRoute = require('./app/routes/routes')

// request logger
app.use(morgan('common'))


app.use(function (request, response, next) {
    console.log('COBA MIDDLEWARE >> ', request.method, request.originalUrl)
    // response.send('balik')
    next()
})

// cross domain 
app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// API route
app.use('/api/node-try', apiRoute)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});