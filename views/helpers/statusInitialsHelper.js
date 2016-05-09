var initials = function(name) {
   return name.split(' ').map(function (word) {
     return word[0];
   }).join('');
}

module.exports = function (id, users) {

  var userObj = users.filter(function (user) {
    return user.idGoogle.toString() === id.toString();
  });

  return initials(userObj[0].names.fullname);
};
