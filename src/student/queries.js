
const getStudents = "SELECT * FROM Student";
const getStudentById = "SELECT * FROM Student WHERE id = $1";
const checkEmailExists = "SELECT s FROM Student s WHERE s.email =$1";
const addStudent = "INSERT INTO Student (firstname,lastname,email) VALUES ($1,$2,$3)";



module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
}