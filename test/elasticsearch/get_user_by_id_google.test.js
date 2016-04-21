var Code = require('code');
var Lab = require('lab');
var getUserByIdGoogle = require('../../lib/database-helpers/elasticsearch/get_user_by_id_google');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Get user object by passing the Google Id', function () {

  it('returns user object', function (done) {
    getUserByIdGoogle("1", function(err,  user) {
      expect(user.idGoogle).to.equal("1");
      expect(user.email).to.equal("mario@bros.com");
      done();
    });
  });
});

describe('Get user object by passing the Google Id', function () {

  it('returns undefined when user object is not found', function (done) {
    getUserByIdGoogle("4444", function(err,  user) {
      expect(user).to.equal(undefined);
      done();
    });
  });
});
