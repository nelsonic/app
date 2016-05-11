var statusEditStages = require('../views/helpers/statusEditStages');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('edit stage with stage and stage id', function () {

  it('return the option with the name of the stage and current stage id', function (done) {

    var stage = {id: '1', name: 'stage1'};
    var idStage = '2';
    var result = statusEditStages(stage, idStage);

    expect(result.string).to.equal('<option value=1>stage1</option>');
    done();
  });
});

describe('Pass the stage and stage id', function () {

  it('return the option with the name of the stage and stage id', function (done) {

    var stage = {id: '1', name: 'stage1'};
    var idStage = '1';
    var result = statusEditStages(stage, idStage);

    expect(result.string).to.equal('<option selected value=1>stage1</option>');
    done();
  });
});
