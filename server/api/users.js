const expres = require('express');
const users = require('../queries/users');
const {
    checkAuthHeaderSetUserUnAuthorized,
    isAdmin
} = require('../middlewares');
const {
    log
} = require('debug');


const router = expres.Router();


// router.get('/', async (req, res, next) => {
//     try {
//         const all = await topics.getAll();
//         res.json(all);
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/:id', async (req, res, next) => {
    try {
        const all = await users.getByID(req.params.id);
        res.json(all);
    } catch (error) {
        next(error);
    }
});

module.exports = router;