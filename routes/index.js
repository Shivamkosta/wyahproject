var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET home page by hbs engine
router.get('/home', function(req, res){
  res.render('registration', {
     array: ['One', 'Two', 'Three', 'Four'],
     message: 'Greetings from geekforgeeks'
  })
})

// Registration page
router.get('/registration', function(req, res){
  res.render('registration')
})

// Dashboard page
router.get('/dashboard', function(req, res){
  res.render('dashboard')
})

// Footer page
router.get('/footer', function(req, res){
  res.render('footer')
});

// forget password page
router.get('/forgetpassword', function(req, res){
  res.render('forgetpassword')
})

// otp page
router.get('/otp', function(req, res){
  res.render('otp')
})

// signin page
router.get('/signin', function(req, res){
  res.render('signin')
})

// post page
// signin page
router.get('/post', function(req, res){
  res.render('post')
})

// manage customer page
router.get('/manage-customer', function(req, res){
  res.render('manage-customer')
})

// manage service page
router.get('/manage-service', function(req, res){
  res.render('manage-service')
})

// media page
router.get('/media', function(req, res){
  res.render('media')
})

// my post page
router.get('/mypost', function(req, res){
  res.render('mypost')
})

// setting page
router.get('/setting', function(req, res){
  res.render('setting')
})

// terms & condition page
router.get('/terms', function(req, res){
  res.render('terms')
})
module.exports = router;
