var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var JWT = require('jsonwebtoken');
var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

describe('/nextStage page', function () {

  it('return the status code 500 without authentication', function (done) {

    var options = {
      method: "POST",
      url: "/nextStage",
      payload: {idCandidate: '100', idJob: '1', currentStage: '1', nextStage: '2'}
    }

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        var parsed = JSON.parse(res.payload);
        expect(parsed.code).to.equal(500);
        server.stop(done);
      });
    });
  });
});

describe('/nextStage page', function () {

  it('return the status code 200 with authentication', function (done) {

    var options = {
      method: "POST",
      url: "/nextStage",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {idCandidate: '100', idJob: '1', currentStage: '2', nextStage: '3'}
    }

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        var parsed = JSON.parse(res.payload);
        console.log(parsed);
        expect(parsed.code).to.equal(200);
        server.stop(done);
      });
    });
  });
});
