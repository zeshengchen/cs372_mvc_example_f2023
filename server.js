// grab our dependencies
const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash')    

// configure our application
require('dotenv').config()

const port = process.env.PORT || 8080

// set sessions and cookie parser
app.use(cookieParser())
app.use(session({
  secret: process.env.SECRET,
  cookie: {maxAge: 60000},
  resave: false, // forces the session to be saved back to the store
  saveUninitialized: false // dont save unmodified
}))
app.use(flash())

// connect to our database
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('DB connected!'))
    .catch(() => {
        console.log('Cannot connect to MongoDB!')
        process.exit(1)
    })

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }))

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
