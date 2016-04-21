'use strict';

const clientES = require('../../es.js');

module.exports = function (id, note, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['notes']

  }, function (error, response) {

    console.log(error);
    console.log(response);

    const currentNote = response._source.notes;
    currentNote.push(note);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          notes: currentNote
        }
      }
    }, function (errorUpdate, responseUpdate) {

      console.log('errorUpdate', errorUpdate);
      console.log('respnseUpdate', responseUpdate);
      return callback(errorUpdate, responseUpdate);
    })
  });
}
