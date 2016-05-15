var Handlebars = require('handlebars');
module.exports = function (clients, idClient) {

  var result = "<option value="+ clients.id +">" + clients.name + "</option>";

  if (clients.id === idClient) {
     result = "<option selected value="+ clients.id +">" + clients.name + "</option>";
  }

  return new Handlebars.SafeString(result);
};
