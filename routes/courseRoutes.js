const express = require('express');
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../controllers/courseController');
const { validateCourse } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validateCourse, createCourse);
router.get('/', getCourses);
router.put('/:id', authMiddleware, validateCourse, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);

module.exports = router;
