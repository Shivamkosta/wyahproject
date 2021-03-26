const express = require('express');
const router = express.Router();
var connection  = require('../lib/connection');
const jwt = require("jsonwebtoken"); // to generate signed token
const nodemailer = require('nodemailer');

// Registration page
router.get('/', function(req, res){
    res.render('signin')
});

router.post("/signin", (req, res) => {
  console.log("hiii ",req.body)
    connection.query("SELECT * from wyah WHERE email=?",
      [req.body.email], (err, rows) => {
        // console.log(rows);
        // console.log("length :",rows.length)
        if(err){
          res.status(400).json({
            status:false
          });
          console.log("error :",err);
        }
        console.log(rows[0].email)
        console.log(rows[0].password)
        // console.log(rows[0].otp)
        if (rows && rows[0].email == req.body.email && rows[0].password == req.body.password) {
          console.log("true")
          res.redirect('/users/dashboard')
          // res.status(200).json({ status: "You have successfully login" })
        } else {
          res.status(400).json({ status: "failur", message: "email and password is wrong" })
        }
      })
  })

router.get('/registration', function(req, res){
    res.render('registration',{
        fullname: '',
        email: '',
        city:'',
        phone:'',
        password:'',
        confirmpassword:'',
    })
});
router.post('/registration',(req,res)=>{
  console.log("hihi",req.body)
  // let fullname = req.body.fullname;
  // let email = req.body.email;
  // let city = req.body.city;
  // let phone = req.body.phone;
  // let password = req.body.password;
  // let confirmpassword = req.body.confirmpassword;
  let errors = false;

 
  // if(fullname.length === 0 || email.length === 0 || city.length === 0 || phone.length === 0 || password.length === 0 || confirmpassword.length === 0 ) {
  //     errors = true;

  //     // set flash message
  //     // req.flash('error', "Please enter all fields");
  //     // render to add.ejs with flash message
  //     res.render('users/registration', {
  //         fullname: fullname,
  //         email: email,
  //         city : city,
  //         phone : phone,
  //         password : password,
  //         confirmpassword : confirmpassword,
  //     })
  // }

  // if no error
  if(!errors) {

      // insert query
      connection.query('INSERT INTO wyah (fullname,email,city,phone,password,confirmpassword) VALUES(?,?,?,?,?,?)',
       [req.body.fullname,req.body.email,req.body.city,req.body.phone,req.body.password,req.body.confirmpassword], function(err, result) {
          //if(err) throw err
          if (err) {

              res.status(404).json({
                  status:false
              })
              console.log("error :",err);
              // req.flash('error', err)
               
              // render to add.ejs
              // res.render('users/registration', {
              //     fullname: result.fullname,
              //     email: result.email,
              //     city:result.city,
              //     phone:result.phone, 
              //     password : result.password,
              //     confirmpassword:result.confirmpassword                   
              // })
          } else {                
              // req.flash('success', 'Student successfully added');
              // res.status(200).json({
              //     status:true
              // })
              console.log("result :",result)
              res.redirect('/users');
              
          }
      })
  }
});

router.get('/dashboard',(req,res)=>{
  res.render('dashboard')
})

router.get('/forgetpassword',(req,res)=>{
  res.render('forgetpassword')
})
router.post('/forgetpassword',(req,res)=>{

  console.log('forgetpassword :',req.body);
  var e = req.body.email;
  console.log("email :", e);
  connection.query(
    "SELECT * from wyah WHERE email=?",
    [req.body.email],(err, rows) => {
      if (err) {
        console.log("error :", err);
      }
      console.log("rows, rows.length :", rows, rows.length);
      if (rows.length > 0) {
        console.log(" existing user");
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log("otp :", otp);
        //generate a signed token with user email with secret
        const token = jwt.sign(req.body.email, "digimonk");
        console.log("generate token :", token);

        //save token in cookies
        res.cookie("token", token, { expire: new Date() + 9999 });

        connection.query("UPDATE wyah SET otp =?, WHERE email=?", [otp, req.body.email], (err, results) => {
          console.log("results :", results);
        })
        // res.json({
        //   token,
        //   otp,
        //   data: rows[0],
        // });
        res.redirect("/users/otp")
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          service: "gmail",
          auth: {
            user: "shivamkosti570@gmail.com",
            pass: "008602750983",
          },
        });

        var mailOption = {
          from: "shivamkosti570@gmail.com",
          to: req.body.email,
          // mail,
          subject: "send mail",
          html: `<p> we have received a request to have your password reset for <b>KOOKY ACCOUNT</b>.
        if you did not make this request ,plese ignore this email.<br>
        <br> To reset your password,plese <a href = "#"><b>visit the link</b></a> </p> <hr>
        <h3><b> Having trouble?</b></h3>
        <p>if the above link does not work try copying this link into your browser.</p>
        <p>${otp}</p></hr>
        <h3><b> Question ?<b></h3>
        <p>plese let us know if there's anything we can help you with by replying to this email or by emailing <b>Kooky.com</b></p>`,
        };

        transporter.sendMail(mailOption, function (err, info) {
          if (err) {
            console.log("error :", err);
          } else {
            console.log("Email Sent successfully :" + info.response);
          }
        });
      }
      else {
        console.log("new user");
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log("otp :", otp);

        //generate a signed token with user email with secret
        const token = jwt.sign(req.body.email, "digimonk");
        console.log("generate token :", token);

        //save token in cookies
        res.cookie("token", token, { expire: new Date() + 9999 });

        connection.query(
          "insert into joining(email) value(?)",
          [req.body.email],
          (err, user) => {

            // console.log("mail :", mail);
            if (err) {
              res.status(400).json({
                status:false
              });
              console.log('mail not send :',err)
              connection.query("UPDATE wyah SET otp =?,WHERE email=?", [otp, req.body.email], (err, results) => {
                console.log(results);
              })
            }


            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              service: "gmail",
              auth: {
                user: "shivamkosti570@gmail.com",
                pass: "008602750983",
              },
            });

            let mailOption = {
              from: "shivamkosti570@gmail.com",
              to: e,

              subject: "send mail",
              html: `<p> we have received a request to have your password reset for <b>KOOKY ACCOUNT</b>.
        if you did not make this request ,plese ignore this email.<br>
        <br> To reset your password,plese <a href = "#"><b>visit the link</b></a> </p> <hr>
        <h3><b> Having trouble?</b></h3>
        <p>if the above link does not work try copying this link into your browser.</p>
        <p>${otp}</p></hr>
        <h3><b> Question ?<b></h3>
        <p>plese let us know if there's anything we can help you with by replying to this email or by emailing <b>Kooky.com</b></p>`,
            };

            transporter.sendMail(mailOption, function (err, info) {
              if (err) {
                res.status(400).json({
                  status:false
                })
                console.log("error :",err);
              } else {
                res.redirect('/users/otp')
                console.log("Email Sent successfully :" + info.response);
              }
            });

            // res.status(200).json({
            //   status: "success",
            //   token,
            //   otp,

            // });
            res.redirect('/users/otp')
          }
        );
      }
    }
  );

})
router.get('/otp',(req,res)=>{
  res.render('otp');
})

router.post('/otp',(req,res)=>{
  console.log('otp :',req.body);
  var joinotp = req.body.otp;
  console.log("joinotp :",joinotp);
  var a = joinotp.join("");
  console.log("join :",a);
  connection.query("SELECT * from wyah WHERE otp=?",
    [a], (err, rows) => {
      console.log("hii",rows[0].otp)
      if (rows[0].otp == a) {
        console.log("true")
        res.redirect('/users/dashboard');
        // res.status(200).json({ status: "You have successfully verified" })
      } else {
        res.status(400).json({ status: "failur", message: "Incorrect otp please enter your correct otp" })
      }
    })
})



// registration api


// login api
router.post('/login',(req,res)=>{
    connection.query("SELECT * FROM wyah WHERE email=?",
    [
        req.body.email,
        req.body.password
    ],(err,rows)=>{
        if(err){
            res.status(401).json({
                status:false
            });
            console.log("error :",err);
        }
        //generate a signed token with user email with secret
        const token = jwt.sign(req.body.email, "digimonk");
        console.log("generate token :", token);
        //save token in cookies
        res.cookie("token", token, { expire: new Date() + 9999 });

        res.status(200).json({
            status:true,
            token:token
        })
        console.log("rows :",rows);
    })
})



router.post('/registratio', (req, res) => {
    connection.query("INSERT INTO wyah (fullname,email,city,phone,password,confirmpassword) values(?,?,?,?,?,?)",
      [
        req.body.fullname,
        req.body.email,
        req.body.city,
        req.body.phone,
        req.body.password,
        req.body.confirmpassword,
        
    ], (err, user) => {
        if (err) {
          res.status(401).json({
            status: false
          });
          console.log("error :", err);
        } else {
          res.status(201).json({
            status: true
          });
          console.log("user :", user);
        }
      })
  })
module.exports = router;