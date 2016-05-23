'use strict';

/**
* Upload the file to Google Drive and update the property cvDocumentLink of the candidate
* the payload from the form is {idCandidate: theIdOfTheCandidate, selectedCv: BufferOfTheCv}
*/

const updloadBuffer = require('./helpers/upload_buffer');
const fs = require('fs');

module.exports = function (request, reply) {

  let data = [];
  let chunk;
  let stream = request.payload.selectedCv;

  stream.on('readable', () => {

    while ((chunk=stream.read()) != null) {

      data.push(chunk)
    }

  })

  stream.on('end',function(){

    const binary = Buffer.concat(data);
    updloadBuffer(binary, stream.hapi.filename, request.payload.idCandidate, function(response) {

     return reply.redirect('/candidate/' + request.payload.idCandidate);
   })
  });

}
