require('env2')('.env');
var es = require('../lib/es.js');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

var FormData = require('form-data');
var fs = require('fs');
var streamToPromise = require('stream-to-promise');


describe('/cv/upload without authentication', function () {

  it('attempt to upload a cv without being authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var form = new FormData();
      form.append('idCandidate', '123');
      form.append('selectedCv', fs.createReadStream('./test/fixtures/cv.txt'));

    //see https://github.com/hapijs/hapi/issues/1543 and https://gist.github.com/Couto/127ca8a6bd28ecc4a084
    //How to generate a form payload
    streamToPromise(form).then(function (payload) {
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        var options = {
          method: "POST",
          url: "/cv/upload",
          headers: form.getHeaders(),
          payload: payload,
        };

        server.inject(options, function (res) {
          //redirect to the login page
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/login');
          server.stop(done);
        });
      });
    });
  });
  });





});

describe('/cv/upload cv from the app', function () {

  it('Create a cv from the application', function (done) {

    //mock the upload of the file
    var nock = require('nock');
    nock('https://www.googleapis.com')
      .post('/upload/drive/v3/files?uploadType=multipart')
      .reply(200, {id: 'theIdOfTheFile'});

      var form = new FormData();
      form.append('idCandidate', '123');
      form.append('selectedCv', fs.createReadStream('./test/fixtures/cv.txt'));

    //see https://github.com/hapijs/hapi/issues/1543 and https://gist.github.com/Couto/127ca8a6bd28ecc4a084
    //How to generate a form payload
    streamToPromise(form).then(function (payload) {
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        var options = {
          method: "POST",
          url: "/cv/upload",
          headers: form.getHeaders(),
          payload: payload,
          credentials: { id: "12", "name": "Simon", valid: true}
        };

        server.inject(options, function (res) {
          //redirect to the candidate page
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/candidate/123');
          server.stop(done);
        });
      });


    })


  });
});
