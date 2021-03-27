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
  // hash password and compare password
  // const {email} = req.body;
  // let post = {email:email};
  // let sql = 'SELECT password FROM wyah WHERE email=?';
  // connection.query(sql,post,(err,rows)=>{
  //   if(err){
  //     res.status(401).json({
  //       status:false
  //     });
  //     console.log("error :",err);
  //   }
  //   else if(!err){
  //     bcrypt.hash(result,null,null,function(err,results){

  //     });
  //     bcrypt.compare(req.body.password,hash,(err,res)=>{
  //       if(err){
  //         res.status(404).json({
  //           status:false
  //         });
  //         console.log("err :",err);
  //       }
  //       if(rows.length > 0)
  //     {
  //         const token = jwt.sign(req.body.email,"digimonk");
  //         console.log("token :",token);
  //         res.cookie("jwt_token",token,{ expire: new Date() + 9999 });
        
  //         console.log("rows[0].email :",rows[0].email)
  //         console.log("rows[0].password :",rows[0].password);
  //         // console.log(rows[0].otp)
  //         if (rows && rows[0].email == req.body.email && rows[0].password == req.body.password) {
  //           console.log("true")
  //           res.redirect('/users/dashboard')
  //           // res.status(200).json({ status: "You have successfully login" })
  //         } else {
  //           res.status(400).json({ status: "failur", message: "email and password is wrong" })
  //         }
  //     }
         
  //     })
  //   }
  // });

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
      if(rows.length > 0)
      {
          const token = jwt.sign(req.body.email,"digimonk");
          console.log("auth :",token);
          res.cookie("auth",token,{ expire: new Date() + 9999 });
        
          console.log("rows[0].email :",rows[0].email)
          console.log("rows[0].password :",rows[0].password);
          // console.log(rows[0].otp)
          if (rows && rows[0].email == req.body.email && rows[0].password == req.body.password) {
            console.log("true")
            // res.status(200).json({
            //   status:true,
            //   token
            // })
            res.redirect('/users/dashboard')
            // res.status(200).json({ status: "You have successfully login" })
          } else {
            res.status(400).json({ status: "failur", message: "email and password is wrong" })
          }
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
  let errors = false;
  // if no error
  // if(!errors) {

    // hash password
    bcrypt.hash([req.body.password,req.body.confirmpassword],10,(err,hash)=>{
      if(err){
        return res.status(500).json({
          status:false
        })
        console.log("error",err)
      }
    })

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
  // }
});

router.get('/dashboard',(req,res)=>{
  // console.log("hii :",req.body);
  res.render('dashboard')
});

router.get('/forgetpassword',(req,res)=>{
  res.render('forgetpassword')
});

router.post('/forgetpassword',(req,res)=>{

  console.log('forgetpassword :',req.body);
  var e = req.body.email;
  console.log("email :", e);
  connection.query(
    "SELECT * from wyah WHERE email=? ",
    [req.body.email],(err, rows) => {
      if (err) {
        res.status(401).json({
          status:false
        })
        console.log("error :", err);
      }
      console.log("rows, rows.length :", rows, rows.length);
      if (rows.length > 0) {
        console.log(" existing user");
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log("otp :", otp);
        //generate a signed token with user email with secret
        // const token = jwt.sign(req.body.email, "digimonk");
        // console.log("generate token :", token);

        // //save token in cookies
        // res.cookie("token", token, { expire: new Date() + 9999 });

        connection.query("update wyah SET otp =? WHERE email=?", [otp, req.body.email], (err, results) => {
          if(err){
            res.status(401).json({
              status:false
            });
            console.log("error :",err);
          }
          console.log("results :", results);         
          res.redirect("/users/otp")
        })
        // res.json({
        //   token,
        //   otp,
        //   data: rows[0],
        // });
        
         
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
      // else {
      //   console.log("new user");
      //   var otp = Math.floor(1000 + Math.random() * 9000);
      //   console.log("otp :", otp);

      //   //generate a signed token with user email with secret
      //   const token = jwt.sign(req.body.email, "digimonk");
      //   console.log("generate token :", token);

      //   //save token in cookies
      //   res.cookie("token", token, { expire: new Date() + 9999 });

      //   connection.query(
      //     "insert into joining(email) value(?)",
      //     [req.body.email],
      //     (err, user) => {

      //       // console.log("mail :", mail);
      //       if (err) {
      //         res.status(400).json({
      //           status:false
      //         });
      //         console.log('mail not send :',err)
      //         connection.query("UPDATE wyah SET otp =?,WHERE email=?", [otp, req.body.email], (err, results) => {
      //           console.log(results);
      //         })
      //       }


      //       const transporter = nodemailer.createTransport({
      //         host: "smtp.gmail.com",
      //         port: 587,
      //         secure: false,
      //         service: "gmail",
      //         auth: {
      //           user: "shivamkosti570@gmail.com",
      //           pass: "008602750983",
      //         },
      //       });

      //       let mailOption = {
      //         from: "shivamkosti570@gmail.com",
      //         to: e,

      //         subject: "send mail",
      //         html: `<p> we have received a request to have your password reset for <b>KOOKY ACCOUNT</b>.
      //   if you did not make this request ,plese ignore this email.<br>
      //   <br> To reset your password,plese <a href = "#"><b>visit the link</b></a> </p> <hr>
      //   <h3><b> Having trouble?</b></h3>
      //   <p>if the above link does not work try copying this link into your browser.</p>
      //   <p>${otp}</p></hr>
      //   <h3><b> Question ?<b></h3>
      //   <p>plese let us know if there's anything we can help you with by replying to this email or by emailing <b>Kooky.com</b></p>`,
      //       };

      //       transporter.sendMail(mailOption, function (err, info) {
      //         if (err) {
      //           res.status(400).json({
      //             status:false
      //           })
      //           console.log("error :",err);
      //         } else {
      //           res.redirect('/users/otp')
      //           console.log("Email Sent successfully :" + info.response);
      //         }
      //       });

      //       // res.status(200).json({
      //       //   status: "success",
      //       //   token,
      //       //   otp,

      //       // });
      //       res.redirect('/users/otp')
      //     }
      //   );
      // }
    }
  );

});

router.get('/otp',(req,res)=>{
  res.render('otp');
});

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
});

router.get('/manage-customer',(req,res)=>{
  
  let token = req.cookies.auth
  var splitToken = token
  console.log("auth :", splitToken);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(splitToken, "digimonk", (err, rows) => {
    rows;
    console.log("rows :", rows)

    if (err) {
      console.log("error :", err);
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    connection.query("SELECT * from wyah WHERE email=? ", [rows], (err, response) => {
      if (err) {
        console.log("error :", err);
        res.status(400).json({ status: false })
      } else {
        res.render('manage-customer',{data:response})
        // res.status(201).json({ status: true })
        console.log("response :", response)
      }
    })
  })
  
})

router.post('/manage-customer',(req,res)=>{

  console.log("hii",req.body);

  // let id = req.body.id;
  // let fullname = req.body.fullname;
  // let city = req.body.city;
  // let phone = req.body.phone;
  // let country = req.body.country;
  // let accounttype = req.body.accounttype;

  // var form_data = {
  //   fullname : fullname,
  //   city : city,
  //   phone : phone,
  //   country : country,
  //   accounttype : accounttype
  // }
  connection.query("UPDATE wyah SET fullname='"+req.body.fullname+"',phone='"+req.body.phone+"',city='"+req.body.city+"',country='"+req.body.country+"',accounttype='"+req.body.accounttype+"' WHERE id = "+req.body.id,[req.body.fullname,req.body.city,req.body.phone,req.body.country,req.body.accounttype],(err,result)=>{
    if(err){
      res.status(400).json({
        status:false
      })
      console.log("error :",err);
    }
    else{
      res.render('manage-customer',{data:result});
    }
  })
  
  // const userId = req.body.id;
  //   let sql = "update wyah SET fullname='"+req.body.fullname+"',phone='"+req.body.phone+"',city='"+req.body.city+"',country='"+req.body.country+"',accounttype='"+req.body.accounttype+"' where id ="+userId;
  //   connection.query(sql,(err, results) => {
  //     if(err) {
  //       res.status(403).json({
  //         status:false
  //       });
  //       console.log("error :",err);
  //     }
  //     res.render('manage-customer',{data:results});
  //   });

  
  // connection.query("SELECT * FROM wyah WHERE email = ?",
  //   [req.body.email],(err,rows)=>{
  //     if(err){
  //       res.status(404).json({
  //         status:false
  //       });
  //       console.log("error :",err)
  //     }
  //     console.log("rows , rows.length :",rows,rows.length);
  //     if(rows.length > 0){
  //       connection.query('UPDATE wyah SET ? WHERE email = ?'
  //       [req.body.email,req.body.fullname,req.body.city,req.body.phone,req.body.country,req.body.companyname,req.body.accounttype],
  //       (err,rows)=>{
  //         if(err){
  //           res.status(404).json({
  //             status:false
  //           });
  //           console.log("error :",err);
  //         }
  //         else{
  //           res.render('manage-customer',{
  //             fullname:req.body.fullname,
  //             city:req.body.city,
  //             phone:req.body.phone,
  //             company:req.body.company,
  //             country:req.body.country,
  //             accounttype:req.body.accounttype
  //             // data:rows
  //           })
  //         }
  //       })
  //     }
  //   })
  
})

module.exports = router;