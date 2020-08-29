const expres = require('express');
const topics = require('../queries/topics');
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
        const all = await topics.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const all = await topics.getByID(req.params.id);
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
    try {
        const topic = await topics.insert(req.body);
        res.json(topic);
    } catch (error) {
        next(error);
    }
});

router.get('/delete/:id', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
    try {
        const topic = await topics.deleteTopic(req.params.id);
        res.json(topic);
    } catch (error) {
        next(error);
    }
});

router.post('/update/:id', async (req, res, next) => {
    console.log(req.params.id);
    try {
        const topic = await topics.update(req.params.id, req.body);
        res.json(topic);
    } catch (error) {
        next(error);
    }
});

router.get('/category/:id', async (req, res, next) => {
    try {
        const topic = await topics.getByCategoryID(req.params.id);
        res.json(topic);
    } catch (error) {
        next(error);
    }
});

module.exports = router;