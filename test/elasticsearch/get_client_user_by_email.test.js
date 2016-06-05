var Code = require('code');
var Lab = require('lab');
var getUserByEmail = require('../../lib/database-helpers/elasticsearch/client_users/get_user_by_email');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Get the client user by email', function () {

  it('return the client user', function (done) {
    //test@gmail.com is defined on fixture-js.json
    getUserByEmail("test2@gmail.com", function(error, user) {
      expect(user.id).to.equal("1234");
      expect(user.idClient).to.equal("16767");
      expect(user.password).to.equal("123455");
      done();
    });
  });

  it('return null if no client user has been found', function (done) {
    //test@gmail.com is defined on fixture-js.json
    getUserByEmail("verywrongemail@wrong.com", function(error, user) {
      expect(user).to.equal(null);
      done();
    });
  });
})
