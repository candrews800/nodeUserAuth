var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var errors = {};
    if(typeof req.session.registerErrors !== 'undefined'){
        errors = req.session.registerErrors;

        // Clear Errors For Next Request
        delete req.session.registerErrors;
    }

    res.render('auth/register', { errors: errors });
});

/* POST register new user */
router.post('/register', function(req, res, next) {
    errors = {};

    // Validate Email
    if(req.body.email == ''){
        errors.email = 'Email is required.';
    } else if( ! validateEmail(req.body.email)){
        errors.email = 'Email given does not match email format. example: username@host.com';
    }

    // Validate Password
    var password = req.body.password;
    if(password.length < 6 || password.length > 30){
        errors.password = 'Password must be between 6 and 30 characters.';
    }

    // Validate Confirm Password
    if(req.body.password_confirm != password){
        errors.password_confirm = 'Passwords must match.';
    }


    if( ! isObjectEmpty(errors)){
        req.session.registerErrors = errors;
    } else {
        // Valid Request, Create User
    }

    res.redirect('/auth');
});

function isObjectEmpty(obj){
    for(var prop in obj){
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }

    return true;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

module.exports = router;
