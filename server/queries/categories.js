const Joi = require('joi');
const db = require('../db');
const { insert_into_table_validate } = require('./index');


const table_name = 'category';

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img_url: Joi.string()
});

module.exports = {
    insert(category) {
        return insert_into_table_validate(table_name, category, schema);
    },
    getAll(){
        return db(table_name).select();
    }

};