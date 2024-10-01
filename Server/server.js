const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});


const users = require('./routes/user')
const explore = require('./routes/explore')
app.use('/api/user', users)
app.use('/api/explore', explore)


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});