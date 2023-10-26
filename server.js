// grab our dependencies
const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8080 

// configure our application
require('dotenv').config()

// connect to our database
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB connected!'))
    .catch(() => {
        console.log('Cannot connect to MongoDB!')
        process.exit(1)
    })

app.use(express.static(__dirname + '/public'))

// set ejs as our templating engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// set the routes
app.use(require('./app/routes'))

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost: ${port}`)
})
