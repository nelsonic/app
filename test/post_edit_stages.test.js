var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

var token_client =  JWT.sign({ sid: 4242}, process.env.JWT_SECRET_CLIENT);

describe('edit jobs stages without authentication', function () {

  it('Attempt to edit the jobs stages without authentication', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: 'POST',
        url: '/jobs/stages/edit'
      }
      server.inject(options, function (res) {

        //redirect to the client login page
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-login')
        server.stop(done);
      });
    });
  });
});

describe('edit jobs stages with authentication', function () {

  it('Attempt to edit the jobs stages with authentication', function (done) {

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      expect(err).to.not.exist();

      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: true, idClient: '1'}), function(errRedis, responseRedis){

        var options = {
          method: 'POST',
          url: '/jobs/stages/edit',
          headers: { cookie: "token_client=" + token_client },
          payload: {
            stages: '2',
            jobId: '1'
          }
        }

        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/client-dashboard')
          server.stop(done);
        });
      });
    });
  });
});

describe('edit jobs stages with authentication', function () {

  it('Attempt to edit the jobs stages if stages are undefined', function (done) {

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      expect(err).to.not.exist();

      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: true, idClient: '1'}), function(errRedis, responseRedis){

        var options = {
          method: 'POST',
          url: '/jobs/stages/edit',
          headers: { cookie: "token_client=" + token_client },
          payload: {
            stages: undefined,
            jobId: '1'
          }
        }

        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/client-dashboard')
          server.stop(done);
        });
      });
    });
  });
});

describe('edit jobs stages with authentication', function () {

  it('Attempt to edit the jobs stages, stages are and array of values', function (done) {

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      expect(err).to.not.exist();

      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: true, idClient: '1'}), function(errRedis, responseRedis){

        var options = {
          method: 'POST',
          url: '/jobs/stages/edit',
          headers: { cookie: "token_client=" + token_client },
          payload: {
            stages: ['2', '3'],
            jobId: '1'
          }
        }

        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/client-dashboard')
          server.stop(done);
        });
      });
    });
  });
});
