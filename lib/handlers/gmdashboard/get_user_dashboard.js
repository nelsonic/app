'use strict'

const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  getStatus(request.payload.user, status => {
    status.userIdGoogle = request.payload.user
    return reply.view('gmdasboard', status);
  })

}
