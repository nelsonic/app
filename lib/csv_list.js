'use strict'

/**
* Define routes to upload a csv
*/

const getFormList = require('./handlers/csv_list/get_form_list');
const getList = require('./handlers/csv_list/get_list');
const postCreateList = require('./handlers/csv_list/post_list');

exports.register = function (server, option, next) {

  server.route(
    [
     {
        method: 'GET',
        path: '/csv-list/list',
        config: {
          description: 'Return the form for the creation of a new list',
          auth: {
            mode: 'try',
            strategy: 'jwt'
          },
          handler: getList
        }
      },
      {
        method: 'GET',
        path: '/csv-list/create',
        config: {
          description: 'Return the form for the creation of a new list',
          auth: {
            mode: 'try',
            strategy: 'jwt'
          },
          handler: getFormList
        }
      },
      {
        method: 'POST',
        path: '/csv-list/create',
        config: {
          description: 'Index a new list if it doens\'t exists yet',
          auth: {
            mode: 'try',
            strategy: 'jwt'
          },
          handler: postCreateList
        }
      }
    ]
  );
  return next();
}

exports.register.attributes = {
  name: 'CsvList'
}
