var Code = require('code');
var Lab = require('lab');
var getUser = require('../../lib/database-helpers/elasticsearch/get_user');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Get user object by passing theId', function () {

  it('returns user object', function (done) {
    getUser("1", function(err,  user) {
      expect(user.id).to.equal("1");
      expect(user.email).to.equal("bob@something.com");
      done();
    });
  });
});

describe('Get user object by passing the not existing Id', function () {

  it('returns user object', function (done) {
    getUser("9090909", function(err,  user) {
      expect(user).to.equal(undefined);
      done();
    });
  });
});
