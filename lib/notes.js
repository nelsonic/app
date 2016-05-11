'use strict';

const saveNote = require('./handlers/notes/save_note');

exports.register = function (server, option, next) {

  server.route([
    {
      method: 'POST',
      path: '/notes/save',
      config: {
        description: 'Save a note',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: saveNote
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Notes'
}
