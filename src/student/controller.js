const pool = require('../../database/db');
const queries = require('./queries');


const Sequelize = require('sequelize');
const { Student } = require('../../models');
// const sequelize = require('../../config/database.json').sequelize;

// Bring in Model
// const student=require("../../models/students")(students, Sequelize.DataTypes,
//      Sequelize.Model)

class controller {
    async index(req, res) {
        res.send("using api route");
    }
    async getstudentData(req, res) {
        console.log("Get student Data");
        // res.send("get data");
        // pool.query(queries.getStudents, (error,data)=>{
        //     if(error) throw error
        //     res.status(200).json(data.rows)
        // })
        try {
            let studentData = await pool.query(queries.getStudents)
            if (studentData) {
                res.status(200).json({
                    message: "students found",
                    data: studentData.rows,
                    status: 200
                })
            } else {
                console.log("student data not found");
                res.status(400).json({
                    message: "student data not found",
                    data: {},
                    status: 400
                })
            }

        } catch (error) {
            console.log("getStudentData Error :", error);
        }
    }
    async student(req, res) {
        try {
            const id = parseInt(req.params.id);
            const student = await pool.query(queries.getStudentById, [id]);
            console.log(student.rowCount);
            if (student && student.rowCount > 0) {
                res.status(200).json({
                    message: "student found with this Id",
                    data: student.rows[0],
                    status: 200
                })
            } else {
                console.log("Not student found with this Id");
                return res.status(400).json({
                    message: "Not student found with this Id",
                    data: {},
                    status: 400
                })

            }
        } catch (error) {
            console.log("student ERROR :", error);
        }

    }

    async addStudent(req, res) {
        try {
            const { firstname, lastname, email } = req.body;
            // const checkEmailExists = await Student.findOne({where: {email: email}})
            // console.log(checkEmailExists,"zzzzzzzzz");
            const jane = await Student.create({ firstName: "Jane",lastName:"dos",email:"jane@dos.com" });
            // Jane exists in the database now!
            console.log(jane instanceof Student); // true
            console.log(jane.firstName); // "Jane"

        } catch (error) {
            console.log("addStudent Error", error);
        }
    }

    // async addStudent(req, res) {
    //     try {
    //         const { firstname, lastname, email } = req.body;
    //         console.log(req.body);
    //         const checkEmailExists = await pool.query(queries.checkEmailExists, [email])

    //         console.log(checkEmailExists);
    //         if (checkEmailExists.rows.length == 0 && checkEmailExists.rowCount == 0) {
    //             // ADD STUDENT DATA
    //             // console.log(queries,'queryyyyyyyyy');
    //             // pool.query(queries.addStudent,[firstname,lastname,email,createdAt,updatedAt],(err,result)=>{
    //             //   if(err) throw err;
    //             const saveStudent=await Student.create({
    //                 firstname:firstname,
    //                 lastname:lastname,
    //                 email:email
    //             })
    //               res.status(200).send({
    //                 message:"Student Created Successfully!",
    //                 data:saveStudent,
    //                 status:200
    //               })  
    //             // })
    //         }else{
    //            return res.status(400).json({
    //                 message: "Email is allready Exists",
    //                 data: checkEmailExists.rows[0],
    //                 status: 400
    //             })
    //         }
    //     } catch (error) {
    //         console.log("Add Student Error :", error);
    //     }
    // }
}

// EXPORTS 
module.exports = new controller();