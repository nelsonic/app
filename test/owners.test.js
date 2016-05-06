require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/owners/list json format', function () {

  it('return list of owners in json format', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/owners/list",
        headers: { accept: 'application/json' }
      };


      server.inject(options, function (res) {
        var owners = JSON.parse(res.payload)
        expect(owners.length).to.be.above(2);
        server.stop(done);
      });
    });
  });
});
