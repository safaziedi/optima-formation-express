const express = require('express')
const app = express()

const logger  = (req, res, next) => {
    console.log("Logger started ...")
    console.log(req.url)
    next()
}

app.get('/about', logger, (req, res) => {
    return res.send('About Page')
})

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})
