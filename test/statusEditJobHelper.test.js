var statusEditJob = require('../views/helpers/statusEditJob');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Pass the jobs and job id', function () {

  it('return the option with the name of the job and current job id', function (done) {

    var jobs = {id: '1', title: 'some job'};
    var jobId = '2';
    var result = statusEditJob(jobs, jobId);

    expect(result.string).to.equal('<option value=1>some job</option>');
    done();
  });
});

describe('Pass the jobs and job id', function () {

  it('return the option with the title of the job and job id', function (done) {

    var jobs = {id: '1', title: 'some job'};
    var jobId = '1';
    var result = statusEditJob(jobs, jobId);

    expect(result.string).to.equal('<option selected value=1>some job</option>');
    done();
  });
});
