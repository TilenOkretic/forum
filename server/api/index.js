const express = require('express');
const router = express.Router();

const categories = require('./categories');
const topics = require('./topics');
const topic_replies = require('./topic_replies');

router.use('/categories', categories);
router.use('/topics', topics);
router.use('/topic_replies', topic_replies);

module.exports = router;