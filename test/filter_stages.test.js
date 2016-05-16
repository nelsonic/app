var filterStages = require('../lib/handlers/dashboard/helpers/filter_stages');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('filter stages on jobs array', function () {

  it('return the object with stages', function (done) {

      const jobs = {
      '1': {
        '1': [{fullname: 'Maria'}]
      }
      };

      const result = filterStages(jobs);
      expect(result['1']['1'][0].fullname).to.equal('Maria');
      done();
  });
});

describe('filter stages on jobs array', function () {

  it('return the empty object if stages are empty', function (done) {

      const jobs = {
      '1': {
        '1': []
      }
      };

      const result = filterStages(jobs);
      expect(result['1']).to.be.empty();
      done();
  });
});
