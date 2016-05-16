var linkStatusToObj = require('../lib/handlers/dashboard/helpers/link_my_status_to_job');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('link the status to the job object', function () {

  it('return the object with status', function (done) {

      const candidates = [
        {id: '1',
        fullname: 'Lara Craft',
        picture: 'https://image',
        statusCurrent: [
          {idJob: '12', idStage: '1', idUser: '1', timestamp: '34343'},
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
        '1':[],
        '2':[]
        }
      };
      const myId = '1';

      const result = linkStatusToObj(candidates, jobsObject, myId);
      expect(result['12']['1'][0].fullname).to.equal('Lara Craft');
      done();
  });
});

describe('link status to job object', function () {

  it('return the object even if the idJob is not in job object', function (done) {

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

      const jobsObject = {'1': {
        '1':[],
        '2':[]
        }
      };
      const myId = '1';

      const result = linkStatusToObj(candidates, jobsObject, myId);
      expect(result['1']['1']).to.be.an.array();
      done();
  });
});
