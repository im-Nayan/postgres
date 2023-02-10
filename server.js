const express = require('express');
const path = require('path');
const PORT = process.env.PORT ||3000

require('dotenv').config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));


// app.use('/',(req,res)=>{
//     res.send("hellow World");
// })
// ROUTER SECTION
const userRouter = require('./src/student/router');
app.use(userRouter);





app.listen(PORT, function () {
console.log('Express app running on port ' + PORT)
console.log(`http://127.0.0.1:${PORT}`)
});
