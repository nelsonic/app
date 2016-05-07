'use strict';

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/gmdashboard',
    config: {
      description: 'return the gmdasboard',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function(request, reply) {

        const clients = [{id: 1, name: 'DWYL'}];
        const myjobs = [{id: 1, jobName: 'web dev'}];

        return reply.view('gmdasboard', {clients: clients, myjobs: myjobs})
      }
    }

  })
  return next()
}


exports.register.attributes = {
  name: 'GmDashboard'
};
