const Joi = require('joi');
const db = require('../db');
const table_name = 'users';


const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email(),
    google_id: Joi.string().required(),
    img_url: Joi.string().uri({
        scheme: [
            /https/
        ]
    }),
    role_id: Joi.number().integer()
});


module.exports = {
    findByEmail(email) {
        return db(table_name).where('email', email).first();
    },
    insert(user) {
        const result = schema.validate(user);
        if (result.error == null) {
            return db(table_name).insert(user);
        } else {
            return Promise.reject(result.error);
        };
    },
    async update(id, user) {
        const rows = await db(table_name).where('id', id).update(user, '*');
        return rows[0];
    }
}