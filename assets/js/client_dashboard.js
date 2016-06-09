function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
}

function updateValues(elmts, val) {
  for (var i = 0; i < elmts.length; i++) {
    elmts[i].value = val;
  }
}

function createPayloadObj(elmts, payload) {
  for (var j = 0; j < elmts.length; j++) {
    payload[elmts[j].getAttribute('name')] = elmts[j].getAttribute('value');
  }
}

var nextStageButtons = document.querySelectorAll('.next-stage');

for(var i = 0; i < nextStageButtons.length ; i++) {

  nextStageButtons[i].addEventListener('click', function (e) {
    e.preventDefault();
    //create the payload object
    var payload = {};
    var inputs = e.target.parentNode.getElementsByTagName('input');

    createPayloadObj(inputs, payload);

    var currentCandidateDOM = findAncestor(e.target.parentNode, 'cl-candidate');
    var currentStageDOM = findAncestor(e.target.parentNode, 'cl-stage-child')
    var siblingCurrentStage = currentStageDOM.nextElementSibling;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/nextStage');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {

        var response = xhr.responseText;

        if (JSON.parse(response).code === 200) {

          var parsedRes = JSON.parse(response).payload;
          var updatedCurrentStage = currentCandidateDOM.querySelectorAll('input[name="currentStage"]');
          updateValues(updatedCurrentStage, parsedRes.currentStage);
          var updatedNextStage = currentCandidateDOM.querySelectorAll('input[name="nextStage"]');
          updateValues(updatedNextStage, parsedRes.nextStage)

          if (siblingCurrentStage) {
            currentStageDOM.removeChild(currentCandidateDOM);
            siblingCurrentStage.appendChild(currentCandidateDOM);
          }

        }

        if (JSON.parse(response).code === 500) {

          console.log('Ouups');
        }

      }
    };

    xhr.send(JSON.stringify(payload));
  })
}
