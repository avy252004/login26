const express = require('express');
const path = require('path');

const router = express.Router();
const passport = require('passport');
//const flash = require('connect-flash');

//require('./config/passport')(passport);

// POST route to handle login form submission
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/dashboard',  // On success, redirect to dashboard
  failureRedirect: '/dashboard',      // On failure, redirect back to login
  failureFlash: false             // Optionally, show flash messages for errors
}));
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html')); // Assuming you are using a view engine like EJS, Pug, etc.
});

// GET route to display the dashboard (protected route)
router.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(__dirname + '/public/about.html');  // Send the dashboard HTML if authenticated
  } else {
    res.redirect('/login');  // If not authenticated, redirect to login
  }
});

module.exports = router;
