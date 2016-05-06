const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/kinectdb';

exports.client = new pg.Client(connectionString);
