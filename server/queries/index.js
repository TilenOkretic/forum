const Joi = require('joi');
const db = require('../db');

async function insert_into_table_validate(table_name, item, schema) {
    const result = schema.validate(item);
    if (result.error == null) {
        const rows = await db(table_name).insert(item, '*');
        return rows[0];
    } else {
        return Promise.reject(result.error);
    };
}

module.exports = {
    insert_into_table_validate
};