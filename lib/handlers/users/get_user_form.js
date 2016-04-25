'use strict';

const clientES = require('../../es.js');

const getUserByIdGoogle = require('../../database-helpers/elasticsearch/get_user_by_id_google');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');

  } else {

    getUserByIdGoogle(request.params.idGoogle, function (errUser, user) {
      
      return reply.view('userFormView', {user: user});
    })
  }
}
