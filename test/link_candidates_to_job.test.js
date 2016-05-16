var linkCandidatesToJob = require('../lib/handlers/dashboard/helpers/link_candidates_to_job');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('link candidates who has status to the job object', function () {

  it('return the object with the candidate who has status', function (done) {

      const candidates = [
        {id: '1',
        fullname: 'Lara Craft',
        picture: 'https://image',
        statusCurrent: [
          {idJob: '12', idStage: '2', idUser: '1', timestamp: '34343'},
          {idJob: '10', idStage: '3', idUser: '44', timestamp: '454545'}
        ]},
        {id: '2',
        fullname: 'Mario Bros',
        picture: 'https://image2',
        statusCurrent: [
          {idJob: '1', idStage: '2', idUser: '55', timestamp: '34343'},
          {idJob: '10', idStage: '3', idUser: '66', timestamp: '454545'}
        ]}
      ];

      const jobsObject = {'12': {
        '2':[]
        }
      };

      const result = linkCandidatesToJob(candidates, jobsObject);
      expect(result['12']['2'][0].fullname).to.equal('Lara Craft');
      done();
  });
});
