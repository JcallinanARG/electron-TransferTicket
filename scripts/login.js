const os = require('os');


function GetEmployees() {
    var d = $.Deferred();
    
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": APIConnection + "employeeSearch",
        "method": "GET",
        "headers": {
          "content-type": "application/json"
        },
        "processData": false,
     
      };

    $.ajax(settings).done(function (response) {
        $("#divStatus").text("Loading users...");
        $("#checkForErrors").show();

        var $s = $('#employeeName').empty();
 
        var $myData = response;
    
        var arrayAmount = $myData.length;
        var i = 0;
        for (i = 0; i < arrayAmount; i++) {
            $('<option/>', {
                'value': $myData[i].employeeName,
                'text': $myData[i].employeeName 
            }).appendTo('#employeeName');
        }

        $("#divStatus").text("Loading users complete. Waiting for selection.");
        d.resolve(response);
    });
 

    return d.promise();

}
 

function logout() {
  window.setCookie("weightMasterLicenseNumber", "");
  window.setCookie("userType", "");
  window.setCookie("scaleID", "");
  let ele = document.getElementById('loginStatus');
  ele.innerHTML = "logged out";
  var loginName = document.getElementById('loginName');
  loginName.value = "";
  var weightMasterPassword = document.getElementById('loginPassword');
  weightMasterPassword.value = "";
  var loginButton = document.getElementById('login-menu');
  loginButton.click();
}

function setupAfterLogin(weighMasterLicenseNumber, type, scaleID) {
  //navigation.menu.hideAllSections()
  //navigation.menu.showSection('ticketEntry');
  $("#btnLogoutDiv").remove();
  var tabWrapper = $( ".tab" );
  tabWrapper.append('<div class="pull-right" id="btnLogoutDiv"><button class="tablinks" ' + 
'onclick=logout() ' + 
    'id=btnLogout><span style="color:#95240B">' + weighMasterLicenseNumber + ' : '  + type + ' : ' + scaleID + ' Logout</span></button></div>');


  var ticketButton = document.getElementById('ticket-menu');
  ticketButton.click();
var searchButton = document.getElementById('btnSearch');
  searchButton.click();

//login in stuff for different units/admnins/read only user/accounting?

  switch(type) {
    case 'readonly':
     // alert('readonly');
      //disable buttons



   break;
    case 'weighMaster':
    case 'admin':
      //Admins can add new weighmasters and scales
      default:



        break;
  }


}
function checkCookie(){
    session.defaultSession.cookies.get({ url: 'https://amref.com' })
    .then((cookies) => {
      console.log(cookies)
    }).catch((error) => {
      console.log(error)
    })
}

//btnLogin

// const btnLogin = document.getElementById('btnLogin');




// btnLogin.addEventListener('click', function (event) 
//Dont need password just user login.  No need for user table?
//DO I need table to designate access to certian pages based upon user name.

function login(){
  var loginRecord = {
    weightMasterLicenseNumber: document.getElementById('loginName').value,
    weightMasterPassword:  document.getElementById('loginPassword').value  
  };
  
  var loginRecordJSON = JSON.stringify(loginRecord);
 
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "checkCredentials",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "processData": false,
    "data":loginRecordJSON
  };
  
  $.ajax(settings).done(function (response) {
   // console.log(response);
   try {
    var typeGot = response[0].type;
    var weightMasterLicenseNumber  = response[0].weightMasterLicenseNumber ;
    var scaleID  = response[0].scaleID ;
      if (typeGot != null) {
        window.setCookie("weightMasterLicenseNumber", weightMasterLicenseNumber);
        window.setCookie("scaleID", scaleID);
        window.setCookie("userType", typeGot);
        let ele = document.getElementById('loginStatus');
        ele.innerHTML = 'Logged in as <strong>' + window.getCookie('weightMasterLicenseNumber') + "</strong>, " + window.getCookie("userType");
        setTimeout(() => {
          setupAfterLogin(window.getCookie('weightMasterLicenseNumber'),window.getCookie("userType"),window.getCookie("scaleID")) ;
        }, (1));


      } else {
        let ele = document.getElementById('loginStatus');
        ele.innerHTML = 'Error, incorrect username or password';
      }
    } catch (ex) {}
  });

}


 function triggerLoginOnEnter(e, textarea) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { //Enter keycode
    btnLogin.click()
  }

}

function pullUserName() {
  const machineLogin = os.userInfo().username;
  console.log(machineLogin);
  document.getElementById('loginName').value = machineLogin.toString()
  window.setCookie("weightMasterLicenseNumber",  machineLogin.toString())
  var ticketButton = document.getElementById('transferTicket-menu');
  ticketButton.click();


///Tie to button click for the moment?

}
