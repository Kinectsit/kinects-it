/* eslint-disable no-unused-expressions, no-console */
import { expect } from 'chai';
const exec = require('child_process').exec;
const pg = require('pg');
const connectionString = 'postgres://localhost:5432/testdb';

/**
 * Creates the testdb from test_schema.sql.
 * @param next - the done callback for mocha
*/
function prepareDb(next) {
  exec('createdb testdb -U postgres', (err) => {
    if (err !== null) {
      expect(err).to.not.exist;
    }

    exec('psql -d testdb -f ./server/config/schema.sql', (error) => {
      if (error !== null) {
        expect(error).to.not.exist;
      }
      next(err);
    });
  });
}

/**
 * Drops the testdb from dropdb.sql.
 * @param next - the done callback for mocha
*/
function cleanDb(next) {
  exec('psql -f ./server/config/droptestdb.sql', (err) => {
    if (err !== null) {
      expect(err).to.not.exist;
    }
    next();
  });
}

describe('The database', () => {
  before((done) => {
    prepareDb((err) => {
      if (err) {
        cleanDb((error) => {
          console.log('Failed trying to clean up testdb', error);
        });
        expect(err).to.not.exist;
      }
      // do other setup stuff like launching you server etc
      done();
    });
  });

  after((done) => {
    cleanDb((err) => {
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
