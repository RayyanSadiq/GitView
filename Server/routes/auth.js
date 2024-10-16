const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user.email'] }),   );

router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.CLIENT_BASE_URL + "/login"  }), function (req, res) { 
    res.redirect(process.env.CLIENT_BASE_URL);
});  

router.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user });
    }
    return res.json({ user: null });
})

router.get('/logout', (req, res) => { 
    req.session.destroy((err) => {
        res.json({ message: 'You are logged out' });
    })
});



module.exports = router;