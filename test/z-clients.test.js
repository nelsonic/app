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

describe('Attempt to return the list of clients without authorization', function () {

  it('checks status code 302 of /clients/list', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/clients/list' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /clients/list with authorization', function () {

  it('return list of clients with status code 200 and return number of clients', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/clients/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.payload);
          var clients = $('ul');       
          expect(clients.length).to.equal(2);
          server.stop(done);
        });
      });
    });
  });
});

describe('access /clients/create with authorization', function () {

  it('return create a client page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/clients/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to to access: /clients/create without authorization', function () {

  it('checks status code 302', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/clients/create' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Return the first client: /clients/0', function () {

  it('checks status code 200 of /clients/0', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/clients/0",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      server.inject(options, function(res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to save/update a client: /clients/0 without authorization', function () {

  it('checks status code 302 of /clients/0', function (done) {

     var options = {
      method: "GET",
      url: "/clients/0"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('save/update a client: /clients/save with authorization', function () {

  it('redirect to clients/list after updating client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/clients/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: { 
        name: 'FAC',
        possibleNames: 'Founders And Coders, Founders & Coders',
        accountManager: 2,
        terms: 18,
        contactName: 'Bob',
        contactEmail: 'bob@gmail.com',
        contactPhone: '000001',
        createdAt: '1457704721910',
        active: 'off',
        id: '0' 
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

describe('create a client: /clients/save with authorization', function () {

  it('redirect to clients/list after creating client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/clients/save",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: { 
        name: 'FAC',
        possibleNames: 'Founders And Coders, Founders & Coders',
        accountManager: 2,
        terms: 18,
        contactName: 'Bob',
        contactEmail: 'bob@gmail.com',
        contactPhone: '000001',
        active: 'on'
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

describe('Attempt to update a client: /clients/save without authorization', function () {

  it('checks status code 302 of /clients/save', function (done) {

     var options = {
      method: "POST",
      url: "/clients/save"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});
