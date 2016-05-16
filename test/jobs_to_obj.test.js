var jobsToObj = require('../lib/handlers/dashboard/helpers/jobs_to_object');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('create a job object from jobs array', function () {

  it('return the object with title and salary properties', function (done) {

      const jobs = [{
        id: '1',
        client: '0',
        title: 'Test job 1',
        active: false,
        description: '<p>test description</p>',

        salary: '',
        payRate: '',
        customText12: 'GBP',
        owner: { id: '1', firstName: 'Mario', lastName: 'Bros', initials: 'MB' },
        source: '',
        employmentType: 'Contract'
      },{
        id: '2',
        client: '0',
        title: 'Test job 2',
        active: false,
        description: '<p>test description</p>',

        salary: '',
        payRate: '',
        customText12: 'GBP',
        owner: { id: '1', firstName: 'Mario', lastName: 'Bros', initials: 'MB' },
        source: '',
        employmentType: 'Temporary'
      }];

      const result = jobsToObj(jobs);
      expect(result['1'].title).to.equal('Test job 1');
      done();
  });
});
