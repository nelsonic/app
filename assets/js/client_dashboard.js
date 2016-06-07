var nextStageButtons = document.querySelectorAll('.next-stage');
for(var i = 0; i < nextStageButtons.length ; i++) {
  nextStageButtons[i].addEventListener('click', function (e) {
    e.preventDefault();
    var inputs = e.target.parentNode.getElementsByTagName('input');;

    var payload = {};
    for (var y = 0; y < inputs.length; y++) {
      payload[inputs[y].getAttribute('name')] = inputs[y].getAttribute('value');
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/nextStage');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var response = xhr.responseText;
        console.log(response);
        if (response === '202') {
          console.log('Cool!');
        }
        if (response === 500) {

          console.log('Ouups');
        }

      }
    };

    xhr.send(JSON.stringify(payload));
  })
}

// var nextStageAjax

// saveButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   //ajax call
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/info/save');
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//
//       var response = JSON.parse(xhr.responseText);
//
//       if (response.code === 200) {
//         //display new data
//         document.querySelector('.scurrent').textContent = response.info.scurrent;
//         document.querySelector('.sexpected').textContent = response.info.sexpected;
//         document.querySelector('.notice').textContent = response.info.notice;
//         document.querySelector('.locations').textContent = response.info.locations;
//         document.querySelector('.error-tag').style.display = 'none';
//       }
//       if (response.code === 500) {
//         document.querySelector('.error-tag').style.display = 'block';
//       }
//
//       document.getElementsByClassName('info-form')[0].style.display = 'none';
//       document.getElementsByClassName('info-wrapper')[0].style.display = 'block';
//     }
//   };
//
//   var infoObject = {
//     idCandidate: document.querySelector('.id-candidate').value,
//     scurrent: document.querySelector('.scurrent-input').value,
//     sexpected: document.querySelector('.sexpected-input').value,
//     notice: document.querySelector('.notice-input').value,
//     locations: document.querySelector('.locations-input').value
//   };
//
//   xhr.send(JSON.stringify(infoObject));
// }, false);
