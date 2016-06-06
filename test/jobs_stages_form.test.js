require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('jobs stages form', function () {

  it('Attempt to access the stages form of a job without authentication', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/jobs/1/stages', function (res) {

        //redirect to the client login page
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/client-login')
        server.stop(done);
      });
    });
  });
});


describe('Access the stages form of the job 1', function () {

  it('return stages form of the job 1', function (done) {

    var token_client =  JWT.sign({ sid: 4242}, process.env.JWT_SECRET_CLIENT);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      //create the client in redis
      var redisClient = require('redis-connection')();
      //you need to provide idClient to be able to use it on request.auth.credentials.idClient
      redisClient.set(4242, JSON.stringify({email: 'theemail@email.com', authorized: true, idClient: '1'}), function(errRedis, responseRedis){

        var options = {
          method: "GET",
          url: "/jobs/1/stages",
          headers: { cookie: "token_client=" + token_client },
        };

        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(200);

          server.stop(done);
        });

      })

    });
  });
});
