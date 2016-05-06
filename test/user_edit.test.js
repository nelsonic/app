require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Attempt to return the update/edit view user page without authorization', function () {

  it('checks status code 302 of /users/edit/1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/users/edit/1' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /users/edit/1 with authorization', function () {

  it('return form for edit user ', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/users/edit/1",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: 'admin'}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /users/edit/12 with authorization, this user as Admin=true', function () {

  it('return form for edit user ', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/users/edit/12",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: 'admin'}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});
