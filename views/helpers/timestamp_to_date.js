'use strict';

const Handlebars = require('handlebars');

module.exports = function (timestamp) {

  var date = new Date(timestamp);

  var result = "<span>" + date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + "</span>";


  return new Handlebars.SafeString(result);
}
