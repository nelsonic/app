'use strict';

const clientES = require('../../es.js');
const listUsers = require('../../database-helpers/elasticsearch/list_gm_users');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {

    return reply.redirect('login');

  } else {

    listUsers(function (errUsers, users) {

      return reply.view('users', {users: users})
    });
  }
}
