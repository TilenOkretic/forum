const Joi = require('joi');
const db = require('../db');
const { insert_into_table_validate } = require('./index');


const table_name = 'category';

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    img_url: Joi.string().allow('').uri({
        scheme: [
            /https?/
        ]
    })
});

module.exports = {
    insert(category) {
        return insert_into_table_validate(table_name, category, schema);
    },
    getByID(id){
        return db(table_name).select().where('id',id).first();
    },
    getAll(){
        return db(table_name).select();
    }

};