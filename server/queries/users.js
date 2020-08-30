const Joi = require('joi');
const db = require('../db');
const { insert_into_table_validate } = require('./index');
const joi = require('joi');

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
    async findAdmins(){
        return db(table_name).where('role_id', 1);
    },
    getByID(id){
        return db(table_name).where('id', id).first();
    },
    findByEmail(email) {
        return db(table_name).where('email', email).first();
    },
    insert(user) {
        return insert_into_table_validate(table_name, user, schema);
    },
    async update(id, user) {
        const rows = await db(table_name).where('id', id).update(user, '*');
        return rows[0];
    }
}