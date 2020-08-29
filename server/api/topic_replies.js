// TODO: MAKE TOPIC REPLYS

const expres = require('express');
const topics = require('../queries/topics');
const topic_replies = require('../queries/topic_replies');
const {
    checkAuthHeaderSetUserUnAuthorized,
    isAdmin
} = require('../middlewares');
const {
    log
} = require('debug');


const router = expres.Router();


router.get('/', async (req, res, next) => {
    try {
        const all = await topic_replies.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const all = await topic_replies.insert(req.body);
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const all = await topic_replies.getByTopicID(req.params.id);
        res.json(all);
    } catch (error) {
        next(error);
    }
});

module.exports = router;