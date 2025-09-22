const express = require('express');
const router = require('./router/index.js');

const app = express();

const port = 3002;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api', router)

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`)
})