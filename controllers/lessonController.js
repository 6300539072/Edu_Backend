const Lesson = require('../models/Lesson');
const { validationResult } = require('express-validator');
const validateLesson =require('../middleware/validationMiddleware')

exports.createLesson = async (req, res) => {
  console.log("createLesson:entering to create the lesson")
  const { title, content, courseId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const lesson = await Lesson.create({
        title: title,
        content:content,
        course_id: courseId 
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLessons = async (req, res) => {
    console.log("getLessons:entering to retrive the lesson")
  try {
    const lessons = await Lesson.findAll();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
