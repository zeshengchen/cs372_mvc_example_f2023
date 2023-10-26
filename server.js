// grab our dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080 

// configure our application

// set the routes
app.get('/', (req, res) => {
    res.send('Hello CS372!')
})

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost: ${port}`)
})
