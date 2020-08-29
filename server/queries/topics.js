const Joi = require('joi');
const db = require('../db');
const { insert_into_table_validate } = require('./index');
const { table } = require('../db');


const table_name = 'topic';

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category_id: Joi.number().required(),
    user_id: Joi.number().required()
});

module.exports = {
    getAll(){
        return db(table_name).select();
    },
    getByID(id){
        return db(table_name).where('id', id);
    },
    getByCategoryID(id){
        return db(table_name).where('category_id', id);
    },
    deleteTopic(topic_id){
        return db(table_name).where('id', topic_id).del();
    },
    insert(category) {
        return insert_into_table_validate(table_name, category, schema);
    },
    async update(id, updated_topic) {
        const rows = await db(table_name).where('id', id).update(updated_topic, '*');
        return rows[0];
    }
};