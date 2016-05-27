require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var cheerio = require('cheerio');
var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

describe('Attempt to return the list of client users without authorization', function () {

  it('checks status code 302 of /client-users/list', function (done) {

    Server.init(0, function (err, server) {
      expect(err).to.not.exist();
      server.inject('/client-users/list' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Access /client-users/list with authorization', function () {

  it('return client-users page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "GET",
        url: "/client-users/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"},
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        expect($('.client-user-main-content').length).to.equal(2);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to access create client user page without authorization', function () {

  it('checks status code 302 of redirection', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/client-users/create' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Access create client user page with authorization', function () {

  it('checks status code 200', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "GET",
        url: "/client-users/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"},
      };

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});

describe('Attempt to create a client user page without authorization', function () {

  it('checks status code 302 of redirection', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "POST",
        url: "/client-users/save",
      }

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Create a client user page with authorization with property authorized = true', function () {

  it('checks status code 302 of redirection to the client list page', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        idClient: '1',
        email: 'test@testing.com',
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
        expect(res.headers.location).to.equal('/client-users/list')
        server.stop(done);
      });
    });
  });
});

describe('Create a client user page with authorization with property authorized = false', function () {

  it('checks status code 302 of redirection to the client list page', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        idClient: '1',
        email: 'test@testing2.com',
        password: 'password',
        authorized: 'off'
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
        expect(res.headers.location).to.equal('/client-users/list')
        server.stop(done);
      });
    });
  });
});

describe('Update a client user with authorization', function () {

  it('checks status code 302 of redirection to the client list page', function (done) {

    Server.init(0, function (err, server) {

      var payload = {
        idClient: '1',
        email: 'test@testing2.com',
        password: 'password',
        authorized: 'off',
        idClientUser: '123'
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
        expect(res.headers.location).to.equal('/client-users/list')
        server.stop(done);
      });
    });
  });
});

describe('Access the edit client user page without authorization', function () {

  it('checks status code 302', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "GET",
        url: "/client-users/edit/123"
      }

      expect(err).to.not.exist();
      server.inject(options , function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Access the edit client user page with authorization', function () {

  it('checks status code 200', function (done) {

    Server.init(0, function (err, server) {

      var options = {
        method: "GET",
        url: "/client-users/edit/123",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true, scope: "admin"}
      }

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});
