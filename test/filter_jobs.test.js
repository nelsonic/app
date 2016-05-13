var filterJobs = require('../lib/handlers/gmdashboard/helpers/filter_jobs');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('filter jobs object', function () {

  it('return the jobs object with non empty status', function (done) {

      const jobs = {
      '1': {
        '1': [],
        '2': []
      },
      '2': {
        '1': [{id: '33'}],
        '2': []
      }
      };

      const result = filterJobs(jobs);
      expect(result.hasOwnProperty('1')).to.equal(false);
      expect(result.hasOwnProperty('2')).to.equal(true);
      done();
  });
});
