const express = require('express');
const controller = require('./controller');
const multer = require('multer');
const response_post = multer().any();
const route = express.Router();




// GET METHODS
route.get('/',controller.index)
route.get('/getstudentData',controller.getstudentData)
route.get('/student/:id',controller.student);


//POST METHODS 
route.post('/addStudent',response_post,controller.addStudent)



// EXPORTS SECTION
module.exports = route;