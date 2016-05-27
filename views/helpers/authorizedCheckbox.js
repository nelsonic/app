'use strict';

const Handlebars = require('handlebars');

module.exports = function (isAuthorized) {

  let result = "<input type=\"checkbox\" name=\"authorized\" checked > Authorized <br/>";

  if(isAuthorized === false) {

    result = "<input type=\"checkbox\" name=\"authorized\"> Authorized <br/>";
  }

    return new Handlebars.SafeString(result);
}
