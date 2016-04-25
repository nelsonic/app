// var Code = require('code');
// var Lab = require('lab');
// var getUser = require('../../lib/database-helpers/elasticsearch/get_user');
//
// var lab = exports.lab = Lab.script();
// var describe = lab.experiment;
// var expect = Code.expect;
// var it = lab.test;
//
//
// describe('Get the user by passing an id', function () {
//
//   it('returns the user corresponding to the id', function (done) {
//     getUser("12", function(err,  user) {
//       expect(user.names.linkedinName).to.equal("Mario Bros");
//       done();
//     });
//   });
// });
//
// describe('return undefined if the id of a user do not match a profile ', function () {
//
//   it('The value of the user is undefined if the id doesnt match a profile', function (done) {
//     getUser("hsdhhfskdjh", function(err,  user) {
//       expect(user).to.equal(undefined);
//       done();
//     });
//   });
// });
