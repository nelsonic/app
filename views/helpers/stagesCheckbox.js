'use strict';

const Handlebars = require('handlebars');

module.exports = function (id, stage) {

  var result = '';

  if(stage.allowed) {

    result = "<input type='checkbox' name=stages value=" +id + " checked> "+ stage.name +" <br/>";

  } else {

    result = "<input type='checkbox' name=stages value=" + id + "> "+ stage.name +" <br/>";

  }
  return new Handlebars.SafeString(result);
}
