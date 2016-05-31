'use strict';

module.exports = function (request, reply) {

  if( !request.auth.isAuthenticated) {

    return reply.redirect('/client-login');
  }

   return reply('Client Dashboard');

}
