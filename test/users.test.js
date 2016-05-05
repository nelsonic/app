require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Attempt to return the list of users without authorization', function () {

  it('checks status code 302 of /users/list', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/users/list' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Access /users/list with authorization', function () {

  it('return user list page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/users/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});;

describe('access /users/create with authorization', function () {

  it('return create a user page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/users/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to to access: /users/create without authorization', function () {

  it('checks status code 302', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/users/create' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});
