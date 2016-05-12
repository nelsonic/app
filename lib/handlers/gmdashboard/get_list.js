'use strict';

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  const myId = request.auth.credentials.id;

  getStatus(request.auth.credentials.id, myId,  status => {
    status.userIdGoogle = request.auth.credentials.id;
    return reply.view('gmdasboard', status);
  });

}
