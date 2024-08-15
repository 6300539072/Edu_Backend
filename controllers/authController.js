const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

exports.register = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.login = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').exists().withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.updateUser = [
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, email, password } = req.body;
      try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
        }
  
        await user.save();
        res.json({ message: 'User updated successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  ];
  
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
