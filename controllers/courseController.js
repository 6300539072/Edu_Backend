const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

exports.createCourse = async (req, res) => {

  console.log("createCourse:entering to creating courses")
  const { title, description, lessons } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const course = await Course.create({ title, description });

    if (lessons && lessons.length > 0) {
      await Lesson.bulkCreate(
        lessons.map((lesson) => ({ ...lesson, courseId: course.id }))
      );
    }

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    console.log("getCourses:entering to get the courses")
    const courses = await Course.findAll({ include: Lesson });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateCourse = async (req, res) => {
    console.log("updateCourse:entering to update the courses")
  const { title, description, lessons } = req.body;

  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.update({ title, description });

    if (lessons && lessons.length > 0) {
      await Lesson.destroy({ where: { courseId: course.id } });
      await Lesson.bulkCreate(
        lessons.map((lesson) => ({ ...lesson, courseId: course.id }))
      );
    }

    res.json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    console.log("deleteCourse:entering to delete the courses")
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.destroy();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
