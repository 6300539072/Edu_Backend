const express = require('express');
const { searchContent } = require('../controllers/searchController');

const router = express.Router();

router.get('/search', searchContent);

module.exports = router;
