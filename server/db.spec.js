import { expect } from 'chai';
const User = require('./models/userModel');

describe('Users', () => {
  const newUser = { name: 'Jon', isHost: 'true' };

  beforeEach((done) => {
    User.sync({ logging: console.log, force: true })
      .then(() => { done(); })
      .catch((err) => console.log(err));
  });

  it('should be created from the model', (done) => {
    User.create(newUser)
      .then((res) => {
        expect(res.dataValues.title).to.eql(newUser.title);
        done();
      })
      .catch((err) => console.log(err));
  });
});

