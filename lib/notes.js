'use strict';

require('env2')('.env');
var client = require('./es');
const getUserByIdGoogle = require('./database-helpers/elasticsearch/get_user_by_id_google');
const updateNotes = require('./database-helpers/elasticsearch/update_notes');


exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/notes/{id}',
    config: {
      description: 'create notes',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        if (request.payload.status === undefined && request.payload.company === '' && request.payload.notes === '') {

          return reply.redirect('/candidate/' + request.params.id);
          
        } else {
          var notes = {};
          notes.status = request.payload.status;
          notes.company = request.payload.company;
          notes.notes = request.payload.notes;
          notes.id = request.auth.credentials.id;
          var currentDate = new Date();
          notes.createdAt = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();

          getUserByIdGoogle(request.auth.credentials.id, function (err, user) {

              notes.author = user.names.firstname;

              updateNotes(request.params.id, notes, function (errNotes, notes) {

                return reply.redirect('/candidate/' + request.params.id);
              })
          })
        }
      }
    }

  });

  return next();
};

exports.register.attributes = {
  name: 'Notes'
};
