const express = require('express');
const controller = require('./controller');
const multer = require('multer');
const response_post = multer().any();
const route = express.Router();




// GET METHODS
route.get('/',controller.index)
route.get('/getstudentData',controller.getstudentData)
route.get('/student/:id',controller.student);
route.get('/deleteStudent/:id',controller.deleteStudent);


//POST METHODS 
route.post('/addStudent',response_post,controller.addStudent)
route.post('/updateStudent',response_post,controller.updateStudent)



// EXPORTS SECTION
module.exports = route;