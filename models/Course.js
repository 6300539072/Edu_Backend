const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const Lesson = require('./Lesson');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
});

Course.hasMany(Lesson, { foreignKey: 'courseId', onDelete: 'CASCADE' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Course;
