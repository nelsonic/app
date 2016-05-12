'use strict';

module.exports = function (jobs) {

  const result = {}
  // console.log(jobs);
  for(let prop in jobs) {

     let nonEmpty = false;
     let stages = jobs[prop];
     for(let propStage in stages) {
      //  console.log(stages[propStage]);
       if(stages[propStage].length > 0) {
         nonEmpty = true;
       }

     }

     if(nonEmpty) {
        result[prop] = stages
     }
  }

  return result;
}
