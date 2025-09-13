const express = require('express');
const router = express.Router();
const { students, enrollments, courses } = require('../data/store');

router.post('/addstudent', (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ message: 'Invalid student data.' });
  }
  if (students.has(id)) {
    return res.status(400).json({ message: 'Student already exists.' });
  }
  students.set(id, { id, name, email });
  enrollments.set(id, new Set());
  res.status(201).json({ message: 'Student created.' });
});

router.get('/:id/courses', (req, res) => {
  const studentId = req.params.id;
  if (!students.has(studentId)) {
    return res.status(404).json({ message: 'Student not found.' });
  }
  const courseIds = enrollments.get(studentId);
  const courseList = Array.from(courseIds).map(id => courses.get(id));
  res.json(courseList);
});

module.exports = router;