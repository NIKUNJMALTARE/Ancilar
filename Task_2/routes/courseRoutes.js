const express = require('express');
const router = express.Router();
const { courses, courseEnrollments, students } = require('../data/store');

router.post('/newcourse', (req, res) => {
  const { id, title, capacity } = req.body;
  if (!id || !title || typeof capacity !== 'number' || capacity <= 0) {
    return res.status(400).json({ message: 'Invalid course data.' });
  }
  if (courses.has(id)) {
    return res.status(400).json({ message: 'Course already exists.' });
  }
  courses.set(id, { id, title, capacity, enrolledCount: 0 });
  courseEnrollments.set(id, new Set());
  res.status(201).json({ message: 'Course created.' });
});

router.get('/:id/students', (req, res) => {
  const courseId = req.params.id;
  if (!courses.has(courseId)) {
    return res.status(404).json({ message: 'Course not found.' });
  }
  const studentIds = courseEnrollments.get(courseId);
  const studentList = Array.from(studentIds).map(id => students.get(id));
  res.json(studentList);
});

module.exports = router;