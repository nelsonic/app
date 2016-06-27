'use stict';

module.exports = function (listA, listB) {
  if (listA.listName < listB.listName)
    return -1;
  else if (listA.listName > listB.listName)
    return 1;
  else
    return 0;
};
