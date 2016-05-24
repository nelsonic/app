'use strict';

const Handlebars = require('handlebars');

module.exports = function (client, idClient) {
  let result = '';

  if(!idClient) {
    result = "<option value=\"" + client.id + "\">" + client.name + "</option>";
    return new Handlebars.SafeString(result);
  }

  if( client.id.toString() === idClient.toString() ) {

    result = "<option value=\"" + client.id + "\" selected >" + client.name + "</option>";

  } else {

    result = "<option value=\"" + client.id + "\">" + client.name + "</option>";
  }

    return new Handlebars.SafeString(result);
}
