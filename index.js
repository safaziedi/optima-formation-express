const express = require('express')
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan');

const port = 3000;
//Charger les données
const products = require('./data.js')

/*
MIDDELWAREs
*/
app.use(express.json());//parse json data which comes from the frontend to the backend //app.use(bodyParser.json()) deprecated
app.use(morgan('tiny'));//logs pour capturer des informations sur les requêtes HTTP entrantes 
app.disable('x-powered-by');//pour réduire les informations divulguées dans les en-têtes HTTP et améliorer la sécurité globale de votre application web


/*
LES API
 */

// Use the productRoutes for the '/product' path
// app.use('/product', productRoutes);
const userRoutes = require('./routes/UserRoutes');
app.use('/user', userRoutes);


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

app.get('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})


app.put('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('Product not found')
    }
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }
    products[index] = updatedProduct
    res.status(200).json('Product updated')
})



app.delete('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
        if (index === -1) {
        return res.status(404).send('Product not found')
    }
    products.splice(index,1)
    res.status(200).json('Product deleted')
})



/*
Authentication
*/


/*
DataBase Connection
*/
mongoose.connect('mongodb://127.0.0.1:27017/optima')
.then(() => {
    /* start server only when we have valid connection */
    app.listen(port,()=>{
        console.log(`server running on http://localhost:${port}`);
    })
})
.catch((error) => {
      console.error('Error connecting to MongoDB:', error);
});