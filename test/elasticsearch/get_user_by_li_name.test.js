var Code = require('code');
var Lab = require('lab');
var getUsersByName = require('../../lib/database-helpers/elasticsearch/get_user_by_li_name');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Get the user with the matching name', function () {

  it('returns the user name with matching name', function (done) {
    var name = 'Mario Bros';
    getUsersByName(name, function(err,  user) {
      expect(user.names.linkedinName).to.equal(name);
      expect(user.role).to.equal("Developer Test")
      done();
    });
  });
});

describe('Attempt to get the user with the matching name', function () {

  it('returns undefined if user name doesnt match with the name', function (done) {
    var name = 'Ann Marie';
    getUsersByName(name, function(err,  user) {
      expect(user).to.equal(undefined);
      done();
    });
  });
});

describe('Attempt to get the user with the undefined name', function () {

  it('returns undefined if user name is undefined', function (done) {
    var name;
    getUsersByName(name, function(err,  user) {
      expect(user).to.equal(undefined);
      done();
    });
  });
});
