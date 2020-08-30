const express = require('express');
const router = express.Router();

const categories = require('./categories');
const topics = require('./topics');
const topic_replies = require('./topic_replies');
const users = require('./users');

router.use('/categories', categories);
router.use('/topics', topics);
router.use('/topic_replies', topic_replies);
router.use('/users', users);

module.exports = router;