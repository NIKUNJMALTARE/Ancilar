const express = require('express');
const router = express.Router();
const { students, courses, enrollments, courseEnrollments } = require('../data/store');

router.post('/enroll', (req, res) => {
  const { studentId, courseId } = req.body;
  const student = students.get(studentId);
  const course = courses.get(courseId);

  if (!student || !course) {
    return res.status(404).json({ message: 'Student or course not found.' });
  }
  if (course.enrolledCount >= course.capacity) {
    return res.status(400).json({ message: 'Course is full.' });
  }

  const studentCourses = enrollments.get(studentId);
  if (studentCourses.has(courseId)) {
    return res.status(400).json({ message: 'Student already enrolled.' });
  }

  studentCourses.add(courseId);
  courseEnrollments.get(courseId).add(studentId);
  course.enrolledCount += 1;

  res.json({ message: 'Enrollment successful.' });
});

router.delete('/unenroll', (req, res) => {
  const { studentId, courseId } = req.body;
  if (!students.has(studentId) || !courses.has(courseId)) {
    return res.status(404).json({ message: 'Student or course not found.' });
  }

  const studentCourses = enrollments.get(studentId);
  const courseStudents = courseEnrollments.get(courseId);

  if (!studentCourses.has(courseId)) {
    return res.status(400).json({ message: 'Student not enrolled in this course.' });
  }

  studentCourses.delete(courseId);
  courseStudents.delete(studentId);
  courses.get(courseId).enrolledCount -= 1;

  res.json({ message: 'Unenrolled successfully.' });
});

module.exports = router;