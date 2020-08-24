const enviroment = process.env.NODE_ENV || 'development';
const knex_config = require('../knexfile');
const enviroment_config = knex_config[enviroment];
const knex = require('knex');

const connection = knex(enviroment_config);


module.exports = connection;