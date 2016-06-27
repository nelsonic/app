var Code = require('code');
var Lab = require('lab');
var existEmail = require('../../lib/database-helpers/elasticsearch/client_users/exists_email');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Exist email for a client user', function () {

  it('returns true if the email already exists', function (done) {
    //test@gmail.com is defined on fixture-js.json
    existEmail("test2@gmail.com", function(exists) {
      expect(exists).to.equal(true);
      done();
    });
  });

  it('returns false if the email does not exists yet', function (done) {
    existEmail("newemail@testemail.com", function(exists) {
      expect(exists).to.equal(false);
      done();
    });
  });

});
