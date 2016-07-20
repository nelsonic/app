'use strict';

const updateNotes = require('../../database-helpers/elasticsearch/update_notes');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }

  const note = {
    idCandidate: request.payload.idCandidate,
    note: request.payload.notes,
    timestamp: new Date().getTime(),
    idUser: request.auth.credentials.id
  }

  updateNotes(note, (error, response) => {

    return reply.redirect('/candidate/' + note.idCandidate);
  });
}
