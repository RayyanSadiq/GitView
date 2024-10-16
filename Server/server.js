const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

app.use(express.json());
dotenv.config();
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.send('Hello World');
});

const github = require('./passport/github');

const users = require('./routes/user')
const explore = require('./routes/explore');
const auth = require('./routes/auth');

const connectDB = require('./db/connectDB');
app.use('/api/users', users)
app.use('/api/explore', explore)
app.use('/api/auth', auth);


app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
    connectDB();
});