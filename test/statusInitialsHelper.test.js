var statusInitialsHelper = require('../views/helpers/statusInitialsHelper');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('return intials of the user by matching the user id', function () {

  it('return the intials of the user from fullname', function (done) {

    var users = [{idGoogle: '1', names: {fullname: 'Mario Bros'}}, {idGoogle: '2',names: {fullname: 'Lara Croft'}}];
    var idUser = '2';
    var result = statusInitialsHelper(idUser, users);

    expect(result).to.equal('LC');
    done();
  });
});
