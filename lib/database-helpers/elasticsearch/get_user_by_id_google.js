'use strict';

/**
* Return a user which match the idGoogle
* @param {String} idGoogle - id from Google
* @param {Function} callback - callback with error and the user object
* Example of user object:
{ email: 'example@gmail.com',
  idGoogle: '1077422.....',
  image: '',
  idWebsite: 'the same idGoogle',
  names:
   { firstname: 'Mario',
     fullname: 'Mario Bros',
     lastname: 'Bros',
     linkedinName: 'Mario Bros' },
  phones: { office: '0207 392 2643', mobile: '07500 000 000' },
  role: 'Developer',
  linkedin: 'https://www.linkedin.com/in/username',
  active: true,
  admin: true,
  dev: true,
  id: 'ElasticSeach ID' }
*/

const clientES = require('../../es.js');

module.exports = function (idGoogle, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    size: 100,
    body: {
      query: {
        match_phrase: {
          idGoogle: idGoogle
        }
      },
    }

    }, function (err, response) {

      const user = response.hits.hits[0] ? response.hits.hits[0]._source : undefined;

      if (user) {
        user.id = response.hits.hits[0]._id;
      }
    
      return callback(err, user);
  });
}
