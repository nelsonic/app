var Code = require('code');
var Lab = require('lab');
var getUserByEmail = require('../../lib/database-helpers/elasticsearch/get_user_by_email');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Search by passing email to the gm_users table', function () {

  it('returns user object', function (done) {
    getUserByEmail("mario@bros.com", function(err,  exist) {
      expect(exist.email).to.equal("mario@bros.com");
      expect(exist.names.fullname).to.equal("Mario Bros");
      done();
    });
  });
});

describe('Search by passing email to the gm_users table', function () {

  it('returns undefined if not found', function (done) {
    getUserByEmail("someFakeEmail@bros.com", function(err,  exist) {
      expect(exist).to.equal(undefined);
      done();
    });
  });
});
