var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('edit jobs stages without authentication', function () {

  it('Attempt to edit the jobs stages without authentication', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/jobs/stages/edit', function (res) {

        //redirect to the client login page
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-login')
        server.stop(done);
      });
    });
  });
});
