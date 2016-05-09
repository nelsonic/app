var Handlebars = require('handlebars');
module.exports = function (stage, idStage) {
  
  var result = "<option value="+ stage.id +">" + stage.name + "</option>";

  if (stage.id.toString() === idStage.toString()) {
     result = "<option selected value="+ stage.id +">" + stage.name + "</option>";
  }

  return new Handlebars.SafeString(result);
};
