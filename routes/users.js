const express = require('express');
const router =  express.Router();

//Login Page  
router.get('/login' , (req, res) => res.send('Welcome Vicky1337!'));



//Register Page  
router.get('/register' , (req, res) => res.send('Register'));


module.exports = router; 