var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('../models/User');
var userController = require ('./userController')


var dbURI = 'mongodb://localhost/jobquery';

// The `clearDB` helper function, when invoked, will clear the database
var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {

  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach(function (done) {
    clearDB(function () {
      var users = [
        {
          name: 'Magee',
          email: 'magee@magee.com'
        },
        {
          name: 'Dan',
          email: 'dan@dan.com'
        },
        {
          name: 'Beth',
          email: 'beth@beth.com'
        },
        {
          name: 'Sunny',
          email: 'sunny@sunny.com'
        },
        {
          name: 'Zach',
          email: 'zach@zach.com'
        }
      ];

      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      User.create(users, done);
    });
  });

  it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
    // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
    // HINT: The `done` passed in is quite important...
    userController.getUserByName ('Beth', (user) => {
      expect(user.name).to.equal('Beth');
      expect(user.email).to.equal('beth@beth.com');
      done();
    })
  });

  it('should have a method that given the name of a user, updates their `email` property', function (done) {
    // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
    // HINT: The `done` passed in is quite important...
    userController.updateEmailByName ('Zach', 'zach2@zach.com', (user) => {
      expect(user.email).to.equal('zach2@zach.com');
      done();
    });
  });

  it('should have a method that reads all users from the database at once', function (done) {
    // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
    // HINT: The `done` passed in is quite important...
    userController.readAllUsers ((users) => {
      expect (users[0].name).to.equal('Magee');
      expect (users[0].email).to.equal('magee@magee.com');
      expect (users[3].name).to.equal('Sunny');
      expect (users[3].email).to.equal('sunny@sunny.com');
      done();
    });
  });

});
