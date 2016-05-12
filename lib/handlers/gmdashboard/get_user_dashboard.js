'use strict'

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  const myId = request.auth.credentials.id;

  getStatus(request.payload.user, myId, status => {
    status.userIdGoogle = request.payload.user
    return reply.view('gmdasboard', status);
  })

}
