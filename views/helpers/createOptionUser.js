'use strict';

const Handlebars = require('handlebars');

module.exports = function (user, idUser) {
  let result = '';
  if(user.idGoogle === idUser) {
    result = "<option value=\"" + user.idGoogle + "\" selected>" + user.names.firstname + "</option>";
  } else {
    result = "<option value=\"" + user.idGoogle + "\">" + user.names.firstname + "</option>";
  }

    return new Handlebars.SafeString(result);
}
