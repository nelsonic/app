var statusStageHelper = require('../views/helpers/statusStageHelper');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('return the name of the stage by passing id', function () {

  it('returns the name of the stage', function (done) {

    var stages = [{id: '1', name: 'stage1'}, {id: '2', name: 'stage2'}];
    var idStage = '2';
    var result = statusStageHelper(idStage, stages);

    expect(result).to.equal('stage2');
    done();
  });
});
