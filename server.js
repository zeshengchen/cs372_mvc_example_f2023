// grab our dependencies
const express = require('express'),
    app = express(),
    expressLayouts = require('express-ejs-layouts'),
    port = process.env.PORT || 8080 

// configure our application
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
