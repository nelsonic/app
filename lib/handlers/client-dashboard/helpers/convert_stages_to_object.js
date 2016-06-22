'use strict';

/**
* Return stage object {"idStage" : {name: "Interview", order: 1}}
* @param {Array} stages - list of all stages
*/

module.exports = function (stages) {

  var stagesObj = {};

  stages.forEach(function (stage) {
    stagesObj[stage.id] = {
       name: stage.name,
       order: stage.order
     }
  });

  return stagesObj;
}
