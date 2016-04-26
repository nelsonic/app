var Code = require('code');
var Lab = require('lab');
var updateUser = require('../../lib/database-helpers/elasticsearch/update_user');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Update user object by passing the Id', function () {

  it('returns updated object, version number 2', function (done) {
    updateUser("1", {email: 'newemail', linkedin: 'new link'}, function(err,  res) {
      expect(res._version).to.be.above(2);
      done();
    });
  });
});
