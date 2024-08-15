const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { Op } = require('sequelize');

exports.searchContent = async (req, res) => {
console.log("searchContent:entering to search Content")
  const { keyword } = req.query;

  try {
    const courses = await Course.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { description: { [Op.like]: `%${keyword}%` } },
        ],
      },
      include: [Lesson],
    });

    const lessons = await Lesson.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });

    res.json({ courses, lessons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
