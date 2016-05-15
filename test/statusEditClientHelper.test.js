var statusEditClient = require('../views/helpers/statusEditClient');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Pass the clients and client id', function () {

  it('return the option with the name of the client and current client id', function (done) {

    var clients = {id: '1', name: 'DWYL'};
    var clientId = '2';
    var result = statusEditClient(clients, clientId);

    expect(result.string).to.equal('<option value=1>DWYL</option>');
    done();
  });
});

describe('Pass the clients and client id', function () {

  it('return the option with the name of the client and client id', function (done) {

    var clients = {id: '1', name: 'DWYL'};
    var clientId = '1';
    var result = statusEditClient(clients, clientId);

    expect(result.string).to.equal('<option selected value=1>DWYL</option>');
    done();
  });
});
