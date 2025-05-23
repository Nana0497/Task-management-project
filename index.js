const express = require('express');
const bodyPraser = require('body-parser');
const app = express();
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');

require('dotenv').config();
require ('./db');
const PORT = 4000;

app.use(express.json());
app.use('/users', userRoute);
app.use('/task', taskRoute);

app.get('/', (req, res) => {
    res.json({
        message: 'Task manager API is working'
    })
});


app.listen(PORT, () => {
console.log(`server is running on port ${PORT}.`);
})