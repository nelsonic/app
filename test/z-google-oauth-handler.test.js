require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var fs = require('fs');
var nock = require('nock');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/googleauth?code=oauth2codehere', function () {

  it('Try to get a google token with a bad code', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/googleauth?code=oauth2codehere', function (res) {

        expect(res.statusCode).to.equal(200);
        expect(res.payload.indexOf('something went wrong')).to.be.above(-1);
        server.stop(done);
      });
    });
  });
});

//the email is not allowed
describe('Mock /googleauth?code=oauth2codehere', function () {

  it('Get a google token with a right code', function (done) {

    var token_fixture = fs.readFileSync(__dirname + '/fixtures/sample-auth-token.json');

    nock('https://accounts.google.com')
      .persist() // https://github.com/pgte/nock#persist
      .post('/o/oauth2/token')
      .reply(200, token_fixture);

  // see: http://git.io/v4nTR for google plus api url
  // https://www.googleapis.com/plus/v1/people/{userId}
    var sample_profile = require(__dirname + '/fixtures/sample-auth-profile.json');

    nock('https://www.googleapis.com')
      .get('/plus/v1/people/me')
      .reply(200, sample_profile);

    var options = {
      method: "GET",
      url: "/googleauth?code=myrandomtoken"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        //redirect to the home page: /
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

//the email is allowed
describe('Mock /googleauth?code=oauth2codehere', function () {

  it('Get a google token with a right code and the right permission', function (done) {

    var token_fixture = fs.readFileSync(__dirname + '/fixtures/sample-auth-token.json');

    nock('https://accounts.google.com')
      .persist() // https://github.com/pgte/nock#persist
      .post('/o/oauth2/token')
      .reply(200, token_fixture);

  // see: http://git.io/v4nTR for google plus api url
  // https://www.googleapis.com/plus/v1/people/{userId}
    var sample_profile = fs.readFileSync(__dirname + '/fixtures/fake-profile.json');

    nock('https://www.googleapis.com')
      .get('/plus/v1/people/me')
      .reply(200, sample_profile);

    var options = {
      method: "GET",
      url: "/googleauth?code=myrandomtoken"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        //redirect to the home page: /
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});
