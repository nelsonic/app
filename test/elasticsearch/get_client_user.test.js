var Code = require('code');
var Lab = require('lab');
var getUser = require('../../lib/database-helpers/elasticsearch/client_users/get_client_user');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Get cient user object by passing theId', function () {

  it('returns client user object', function (done) {
    getUser("123", function(err,  clientUser) {
      expect(clientUser.id).to.equal("123");
      expect(clientUser.email).to.equal("test@testing2.com");
      done();
    });
  });
});

describe('Get client user object by passing the not existing Id', function () {

  it('returns undefined', function (done) {
    getUser("9090909", function(err,  user) {
      expect(user).to.equal(undefined);
      done();
    });
  });
});
