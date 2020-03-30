const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'graph'
});

pool.connect()
    .then(db => console.log('connected to database PostgreSql'))
    .catch(err => console.error(err));

module.exports = pool;