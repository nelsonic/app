// 'use strict';
//
// const clientES = require('../../es.js');
//
// module.exports = function (idUser, callback) {
//
//   clientES.get({
//     index: process.env.ES_INDEX,
//     type: process.env.ES_TYPE_USERS,
//     id: idUser
//   }, function (error, response) {
//
//     const user = response._source;
//     return callback(error, user);
//   });
// }
