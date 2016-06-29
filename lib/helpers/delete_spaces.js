'use strict';

module.exports = function deleteSpaces (e) {

  if (e !== undefined) {
    return e.split(' ').filter( k => k !== '').join(' ');
  } else {
    return '';
  }
}
