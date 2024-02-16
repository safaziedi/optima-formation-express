const express = require('express')
const app = express()
const port = 3000;

/*
    LOGGER
 */
const logger  = (req, res, next) => {
    console.log("Logger started ...")
    console.log(req.url)
    next()
}

app.get('/about', logger, (req, res) => {
    return res.send('About Page')
})


//les api 
app.get('/', (req, res) => {
    res.send('Hello OPTIMA')
})
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})
