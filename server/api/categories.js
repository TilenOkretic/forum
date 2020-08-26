const expres = require('express');
const categories = require('../queries/categories');
const {
    checkAuthHeaderSetUserUnAuthorized,
    isAdmin
} = require('../middlewares');


const router = expres.Router();


router.get('/', async (req, res, next) => {
    try {
        const all = await categories.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, isAdmin, async (req, res, next) => {
    try {
        const category = await categories.insert(req.body);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

module.exports = router;