const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

//Login Page  
router.get('/login' , (req, res) => res.render('login'));


//Register Page  
router.get('/register' , (req, res) => res.render('register'));


// register handle

router.post('/register' , (req, res) => {
   const {name,email,password,password2} = req.body;

   let errors =[];

   // Check require fields
    
   if(!name || !email || !password || !password2){
       errors.push({ msg: 'Please fill in all fields'});
   }

   // Check password match
   if(password !== password2){
       errors.push({ msg: 'Password do not match'});
   }

   // Check pasword length
    if(password.length < 6){
        errors.push({ msg: 'Password should be atleast 6 characters'});
    }

    if(errors.length >0){
        
        res.render('register', {
            errors, 
            name,
            email,
            password,
            password2   
        });
    }else{
        
        //validation Passed
        User.findOne({ email: email})
        .then(user => {
            if(user){
                //User Exists
                errors.push({ msg: 'Email is already Registered'});
                res.render('register', {
                    errors, 
                    name,
                    email,
                    password,
                    password2   
                });

            } 
           else {
               
                const newUser = new User({
                    name,
                    email,
                    password
                
                }); 
               // Hash Password

               bcrypt.genSalt(10 , (err , salt) => 
               bcrypt.hash(newUser.password, salt, (err,hash) => {

                if(err) throw err;
                // Set Password to hashed
                newUser.password = hash;

                //Save the User

                newUser.save()
                .then(user => {
                    res.redirect('users/login');
                })
                .catch(err => console.log(err));

               
               }))
            }
        });
    }
});

module.exports = router; 
