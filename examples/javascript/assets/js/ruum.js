// First we check if you support touch, otherwise it's click:
var touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';


var createRuumPayload = {
  "name":"Create Ruum From API: Usage of REST API in Javascript application",
  "externalSystemLink":{
    "objectType":"deal",
    "objectId":"deal_123"
  },
  "participants": ["vidyashree.basavaraju@sap.com"],
  "sections":[{
    "title":"Screen shot from your application",
    "content":[{
      "type": "paragraph",
      "text": "This ruum was created using https://api.ruumapp.com/v1/ruums"
    },{
        "type": "file",
        "fileType": "image/png",
        "fileName": "NIVEA.png",
        "content": ""
      },
      {
      "type":"task",
      "description":"Schedule kickokff meeting",
      "startDate": {
        "day": "01",
        "month": "4",
        "year": "2018"
      },
      "dueDate": {
        "day": "03",
        "month": "4",
        "year": "2018"
      },
      "status": "OPEN",
      "assignees": ["vidyashree.basavaraju@sap.com"],
      "externalSystemLink":{
        "objectType":"activity",
        "objectId":"activity_123"
      }
    }
    ]
  }]
}



// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Then we bind via that event. This way we only bind one event, instead of the two as below
//document.getElementById('hbs').addEventListener(touchEvent, someFunction);
var btnCreateRuum = document.querySelector('.btn-CreateRuum');
btnCreateRuum.addEventListener(touchEvent, function(e) {
    e.preventDefault();
    html2canvas($('#target'), {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            // Call ruum API here to genereate an ruum.
            var data = canvas.toDataURL();
            createRuumPayload.sections[0].content[1].content = data;
            $.ajax({
                url: "https://api.ruumapp.com/v1/ruums",
                type: "POST",
                headers: {
                    'Authentication':'Basic dmlkeWFfc3lzdGVtOnZpZHlh'
                },
                data: JSON.stringify(createRuumPayload),
                dataType: 'json',
                contentType: "application/json",
                success: function(result,status,jqXHR ){
                  console.log(JSON.stringify(result.ruumId));
                  ruumId = JSON.stringify(result.ruumId);
                  ruumId = ruumId.replace(/\"/g, '');
                  var modal = document.getElementById('myModal');
                  document.getElementById('loadRuum').src = "https://open.ruumapp.com/ruums/" + ruumId + "?no-header=true";

                  modal.style.display = "block";
                },
                error(jqXHR, textStatus, errorThrown){
                  //Do something
                  alert("Hello! I am an alert in Error!!  " + jqXHR + ' '+ textStatus + ' '+ errorThrown);
                }
            });

        }
    });

});
