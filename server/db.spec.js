import { expect } from 'chai';
const User = require('./models/userModel');
const UserController = require('./controllers/userController');

describe('Users', () => {
  const newUser = { name: 'Jon', isHost: 'true' };
  const newUserTwo = { name: 'Arya', isHost: 'true' };

  beforeEach((done) => {
    User.sync({ force: true })
      .then(() => { done(); })
      .catch((err) => { console.log(err); });
  });

  it('should be created from the model', (done) => {
    User.create(newUser)
      .then((res) => {
        expect(res.dataValues.name).to.equal(newUser.name);
        done();
      })
      .catch((err) => console.log(err));
  });

  it('should be created from the controller', (done) => {
    UserController.signIn(newUserTwo, (err, res) => {
      expect(res.dataValues.name).to.equal(newUserTwo.name);
    });
    done();
  });
});

