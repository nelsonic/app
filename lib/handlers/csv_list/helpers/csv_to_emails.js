'use strict';

/**
* convert a csv string to an array of emails
*/
const Converter = require("csvtojson").Converter;

module.exports = function(csv, callback) {

  const converter = new Converter({});
  converter.fromString(csv, function(err,csvJson){

    let emails = csvJson.map(csvRow => {
      return csvRow.email
    });

    //filter the empty emails
    emails = emails.filter(Boolean);

    return callback(emails);
  })
}
