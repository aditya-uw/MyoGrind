// database.js
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg', // PostgreSQL client
  connection: {
    host: 'your-database-host', // e.g., AWS RDS endpoint
    user: 'your-database-user',
    password: 'your-database-password',
    database: 'your-database-name'
  }
});

module.exports = knex;
