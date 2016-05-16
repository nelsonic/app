var stagesToObj = require('../lib/handlers/dashboard/helpers/stages_to_object');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('create an object from stages', function () {

  it('return the object from stages which is array', function (done) {

      const stages = [{id: '1', name: 'Submitted'}, {id: '2', name: 'Interview'}];
      const result = stagesToObj(stages);
      expect(result['1'].id).to.equal('1');
      expect(result['1'].name).to.equal('Submitted');
      done();
  });
});
