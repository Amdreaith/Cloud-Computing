const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const students = [
    {
    id: 1,
    name: "Maria"
    },
    {
    id: 2,
    name: "Juan"
    },
    {
    id: 3,
    name: "Jose"
    }
    ];
// GET route - return list of students
app.get('/students', (req, res) => {
res.json(students);
});
// POST route - add a student
app.post('/students', (req, res) => {
const newStudent = req.body; students.push(newStudent);
res.json({
message: "Student added successfully",
student: newStudent
});
});
// DELETE route - delete a student by id
app.delete('/students/:id', (req, res) => {
const studentId = parseInt(req.params.id);
// Find the index of the student with that ID
const index = students.findIndex(student => student.id === studentId);
if (index !== -1) {
// Remove the student from the array
const deletedStudent = students.splice(index, 1);
res.json({
message: `Student with ID ${studentId} deleted successfully`,
student: deletedStudent[0]
});
} else {
// If no student found
res.status(404).json({
message: `Student with ID ${studentId} not found`
});
}
});
app.listen(port, () => {
console.log(`API is running at http://localhost:${port}`);
})