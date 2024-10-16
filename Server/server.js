const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const _dirname = path.resolve();

app.use(express.json());
dotenv.config();
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


const github = require('./passport/github');

const users = require('./routes/user')
const explore = require('./routes/explore');
const auth = require('./routes/auth');

const connectDB = require('./db/connectDB');
app.use('/api/users', users)
app.use('/api/explore', explore)
app.use('/api/auth', auth);

app.use(express.static(path.join(_dirname, 'Client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'Client', "dist",'index.html'));
} );

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});