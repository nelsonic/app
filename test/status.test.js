require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


var token =  JWT.sign({ id: "12", "name": "Simon", valid: true}, process.env.JWT_SECRET);
describe('/status/save', function () {

  it('attempt to submit status without being authenticated', function (done) {

    var options = {
      method: "POST",
      url: "/status/save"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the status when authenticated', function () {

  it('redirects to the candidate page with new status is created', function (done) {

    var status = {
      idCandidate: '88',
      idUser: '12',
      idJob: '1',
      idStage: '1',
      timestamp: '89898989',
      idClient: '1'
    };

    var options = {
      method: "POST",
      url: "/status/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: status
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit a wrong status', function () {

  it('redirects to the candidate page when the status object is not valid', function (done) {

    var wrongStatus = {
    };

    var options = {
      method: "POST",
      url: "/status/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: wrongStatus
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});


describe('/status/edit', function () {

  it('attempt to edit status without being authenticated', function (done) {

    var options = {
      method: "POST",
      url: "/status/edit"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('edit the status when authenticated', function () {

  it('redirects to the candidate page with new edited status', function (done) {

    var status = {
      idCandidate: '88',
      timestamp: '89898989',
      idJob: '1',
      idStage: '1',
      idClient: '1',
      idUser: '12'
    };

    var options = {
      method: "POST",
      url: "/status/edit",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: status
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('/status/delete', function () {

  it('attempt to delete status without being authenticated', function (done) {

    var options = {
      method: "POST",
      url: "/status/delete"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('delete the status when authenticated', function () {

  it('redirects to the candidate page with new status is deleted', function (done) {

    var status = {
      idCandidate: '88',
      timestamp: '89898989'
    };

    var options = {
      method: "POST",
      url: "/status/delete",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: status
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('delete the status when authenticated', function () {

  it('redirects to the candidate page with new status is deleted', function (done) {

    var status = {
      idCandidate: '88',
      timestamp: '89898989',
      redirectDashboard: true
    };

    var options = {
      method: "POST",
      url: "/status/delete",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: status
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});
