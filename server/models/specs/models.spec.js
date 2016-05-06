import { expect } from 'chai';
const exec = require('child_process').exec;
const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/testdb';

describe('The database', () => {
  before(function(done){
    prepare_db(function(err){
      if (err) {
        clean_db(function(err) {
           console.log('Failed trying to clean up testdb');
        });
        expect(err).to.not.exist;
      }
      //do other setup stuff like launching you server etc
      done();
    });
  });

  after(function(done){
    clean_db(function(err) {
      expect(err).to.not.exist;
    });

    done();
  });

  describe('The database connections', () => {
    const client = new pg.Client(connectionString);

    it('should be able to connect', (done) => {
      client.connect((err) => {
        if (err) {
          expect(err).to.not.exist;
        }

        client.query('SELECT NOW() AS "theTime"', (error, result) => {
          if (error) {
            expect(err).to.not.exist;
          }
          expect(result.rows[0].theTime).to.exist;
          client.end();
          done();
        });
      });
    });
  });
  // needs test for all models, for adding foreign keys, and for controllers
});

/**
 * Creates the testdb from test_schema.sql.
 * @param next - the done callback for mocha
*/
function prepare_db(next){
  exec('createdb testdb -U postgres', function(err){
    if (err !== null) {
      expect(err).to.not.exist;
    }

    exec('psql -d testdb -f ./server/config/schema.sql', function(err){
      if (err !== null) {
        expect(err).to.not.exist;
      }
      next(err);
    });
  });
}

/**
 * Drops the testdb from dropdb.sql.
 * @param next - the done callback for mocha
*/
function clean_db(next){
  exec('psql -U postgres -f ./server/config/droptestdb.sql', function(err){
    if (err !== null) {
      expect(err).to.not.exist;
    }
    next();
  });
}
