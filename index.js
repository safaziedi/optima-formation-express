const express = require('express')
const app = express()
const mongoose = require('mongoose');
const morgan = require('morgan');

const port = 3000;

/*
MIDDELWAREs
*/
app.use(express.json());//parse json data which comes from the frontend to the backend //app.use(bodyParser.json()) deprecated
app.use(morgan('tiny'));//logs pour capturer des informations sur les requêtes HTTP entrantes 
app.disable('x-powered-by');//pour réduire les informations divulguées dans les en-têtes HTTP et améliorer la sécurité globale de votre application web


/*
LES API
 */
//CRUD USER
const userRoutes = require('./routes/UserRoutes');
app.use('/user', userRoutes);



/*DEFAULT URL */
app.get('/', (req, res) => {
    res.send('Hello OPTIMA')
})


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