const express = require('express');
const router = express.Router();

// signin page
router.get('/signin', function(req, res){
    res.render('signin')
  });

module.exports=router;