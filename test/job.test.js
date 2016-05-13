require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Attempt to get /jobs/list when authenticated with header accepts text/html', function () {

  it('return list of jobs with status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { cookie: "token=" + token, accept: 'text/html'},
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });

    });
  });
});

describe('Attempt to get /jobs/list when authenticated and header accepts application/json', function () {

  it('return list of jobs with status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { cookie: "token=" + token, accept: 'application/json'},
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        var payload = JSON.parse(res.payload);
        expect(payload.length).to.equal(2);
        expect(payload[0].active).to.equal(true);
        expect(payload[0].title).to.equal('Node.js Developer');
        server.stop(done);
      });

    });
  });
});

describe('attempt to access /jobs/create without authorization', function () {

  it('redirects to the login page', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "GET",
        url: "/jobs/create"
      };

      server.inject(options, function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302)
        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /jobs/create when authenticated', function () {

  it('return status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/create",
        headers: { cookie: "token=" + token},
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });

    });
  });
});

describe('attempt to create a job without authorization', function () {

  it('redirects to the login page', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "POST",
        url: "/jobs/create"
      };

      server.inject(options, function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302)
        server.stop(done);
      });
    });
  });
});
