var Code = require('code');
var Lab = require('lab');
var existActiveUsers = require('../../lib/database-helpers/elasticsearch/exist_active_users');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Search by passing email to the gm_users table', function () {

  it('returns false if email not found on gm_users', function (done) {
    existActiveUsers("fake@mail.com", function(err,  exist) {
      expect(exist).to.equal(false);
      done();
    });
  });
});

describe('Search by passing email to the gm_users table', function () {

  it('returns false: found user but active is false', function (done) {
    existActiveUsers("simonFake@bros.com", function(err,  exist) {
      expect(exist).to.equal(false);
      done();
    });
  });
});

describe('Search by passing email to the gm_users table', function () {

  it('returns true if found the email on gm_users and property active is true', function (done) {
    existActiveUsers("real@user.com", function(err,  exist) {
      expect(exist).to.equal(true);
      done();
    });
  });
});
