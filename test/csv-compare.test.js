var compare = require('../lib/handlers/csv_list/helpers/compare');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('sort an array of list', function () {

  it('return the array sorted', function (done) {

    var lists = [{listName: "zeList"}, {listName: "alist"}, {listName: 'bList'},{listName: 'same'}, {listName: 'same'} ];
    var result = lists.sort(compare);

    expect(result[0].listName).to.equal('alist');
    done();
  });
});
