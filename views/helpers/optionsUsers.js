'use strict';

const Handlebars = require('handlebars');

module.exports = function (user, idOwner) {
  let result = '';

  if(!idOwner) {
    result = "<option value=\"" + user.idWebsite + "\">" + user.names.fullname + "</option>";
    return new Handlebars.SafeString(result);
  }

  if( user.idWebsite.toString() === idOwner.toString() ) {

    result = "<option value=\"" + user.idWebsite + "\" selected >" + user.names.fullname + "</option>";

  } else {

    result = "<option value=\"" + user.idWebsite + "\">" + user.names.fullname + "</option>";
  }

    return new Handlebars.SafeString(result);
}
