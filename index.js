const express = require('express');
const app = express();
const port = 3000;
//les api 
app.get('/', (req, res) => {
    res.send('Hello OPTIMA')
})
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})
