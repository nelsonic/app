var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var JWT = require('jsonwebtoken');
var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
var cheerio = require('cheerio');

describe('Attempt to access /csv-list/list with authorization', function () {

  it('return list of listNames with status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "GET",
        url: "/csv-list/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var lists = $('.label-list p');
        expect(lists.length).to.equal(0);
        server.stop(done);
      });

    });
  });
});

describe('access /csv-list/create with authorization', function () {

  it('return create a list page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/csv-list/create",
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

describe('Attemppt /csv-list/create create a list with wrong csv format column', function () {

  it('Attempt to create a list with the wrong csv format', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      const csvFile = "NameWrong,EmailWrong\nBob,bob@csv.com\nMatt,matt@csv.com";

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "js dev", csvFile: csvFile}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var error = $('.error-csv').text();
        expect(error).to.equal('Sorry wrong format of the file. Is it a csv file? Does it have Name and Email columns?');
        server.stop(done);
      });
    });
  });
});

describe('Attemppt /csv-list/create create a list with wrong file format', function () {

  it('Attempt to create a list with the wrong file format', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      const csvFile = undefined;

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "js dev", csvFile: csvFile}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var error = $('.error-csv').text();
        expect(error).to.equal('Sorry wrong format of the file. Is it a csv file? Does it have Name and Email columns?');
        server.stop(done);
      });
    });
  });
});

describe('create /csv-list/create create a list js dev', function () {

  it('creates a new list and redirect the list of list', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      const csvFile = "Name,Email\nBob,bob@csv.com\nMatt,matt@csv.com";

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "js dev", csvFile: csvFile}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/csv-list/list')
        server.stop(done);
      });
    });
  });
});

describe('access /csv-list/create attempt to recreate the list js dev', function () {

  it('it return the create form without recreating the list', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    setTimeout(function(){

    Server.init(0, function (err, server) {

      const csvFile = "Name,Email\nBob,bob@csv.com\nMatt,matt@csv.com";

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "js dev", csvFile: csvFile}
      };

      //wait for the previous list to be indexed!
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.payload);
          var error = $('.error-csv').text();
          expect(error).to.equal('Sorry the name of the list already exists');
          server.stop(done);
        })
      });
    }, 5000);
  });
});

describe('/csv-list/create Attempt to create the list "list"', function () {

  it('Attempt to create the list "list"', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      const csvFile = "Name,Email\nBob,bob@csv.com\nMatt,matt@csv.com";

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "list", csvFile: csvFile}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var error = $('.error-csv').text();
        expect(error).to.equal('Sorry "list" is a reserved keyword');
        server.stop(done);
      });
    });
  });
});

describe('/csv-list/create Create to create a new list with some already existing candidates', function () {

  it('Create a new list and add the list name to the existing candidates', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
    Server.init(0, function (err, server) {

      const csvFile = "Name,Email\nMaria Dolores,fakecontact12@gmail.com";

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/csv-list/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: {listName: "node dev", csvFile: csvFile}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/csv-list/list')
        server.stop(done);
      });
    });
  });
});

describe('Access /csv-list/list (list not empty)', function () {

  it('return list of list', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    //wait for the node list to be indexed
    setTimeout(function(){
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "GET",
        url: "/csv-list/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var lists = $('.label-list p');
        expect(lists.length).to.be.above(0);
        server.stop(done);
      });

    });
  },5000);
  });
});
