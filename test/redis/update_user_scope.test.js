'use strict';

var redisClient = require('redis-connection')();
var Code = require('code');
var Lab = require('lab');
var updateUserScope = require('../../lib/database-helpers/redis/update_user_scope');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

const user = {
  id: '454545'
};

describe('Update user scope', function () {

  it('returns ', function (done) {
    redisClient.set(user.id, JSON.stringify(user), function (err, resp) {
      updateUserScope(user.id, 'admin', function(err,  exist) {

        redisClient.get(user.id, function (errUser, userRedis) {
          let userObj = JSON.parse(userRedis);

          expect(userObj.scope).to.equal('admin');

          redisClient.del(user.id, function (errDelete, respDelete) {
            done();
            redisClient.quit();
          })
        });
      });
    });
  });
});
