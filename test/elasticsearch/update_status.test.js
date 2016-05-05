'use strict';

require('env2')('.env');
const Code = require('code');
const Lab = require('lab');
const updateStatusCandidate = require('../../lib/database-helpers/elasticsearch/update_status');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const es = require('../../lib/es.js');
const candidateStatus = {  fullname: "Candidate update status test", statusCurrent: [] };
const candidateWithoutStatus = {  fullname: "Candidate no status" };
const status = { idCandidate: '1',
                idUser: '12',
                idStage: 'stage1',
                idClient: '1',
                timestamp: '12345'
              };

describe('Update the statusCurrent property of a candidate', function () {

  it('update the property statusCurrent of a candidate', function (done) {

    //save a new candidate
    es.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: 98,
      body: candidateStatus
    }, function(errorIndex, responseIndex) {
      //wait for the document to be indexed and update the emails property
      setTimeout(function(){
        updateStatusCandidate(98, status, function(errorUpdate, responseUpdate){
          //get the candidate and check the value of the property emails
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: 98,
              _source: ['statusCurrent'],
            }, function(errorGet, candidate){
                expect(candidate._source.statusCurrent.length).to.equal(1);

                //delete the fake candidate
                es.delete({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: 98
                }, function(errorDelete, responseDelete) {

                  done();
                })
            })
        })
      }, 2000);

    })
  });
});

describe('Update the currentStatus property of a candidate with no status yet', function () {

  it('update the property currentStatus of a candidate with no status yet', function (done) {

    //save a new candidate
    es.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: 101,
      body: candidateWithoutStatus
    }, function(errorIndex, responseIndex) {
      //wait for the document to be indexed and update the emails property
      setTimeout(function(){
        updateStatusCandidate(101, status, function(errorUpdate, responseUpdate){
          //get the candidate and check the value of the property emails
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: 101,
              _source: ['statusCurrent'],
            }, function(errorGet, candidate){
                expect(candidate._source.statusCurrent.length).to.equal(1);

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
