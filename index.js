const express = require('express')
const app = express()
const port = 3000;
//Charger les données
const products = require('./data.js')

//les api 
app.get('/', (req, res) => {
    res.send('Hello OPTIMA')
})


app.use(express.json()) // parse json body content

app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})
