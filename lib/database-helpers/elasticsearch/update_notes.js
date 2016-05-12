'use strict';

const clientES = require('../../es.js');

module.exports = function (note, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: note.idCandidate,
    _source: ['notesList']

  }, function (error, response) {

    const currentNote = response._source.notesList;
    currentNote.push(note);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: note.idCandidate,
      body: {
        doc: {
          notesList: currentNote
        }
      }
    }, function (errorUpdate, responseUpdate) {

      return callback(errorUpdate, responseUpdate);
    })
  });
}
