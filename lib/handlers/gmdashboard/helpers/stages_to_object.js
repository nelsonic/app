'use strict';

module.exports = function (stages) {

  let obj = {}

  stages.forEach(stage => {
    obj[stage.id] = stage;
  });
  
  return obj;
}
