var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Access /analytics when not authenticated', function () {

  it('redirect not authenticated user to the login page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/analytics', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

var token =  JWT.sign({ id: '12', "name": "Simon", valid: true, "firstname": "Simon"}, process.env.JWT_SECRET);

describe('access analytics, when user is authenticated', function () {
  it('returns status code 200', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/analytics', headers: { cookie: "token=" + token }, credentials: { id: "12", "name": "Simon", valid: true}}, function (res) {
        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});
