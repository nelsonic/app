'use strict';

require('env2')('.env');
const Code = require('code');
const Lab = require('lab');
const editStatus = require('../../lib/database-helpers/elasticsearch/edit_status');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const es = require('../../lib/es.js');

const candidateStatus = {
  fullname: "Candidate update status test",
  statusCurrent: [
    {
      idCandidate: '101',
      idUser: '12',
      idStage: '1',
      idClient: '1',
      timestamp: '123456789'
    },
    {
      idCandidate: '101',
      idUser: '12',
      idStage: '2',
      idClient: '1',
      timestamp: '987654321'
    }
  ] };

const status = {
  idCandidate: '101',
  idUser: '12',
  idStage: '1',
  idClient: '1',
  timestamp: '987654321'
};


describe('Edit a status', function () {

  it('update a status by editing it', function (done) {

    es.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: 101,
      body: candidateStatus
    }, function(errorIndex, responseIndex) {
      //wait for the document to be indexed and update the emails property
      setTimeout(function(){
        editStatus(101, status, function(errorUpdate, responseUpdate){
          //get the candidate and check the value of the property emails
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: 101,
              _source: ['statusCurrent'],
            }, function(errorGet, candidate){
                expect(candidate._source.statusCurrent.length).to.equal(2);

                //delete the fake candidate
                es.delete({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: 101
                }, function(errorDelete, responseDelete) {

                  done();
                })
            })
        })
      }, 2000);

    })
  });
});
