'use strict';

module.exports = function (jobs) {

  const result = {}

  for(let prop in jobs) {

    result[prop] = {};

     let stages = jobs[prop];
     for(let propStage in stages) {

       if(stages[propStage].length > 0) {
         result[prop][propStage] = stages[propStage];
       }

     }

  }

  return result;
}
