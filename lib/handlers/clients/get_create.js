'use strict';

const listUsers = require('../../database-helpers/elasticsearch/list_gm_users.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {
    listUsers(function (errUsers, users) {

      return reply.view('clientFormView', {client: {}, owners: users });
    })
  }

}
