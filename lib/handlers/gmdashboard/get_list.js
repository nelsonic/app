'use strict';

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  getStatus(request.auth.credentials.id, status => {
    status.userIdGoogle = request.auth.credentials.id;
    return reply.view('gmdasboard', status);
  });

}
