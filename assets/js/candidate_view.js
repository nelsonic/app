(function () {
  //favourite
  var favouriteForm = document.getElementsByClassName('favourite-form')[0];
    favouriteForm.addEventListener('submit', function (e){
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/favourite');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          if (xhr.responseText === '200') {
            favouriteForm.setAttribute("action", "");
            var state = document.getElementById('star-state');
            state.className = 'fa fa-star';
          }
          console.log(xhr.responseText);
        }
      };

      xhr.send(JSON.stringify({id: document.getElementById('profileId').value }));
      console.log('had to favourite!!');

    }, false);

    //delete duplicate profile
    var deleteProfile = document.getElementsByClassName('delete-profile')[0];
    var deleteProfileConfirmation = document.getElementsByClassName('delete-profile-confirmation')[0];
    var cancelDeleteProfile = document.getElementsByClassName('cancel-delete-profile')[0];

    deleteProfile.addEventListener('click', function (e){
      e.preventDefault();
      deleteProfileConfirmation.style.display = 'block'
      deleteProfile.style.display = 'none';
    }, false);

    cancelDeleteProfile.addEventListener('click', function() {
      deleteProfileConfirmation.style.display = 'none';
      deleteProfile.style.display = 'block';
    }, false);

    //display email message
    var displayEmail = document.querySelectorAll('.display-email');
    var close = document.querySelectorAll('.close');

    for (var i = 0; i < displayEmail.length; i++) {
     displayEmail[i].addEventListener('click', function (e) {
      e.preventDefault();
      this.nextElementSibling.nextElementSibling.style.display = 'block';
      this.nextElementSibling.style.display = 'block';
      }, false);
    }

    for (var i = 0; i < close.length; i++) {
      close[i].addEventListener('click', function (e) {
        e.preventDefault();
        this.nextElementSibling.style.display = 'none';
        this.style.display = 'none';
      }, false);
    }

    var addStatus = document.getElementById('add-status');
    addStatus.addEventListener('click', function (e) {
      this.style.display = 'none';
      document.querySelector('.dropdown-clients').style.display = 'inline-block';
      document.querySelector('.dropdown-jobs').style.display = 'inline-block';
      document.querySelector('.dropdown-stages').style.display = 'inline-block';
      document.querySelector('.dropdown-save').style.display = 'inline-block';
    })

    document.getElementById("clients").addEventListener("change", function(e) {

        var selected = e.target.value;

        var jobs = document.getElementsByClassName(selected);

        var jobsArray = document.getElementById('jobs').options;

          Array.prototype.map.call(jobsArray, function (el) {

            if (el.className === selected) {
                el.disabled = false;
            }

            if (el.className !== selected) {
              el.disabled = true;
            }

          });

    }, false);


})();
