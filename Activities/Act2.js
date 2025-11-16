//This activity is to build a small REST API for a E-learning system using express js

//Requirements
//crete a GET endpoint /courses to get the list of courses
//create a POST endpoint /courses to add a new course
//create a PUT endpoint /courses/:id to update a course by id
//create a DELETE endpoint /courses/:id to delete a course by id

//CHALLENGE: Add PUT endpoints to update courses by id.

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const courses = [
    { id: 1,
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript, the most popular programming language for web development."
    },
    { id: 2,
      title: "Advanced CSS Techniques",
      description: "Master advanced CSS concepts and techniques to create stunning web pages."  
    },
    { id: 3,
      title: "Node.js for Beginners",
      description: "Get started with Node.js and build scalable server-side applications."
    }
];  


//get ROUTE
app.get('/courses', (req, res) => {
    res.json(courses);
});

//post ROUTE
app.post('/courses', (req, res) => {
    const newCourse = req.body;
    // basic validation
    if (!newCourse || !newCourse.title || !newCourse.description) {
        return res.status(400).json({ message: 'Course must include title and description' });
    }

    // assign an auto-incrementing id if not provided
    const maxId = courses.length ? Math.max(...courses.map(c => c.id || 0)) : 0;
    const newId = newCourse.id && Number.isInteger(newCourse.id) ? newCourse.id : maxId + 1;
    const courseToAdd = { id: newId, title: newCourse.title, description: newCourse.description };

    courses.push(courseToAdd);
    res.status(201).json(courseToAdd);
});

//delete ROUTE
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course.id === courseId);

    if (courseIndex !== -1) {
        const deletedCourse = courses.splice(courseIndex, 1);
        res.json({
            message: `Course with ID ${courseId} deleted successfully`,
            course: deletedCourse[0]
        });

    } else {
        res.status(404).json({ message: `Course with ID ${courseId} not found` });
    }
}); 

//put ROUTE
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const updatedCourse = req.body;
    const courseIndex = courses.findIndex(course => course.id === courseId);

    if (courseIndex !== -1) {
        // merge existing course with updates; keep id unchanged
        const existing = courses[courseIndex];
        const merged = { ...existing, ...updatedCourse, id: courseId };
        courses[courseIndex] = merged;
        res.json(merged);
    } else {
        res.status(404).json({ message: `Course with ID ${courseId} not found` });
    }
}); 

    app.listen(port, () => {
         console.log(`E-learning API server running at http://localhost:${port}`);
}); 