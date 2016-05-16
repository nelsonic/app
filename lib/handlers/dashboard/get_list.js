'use strict';

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {

    return reply.redirect('login');

  } else {

    const myId = request.auth.credentials.id;

    getStatus(request.auth.credentials.id, myId,  status => {
      status.userIdGoogle = request.auth.credentials.id;
      return reply.view('dasboard', status);
    });
  }
}
