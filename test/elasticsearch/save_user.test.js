'use strict';

var Code = require('code');
var Lab = require('lab');
var saveUser = require('../../lib/database-helpers/elasticsearch/save_user');
var getUser = require('../../lib/database-helpers/elasticsearch/get_user');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

const userObj = {
  names: {
    fullname: 'Toby Test',
    firstname: 'Toby',
    lastname: 'Test',
    linkedinName: 'Toby Test'
  },
  linkedin: 'https://linkedin.com/toby',
  phones: {
    office: '0203 555 555',
    mobile: '022 888 888'
  },
  email: 'toby@something.com',
  role: 'Director',
  active: true,
  admin: true
};

describe('Create a user', function () {

  it('returns user object', function (done) {
    saveUser(userObj, function(err,  response) {
      expect(response.created).to.equal(true);
      getUser(response._id, function (errUser, user) {
        expect(user.names.fullname).to.equal('Toby Test');
        expect(user.names.firstname).to.equal('Toby');
        done();
      });
    });
  });
});
