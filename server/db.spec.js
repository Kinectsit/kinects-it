import { expect } from 'chai';
const Sequelize = require('sequelize');
const createArticle = require('./controllers/articleController');
const ArticleModel = require('./models/articleModel');

// Sequelize initialization
const sequelize = new Sequelize('kinecttestdb', 'postgres', '', {
  dialect: 'postgres',
});

describe('The database', () => {
  const newArticle = { title: 'Test title', body: 'Test body' };

  beforeEach((done) => {
    sequelize.sync({ logging: console.log, force: true })
      .then(() => { done(); })
      .catch((err) => console.log(err));
  });

  it('should have a new article added from the MODEL', (done) => {
    ArticleModel.create(newArticle)
      .then((res) => {
        expect(res.dataValues.title).to.eql(newArticle.title);
        done();
      })
      .catch((err) => console.log(err));
  });

  it('should have a new article added from the CONTROLLER', (done) => {
    createArticle(newArticle)
      .then((res) => {
        expect(res.dataValues.title).to.eql(newArticle.title);
        done();
      })
      .catch((err) => console.log(err));
  });
});

