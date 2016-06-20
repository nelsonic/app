'use strict';

/**
* convert a csv string to an array of emails
*/
const Converter = require("csvtojson").Converter;

module.exports = function(csv, callback) {

  const converter = new Converter({});
  converter.fromString(csv, function(err,csvJson){

    return callback(csvJson);
  })
}
