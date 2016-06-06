var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var JWT = require('jsonwebtoken');
var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

describe('/client-login page', function () {

  it('return the login page for the client', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/client-login', function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});

//create a client that we are going to use for testing the login
describe('Create a client user for testing the login client', function () {

  it('checks status code 302 of redirection to the client list page', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        idClient: '1',
        email: 'goodemail@email.com',
        password: 'password',
        authorized: 'on'
      }

      var options = {
        method: "POST",
        url: "/client-users/save",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"},
        payload: payload
      }

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-users/list');

        //wait for the new client to be indexed before going to the next test
        setTimeout(function(){server.stop(done);}, 2000);

      });
    });
  });
});


describe('Login with the client created before', function () {

  it('create a login client', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        email: 'goodemail@email.com',
        password: 'password',
      }

      var options = {
        method: "POST",
        url: "/client-auth",
        payload: payload
      }

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        //redirect to the client-dashboard
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-dashboard')
        server.stop(done);
      });
    });
  });
});

describe('Attempt to login with a wrong email', function () {

  it('wrong email client login', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        email: 'thisisawrongemail@email.com',
        password: 'wrongpassword',
      }

      var options = {
        method: "POST",
        url: "/client-auth",
        payload: payload
      }

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        //display the login page with an error message
        expect(res.statusCode).to.equal(200);
        expect(res.payload.indexOf('Sorry the email or the password is not correct')).to.be.above(-1)
        server.stop(done);
      });
    });
  });
});

describe('Attempt to login with a wrong password', function () {

  it('wrong password client login', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        email: 'goodemail@email.com',
        password: 'wrongpassword',
      }

      var options = {
        method: "POST",
        url: "/client-auth",
        payload: payload
      }

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        //display the login page with an error message
        expect(res.statusCode).to.equal(200);
        expect(res.payload.indexOf('Sorry the email or the password is not correct')).to.be.above(-1)
        server.stop(done);
      });
    });
  });
});
