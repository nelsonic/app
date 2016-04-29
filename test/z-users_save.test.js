require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
// var cheerio = require('cheerio');

describe('Attempt to return the user save page without authorization', function () {

  it('checks status code 302 of /users/save', function (done) {

    var options = {
      method: "POST",
      url: "/users/save"
    }

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('save/update a user: /users/save with authorization', function () {

  it('redirect to users/list after updating user with active on and admin on', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/users/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true, scope: 'admin'},
      payload: {
        names: {
          fullname: 'Bob Fake',
          firstname: 'Bob',
          lastname: 'Fake',
          linkedinName: 'Bon Fake'
        },
        linkedin: 'https://linkedin.com/bob',
        phones: {
          office: '0203 555 555',
          mobile: '022 888 888'
        },
        email: 'bob@something.com',
        role: 'Director',
        active: 'on',
        admin: 'on'
      }
    };

    Server.init(0, function (err, server) {

      server.inject(options , function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('save/update a user: /users/save with authorization', function () {

  it('redirect to users/list after updating user with active: off and admin off', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/users/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true, scope: 'admin'},
      payload: {
        names: {
          fullname: 'Bob Fake',
          firstname: 'Bob',
          lastname: 'Fake',
          linkedinName: 'Bon Fake'
        },
        linkedin: 'https://linkedin.com/bob',
        phones: {
          office: '0203 555 555',
          mobile: '022 888 888'
        },
        email: 'bob@something.com',
        role: 'Director',
        active: 'off',
        admin: 'off'
      }
    };

    Server.init(0, function (err, server) {

      server.inject(options , function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('update a user with existing id: /users/save with authorization', function () {

  it('redirect to users/list after updating user', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/users/save",
      headers: { cookie: "token=" + token },
      credentials: { id: '12', "name": "Simon", valid: true, scope: 'admin'},
      payload: {
        id:'5',
        idGoogle: '123',
        names: {
          fullname: 'Bob Fake',
          firstname: 'Bob',
          lastname: 'Fake',
          linkedinName: 'Bon Fake'
        },
        linkedin: 'https://linkedin.com/bob',
        phones: {
          office: '0203 555 555',
          mobile: '022 888 888'
        },
        email: 'bob@something.com',
        role: 'Director',
        active: 'off',
        admin: 'off'
      }
    };

    Server.init(0, function (err, server) {

      server.inject(options , function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('update a user with existing id: /users/save with authorization with admin on', function () {

  it('redirect to users/list after updating user with admin on', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/users/save",
      headers: { cookie: "token=" + token },
      credentials: { id: '12', "name": "Simon", valid: true, scope: 'admin'},
      payload: {
        id:'1',
        idGoogle: '12',
        names: {
          fullname: 'Bob Fake',
          firstname: 'Bob',
          lastname: 'Fake',
          linkedinName: 'Bon Fake'
        },
        linkedin: 'https://linkedin.com/bob',
        phones: {
          office: '0203 555 555',
          mobile: '022 888 888'
        },
        email: 'bob@something.com',
        role: 'Director',
        active: 'off',
        admin: 'on'
      }
    };

    Server.init(0, function (err, server) {

      server.inject(options , function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});
