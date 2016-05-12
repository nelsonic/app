var createOptionUser = require('../views/helpers/createOptionUser');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('create option tag for user', function () {

  it('return the option selected with the value of the idGoogle and user firstname', function (done) {

    var user = {idGoogle: '1', names: { firstname: 'Anita'}};
    var userId = '1';
    var result = createOptionUser(user, userId);

    expect(result.string).to.equal('<option value="1" selected>Anita</option>');
    done();
  });
});

describe('create option tag for user', function () {

  it('return the option with the value of the idGoogle and user firstname', function (done) {

    var user = {idGoogle: '1', names: { firstname: 'Anita'}};
    var userId = '2';
    var result = createOptionUser(user, userId);

    expect(result.string).to.equal('<option value="1">Anita</option>');
    done();
  });
});
