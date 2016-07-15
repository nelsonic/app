'use strict';


module.exports = function(pageNumber) {

  let number = Number(pageNumber);

  //if number is a mumber
  if(!isNaN(number)) {

    if(number < 1) {
      number = 0;
    } else {
      number = number - 1;
    }

  } else {
    number = 0;
  }

  return number;
}
