var Code = require('code');
var Lab = require('lab');
var existEmailUsers = require('../../lib/database-helpers/elasticsearch/exist_email_users');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Search by passing email to the gm_users table', function () {

  it('returns true if found the email on gm_users', function (done) {
    existEmailUsers("mario@bros.com", function(err,  exist) {
      expect(exist).to.equal(true);
      done();
    });
  });
});

describe('Search by passing email to the gm_users table', function () {

  it('returns false if email not found on gm_users', function (done) {
    existEmailUsers("fake@mail.com", function(err,  exist) {
      expect(exist).to.equal(false);
      done();
    });
  });
});
