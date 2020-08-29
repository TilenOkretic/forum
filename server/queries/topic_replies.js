const Joi = require('joi');
const db = require('../db');
const { insert_into_table_validate } = require('./index');
const { table } = require('../db');


const table_name = 'topic reply';

const schema = Joi.object().keys({
    description: Joi.string().required(),
    topic_id: Joi.number().required(),
    user_id: Joi.number().required()
});

module.exports = {
    getAll(){
        return db(table_name).select();
    },
    getByTopicID(id){
        return db(table_name).where('topic_id', id);
    },
    deleteTopic(topic_id){
        return db(table_name).where('id', topic_id).del();
    },
    insert(topic_reply) {
        return insert_into_table_validate(table_name, topic_reply, schema);
    },
    // async update(id, updated_topic) {
    //     const rows = await db(table_name).where('id', id).update(updated_topic, '*');
    //     return rows[0];
    // }
};