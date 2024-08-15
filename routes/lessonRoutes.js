const express = require('express');
const { createLesson, getLessons } = require('../controllers/lessonController');
const { validateLesson } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, validateLesson, createLesson);
router.get('/', getLessons);

module.exports = router;
