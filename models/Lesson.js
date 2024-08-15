// const { DataTypes } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Courses',
        key: 'id'
    }}
});

module.exports = Lesson;
