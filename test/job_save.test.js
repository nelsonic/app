require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Attempt to save a job without credentials', function () {

  it('attempt to create a job', function (done) {


    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        payload: job
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Save a new job without sectors and categories', function () {

  it('create a simple object job ', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: newJob
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Save a new job with categories and sectors', function () {

  it('create a new job with categories and sectors', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: jobCatAndSector
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Save a new job with categories and sectors', function () {

  it('update the job 1', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: jobUpdate
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Save a new job with categories and sectors unique values', function () {

  it('update the job 1', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: jobUniqueCatSector
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('Update a job with no client', function () {

  it('update the job 1', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var job = {};

      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: jobClientEmpty
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

var newJob = { title: 'Test job',
  id: '',
  customText3: 'test job sub title',
  client: '1',
  previousClient: '',
  user: '44',
  city: 'London',
  countryId: '2188',
  customText2: 'UK & Ireland',
  employmentType: 'Permanent',
  salary: '',
  payRate: '',
  customText12: 'GBP',
  customText1: 'Junior',
  customText5: '',
  customText6: '',
  customText7: '',
  customText8: '',
  customTextBlock2: '',
  customText11: '',
  customTextBlock1: 'This is the job intro',
  description: '<p>Great job</p>',
  active: 'on'
  };

  var jobCatAndSector = { title: 'Test job 2',
  id: '',
  customText3: 'test job 2 sub title',
  client: '0',
  previousClient: '',
  user: '44',
  city: 'Toulouse',
  countryId: '2188',
  customText2: 'UK & Ireland',
  employmentType: 'Contract',
  salary: '',
  payRate: '',
  customText12: 'GBP',
  customText1: 'Junior',
  skillList: [ 'C', 'C++' ],
  businessSectors: [ '1029442', '1040725' ],
  categories: [ '1209450', '1210105' ],
  customText5: '',
  customText6: '',
  customText7: '',
  customText8: '',
  customTextBlock2: '',
  customText11: '',
  customTextBlock1: '',
  description: '<p>test description</p>' }

  var jobUpdate = { title: 'Test job 2',
  id: '1',
  customText3: 'test job 2 sub title',
  client: '1',
  previousClient: '1',
  user: '44',
  city: 'Toulouse',
  countryId: '2188',
  customText2: 'UK & Ireland',
  employmentType: 'Contract',
  salary: '',
  payRate: '',
  customText12: 'GBP',
  customText1: 'Junior',
  skillList: [ 'C', 'C++' ],
  businessSectors: [ '1029442', '1040725' ],
  categories: [ '1209450', '1210105' ],
  customText5: '',
  customText6: '',
  customText7: '',
  customText8: '',
  customTextBlock2: '',
  customText11: '',
  customTextBlock1: '',
  description: '<p>test description</p>',
  active: 'off'
};

  var jobUniqueCatSector = { title: 'Test job 2',
  id: '1',
  customText3: 'test job 2 sub title',
  client: '1',
  previousClient: '1',
  user: '3',
  city: 'Toulouse',
  countryId: '2188',
  customText2: 'UK & Ireland',
  employmentType: 'Contract',
  salary: '',
  payRate: '',
  customText12: 'GBP',
  customText1: 'Junior',
  skillList: 'C++',
  businessSectors: '1029442',
  categories: '1210105',
  customText5: '',
  customText6: '',
  customText7: '',
  customText8: '',
  customTextBlock2: '',
  customText11: '',
  customTextBlock1: '',
  description: '<p>test description</p>',
  active: 'off'
};

  var jobClientEmpty = { title: 'Test job 2',
  id: '1',
  customText3: 'test job 2 sub title',
  client: '0',
  previousClient: null,
  user: '44',
  city: 'Toulouse',
  countryId: '2188',
  customText2: 'UK & Ireland',
  employmentType: 'Contract',
  salary: '',
  payRate: '',
  customText12: 'GBP',
  customText1: 'Junior',
  skillList: 'C++',
  businessSectors: '1029442',
  categories: '1210105',
  customText5: '',
  customText6: '',
  customText7: '',
  customText8: '',
  customTextBlock2: '',
  customText11: '',
  customTextBlock1: '',
  description: '<p>test description</p>',
  active: 'off'
};
