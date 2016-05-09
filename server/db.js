// const pg = require('pg');
// const pgp = require('pg-promise')();

exports.connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/kinectdb';

// export const db = pgp(connectionString);
// exports.client = new pg.Client(connectionString);
