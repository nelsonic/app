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

    //info section

    var editButton = document.getElementById('edit-info');
    editButton.addEventListener('click', function () {
      //display and update data
      var scurrent = document.querySelector('.scurrent').textContent;
      document.querySelector('.scurrent-input').value = scurrent;
      var sexpected = document.querySelector('.sexpected').textContent;
      document.querySelector('.sexpected-input').value = sexpected;
      var notice = document.querySelector('.notice').textContent;
      document.querySelector('.notice-input').value = notice;
      var locations = document.querySelector('.locations').textContent;
      document.querySelector('.locations-input').value = locations;

      document.getElementsByClassName('info-wrapper')[0].style.display = 'none';
      document.getElementsByClassName('info-form')[0].style.display = 'block';

    }, false);

    var saveButton = document.getElementById('save-info');
    saveButton.addEventListener('click', function (e) {
      e.preventDefault();
      //ajax call
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/info/save');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {

          var response = JSON.parse(xhr.responseText);
          
          if (response.code === 200) {
            //display new data
            document.querySelector('.scurrent').textContent = response.info.scurrent;
            document.querySelector('.sexpected').textContent = response.info.sexpected;
            document.querySelector('.notice').textContent = response.info.notice;
            document.querySelector('.locations').textContent = response.info.locations;
            document.querySelector('.error-tag').style.display = 'none';
          }
          if (response.code === 500) {
            document.querySelector('.error-tag').style.display = 'block';
          }

          document.getElementsByClassName('info-form')[0].style.display = 'none';
          document.getElementsByClassName('info-wrapper')[0].style.display = 'block';
        }
      };

      var infoObject = {
        idCandidate: document.querySelector('.id-candidate').value,
        scurrent: document.querySelector('.scurrent-input').value,
        sexpected: document.querySelector('.sexpected-input').value,
        notice: document.querySelector('.notice-input').value,
        locations: document.querySelector('.locations-input').value
      };

      xhr.send(JSON.stringify(infoObject));
    }, false);

})();
