'use strict';

/*
* Upload a cv received from the website when a candidate apply directly for a job
* {
* "candidate": {
* "id": "AVN1NogbbLCne1xLfKxH"
* },
* "fileContent": "...",
* "fileType": "SAMPLE",
* "name": "test1.docx",
* "contentType": "application\/octet-stream",
* "description": "CV",
* "type": "document"
* }
*/

const updloadBuffer = require('./helpers/upload_buffer');

module.exports = function (request, reply) {

  const binary = new Buffer(request.payload.fileContent, 'base64');
  
  updloadBuffer(binary, request.payload.name, request.payload.candidate.id, function(response) {

    return reply(response);
  })

}
