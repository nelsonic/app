// 'use strict';
//
// require('env2')('.env');
// const Code = require('code');
// const Lab = require('lab');
// const editStatusCandidate = require('../../lib/database-helpers/elasticsearch/edit_status');
//
// const lab = exports.lab = Lab.script();
// const describe = lab.experiment;
// const expect = Code.expect;
// const it = lab.test;
//
// const es = require('../../lib/es.js');
// const candidateStatus = {  fullname: "Candidate update status test", statusCurrent: [{idCandidate: '1',
//                 idUser: '12',
//                 idStage: 'stage1',
//                 idClient: '1',
//                 timestamp: '12345'}]};
// const editStatus = { idCandidate: '1',
//                 idUser: '12',
//                 idStage: 'stage4',
//                 idClient: '1',
//                 timestamp: '12345'
//               };
//
// describe('Edit the statusCurrent property of a candidate', function () {
//
//   it('edit the property statusCurrent of a candidate', function (done) {
//
//     //save a new candidate
//     es.index({
//       index: process.env.ES_INDEX,
//       type: process.env.ES_TYPE,
//       id: 103,
//       body: candidateStatus
//     }, function(errorIndex, responseIndex) {
//       //wait for the document to be indexed and update the emails property
//       setTimeout(function(){
//         editStatusCandidate(103, editStatus, function(errorUpdate, responseUpdate){
//           //get the candidate and check the value of the property emails
//             es.get({
//               index: process.env.ES_INDEX,
//               type: process.env.ES_TYPE,
//               id: 103,
//               _source: ['statusCurrent'],
//             }, function(errorGet, candidate){
//                 expect(candidate._source.statusCurrent.length).to.equal(1);
//
//                 //delete the fake candidate
//                 es.delete({
//                   index: process.env.ES_INDEX,
//                   type: process.env.ES_TYPE,
//                   id: 103
//                 }, function(errorDelete, responseDelete) {
//
//                   done();
//                 })
//             })
//         })
//       }, 2000);
//
//     })
//   });
// });
