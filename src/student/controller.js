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
        try {
            // let studentData = await pool.query(queries.getStudents)
            let studentData = await Student.findAll()
            console.log(studentData, 'studentData');

            if (studentData !== null) {
                res.status(200).json({
                    message: "students found",
                    data: studentData,
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

            const getStudentById = await Student.findOne({ where: { id: id } });

            console.log(getStudentById, 'zzzzz');
            if (getStudentById !== null && getStudentById.dataValues.id > 0) {
                res.status(200).json({
                    message: "student found with this Id",
                    data: getStudentById.dataValues,
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
            const checkEmailExists = await Student.findOne({ where: { email: email } })
            // console.log(checkEmailExists, "zzzzzzzzz");
            if (checkEmailExists !== null && checkEmailExists.dataValues.id >= 0) {
                console.log("checkEmailExists.dataValues", checkEmailExists.dataValues);
                return res.status(400).json({
                    message: "Email is allready Exists",
                    data: checkEmailExists.dataValues,
                    status: 400
                })
            } else {
                // console.log("Else part");
                const StudentData = await Student.create({ firstName: firstname, lastName: lastname, email: email });
                // StudentData exists in the database now!
                // console.log(StudentData instanceof Student); // true
                // console.log(StudentData.firstName); 
                if (StudentData) {
                    return res.status(200).json({
                        message: "Student Data Submitted",
                        data: StudentData,
                        status: 200
                    })
                } else {
                    return res.status(400).json({
                        message: "Student Data is not Submitted",
                        data: {},
                        status: 400
                    })
                }
            }

        } catch (error) {
            console.log("addStudent Error", error);
        }
    }

    async deleteStudent(req, res) {
        const id = parseInt(req.params.id);
        const student = await Student.findOne({ where: { id: id } });

        // console.log("student",student);
        if (student !== null && student.dataValues.id > 0) {
            console.log("if part");
            const deleteStudent = await Student.destroy({ where: { id: id } })
            if (deleteStudent) {
                return res.status(200).json({
                    message: "Student is Deleted",
                    data: deleteStudent,
                    status: 200
                })
            } else {
                return res.status(400).json({
                    message: "Student is Not Deleted",
                    data: {},
                    status: 400
                })
            }
        } else {
            return res.status(400).json({
                message: "Cann't find Student With This Id",
                data: {},
                status: 400
            })
        }
    }

    async updateStudent(req, res) {
        const id = parseInt(req.body.id);
        const student = await Student.findOne({ where: { id: id } });

        // console.log("student",student);
        if (student !== null && student.dataValues.id > 0) {
            const updateStudent = await Student.update({firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email},{where:{
                id:id
            }})
            // console.log("updateStudent",updateStudent);
            if (updateStudent) {
                return res.status(200).json({
                    message: "Student is Updated",
                    data: updateStudent,
                    status: 200
                })
            } else {
                return res.status(400).json({
                    message: "Student is Not Updated",
                    data: {},
                    status: 400
                })
            }

        } else {
            return res.status(400).json({
                message: "Cann't find Student With This Id",
                data: {},
                status: 400
            })
        }
    }

}

// EXPORTS 
module.exports = new controller();