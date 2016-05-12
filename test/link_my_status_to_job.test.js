var linkStatusToObj = require('../lib/handlers/gmdashboard/helpers/link_my_status_to_job');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('create an object from candidates who has statusCurrent', function () {

  it('return the object with status', function (done) {

      const candidates = [
        {id: '1',
        fullname: 'Lara Craft',
        picture: 'https://image',
        statusCurrent: [
          {idJob: '12', idStage: '2', idUser: '33', timestamp: '34343'},
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
        '2':[],
        '3':[]
        }
      };
      const myId = '1';

      const result = linkStatusToObj(candidates, jobsObject, myId);
      // expect(result['1']).to.equal(jobsObject['1']);
      // expect(result['1']['1'].statusCurrent[0].idJob).to.equal('12');
      done();
  });
});
