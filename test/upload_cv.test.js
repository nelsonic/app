require('env2')('.env');
var es = require('../lib/es.js');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('it is a fake test', function () {

  // var streamToPromise = require('stream-to-promise');

  it('return ok', function(done){
    expect(true).to.equal(true);
    done();
  })
})

describe('/cv/upload without authentication', function () {

  it('attempt to upload a cv without being authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      const multipartPayload =
              '--AaB03x\r\n' +
              'content-disposition: form-data; name="idCandidate"\r\n' +
              '\r\n' +
              '123\r\n' +
              '--AaB03x\r\n' +
              'content-disposition: form-data; name="selectedCv"; filename="file1.txt"\r\n' +
              'Content-Type: text/plain\r\n' +
              '\r\n' +
              '... contents of file1.txt ...\r\r\n' +
              '--AaB03x--\r\n';


    //see https://github.com/hapijs/hapi/issues/1543 and https://gist.github.com/Couto/127ca8a6bd28ecc4a084
    //How to generate a form payload
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

          var options = {
            method: "POST",
            url: "/cv/upload",
            headers: { 'content-type': 'multipart/form-data; boundary=AaB03x' },
            payload: multipartPayload,
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

describe('/cv/upload cv from the app', function () {

  it('Create a cv from the application', function (done) {

    //mock the upload of the file
    var nock = require('nock');
    nock('https://www.googleapis.com')
      .post('/upload/drive/v3/files?uploadType=multipart')
      .reply(200, {id: 'theIdOfTheFile'});

    const multipartPayload =
            '--AaB03x\r\n' +
            'content-disposition: form-data; name="idCandidate"\r\n' +
            '\r\n' +
            '123\r\n' +
            '--AaB03x\r\n' +
            'content-disposition: form-data; name="selectedCv"; filename="file1.txt"\r\n' +
            'Content-Type: text/plain\r\n' +
            '\r\n' +
            '... contents of file1.txt ...\r\r\n' +
            '--AaB03x--\r\n';


    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/cv/upload",
        headers: { 'content-type': 'multipart/form-data; boundary=AaB03x' },
        payload: multipartPayload,
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      server.inject(options, function (res) {
        //redirect to the candidate page
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/candidate/123');
        server.stop(done);
      });
    });
  });
});
