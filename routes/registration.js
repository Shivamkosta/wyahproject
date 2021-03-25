const express = require('express');
const router = express.Router();
var connection  = require('../lib/connection');

// Registration page
router.get('/', function(req, res){
    res.render('signin',{
        fullname: '',
        email: '',
        city:'',
        phone:'',
        password:'',
        confirmpassword:'',
    })
});

// display add student page
// router.get('/registration', function(req, res, next) {    
//     // render to add.ejs
//     res.render('register/signin', {
//         fullname: '',
//         email: '',
//         city:'',
//         phone:'',
//         password:'',
//         confirmpassword:'',       
//     })
// })

router.post('/register',(req,res)=>{
    let fullname = req.body.fullname;
    let email = req.body.email;
    let city = req.body.city;
    let phone = req.body.mobile;
    let password = req.body.password;
    let confirmpassword = req.body.confirmpassword;
    let errors = false;

    if(fullname.length === 0 || email.length === 0 || city.length === 0 || phone.length === 0 || password.length ===0 || confirmpassword === 0 ) {
        errors = true;

        // // set flash message
        // req.flash('error', "Please enter all fields");
        // render to add.ejs with flash message
        res.render('registration', {
            fullname: fullname,
            email: email,
            city : city,
            phone : phone,
            password : password,
            confirmpassword:confirmpassword
        })
    }
    if(!errors){
         // insert query
         connection.query('INSERT INTO wyah (fullname,email,city,phone,password,confirmpassword) VALUES(?,?,?,?,?,?)',
         [fullname,email,city,phone,password,confirmpassword], function(err, result) {
            //if(err) throw err
            if (err) {
                res.status(401).json({
                    status:false
                });
                console.log("error :",err);
                // req.flash('error', err)
                 
                // render to add.ejs
                res.render('registration', {
                    fullname: result.fullname,
                    email: result.email,
                    city:result.city,
                    phone:result.phone, 
                    password : result.password,
                    confirmpassword : result.confirmpassword                   
                })
            } else {                
                // req.flash('success', 'Student successfully added');
                res.redirect('/registration');
            }
        })
    }
})

module.exports = router;