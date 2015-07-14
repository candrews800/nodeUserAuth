var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(typeof req.session.signupError !== 'undefined' && req.session.signupError){
        console.log(req.session.signupError);
        req.session.signupError = false;
    }

    res.render('auth/register');
});

/* POST register new user */
router.post('/register', function(req, res, next) {
    req.session.signupError = true;
    res.redirect('/auth');
});

module.exports = router;
