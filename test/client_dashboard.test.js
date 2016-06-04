require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/client-dashboard', function () {

  it('Attempt to access the client dashboard without authentication', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/client-dashboard', function (res) {

        //redirect to the client login page
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-login')
        server.stop(done);
      });
    });
  });
});

describe('Access /client-dashboard with authorization', function () {

  it('return dashboard for the client', function (done) {

    var token_client =  JWT.sign({ sid: 4242}, process.env.JWT_SECRET_CLIENT);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      //create the client in redis
      var redisClient = require('redis-connection')();
      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: true}), function(errRedis, responseRedis){

        var options = {
          method: "GET",
          url: "/client-dashboard",
          headers: { cookie: "token_client=" + token_client },
          credentials: {idClient: '1'}
        };

        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(200);

          server.stop(done);
        });

      })

    });
  });
});

describe('Access /client-dashboard with authorization to false', function () {

  it('return to the login page', function (done) {

    var token_client =  JWT.sign({ sid: 4242}, process.env.JWT_SECRET_CLIENT);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      //create the client in redis
      var redisClient = require('redis-connection')();
      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: false}), function(errRedis, responseRedis){

        var options = {
          method: "GET",
          url: "/client-dashboard",
          headers: { cookie: "token_client=" + token_client },
        };

        server.inject(options, function (res) {
          //redirec to the login page
          expect(res.statusCode).to.equal(302);

          server.stop(done);
        });

      })

    });
  });
});

describe('Access /client-dashboard without client found in redis', function () {

  it('Redirect to the login page', function (done) {

    var token_client =  JWT.sign({ sid: 424233333}, process.env.JWT_SECRET_CLIENT);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      //create the client in redis
      var redisClient = require('redis-connection')();

        var options = {
          method: "GET",
          url: "/client-dashboard",
          headers: { cookie: "token_client=" + token_client },
        };

        server.inject(options, function (res) {
          //redirect to the login page
          expect(res.statusCode).to.equal(302);

          server.stop(done);
        });


    });
  });
});
