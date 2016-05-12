var helper = require('./../lib/helpers/complete_profile.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Complete a profile with all the properties required', function () {

  it('complete a profile', function (done) {

    var profile = {};
    var expected = 16;
    var result = helper(profile)
    expect(result.hasOwnProperty('connections')).to.be.equal(true);
    expect(result.hasOwnProperty('url')).to.be.equal(true);
    expect(result.hasOwnProperty('connectedTo')).to.be.equal(true);
    expect(result.hasOwnProperty('fullname')).to.be.equal(true);
    expect(result.hasOwnProperty('location')).to.be.equal(true);
    expect(result.hasOwnProperty('favourite')).to.be.equal(true);
    expect(result.hasOwnProperty('current')).to.be.equal(true);
    expect(result.hasOwnProperty('picture')).to.be.equal(true);
    expect(result.hasOwnProperty('summary')).to.be.equal(true);
    expect(result.hasOwnProperty('skills')).to.be.equal(true);
    expect(result.hasOwnProperty('languages')).to.be.equal(true);
    expect(result.hasOwnProperty('date')).to.be.equal(true);
    expect(result.hasOwnProperty('headline')).to.be.equal(true);
    expect(result.hasOwnProperty('contacts')).to.be.equal(true);
    expect(result.hasOwnProperty('experience')).to.be.equal(true);
    done();
  });
});
