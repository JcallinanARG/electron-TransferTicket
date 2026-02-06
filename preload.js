var weightMasterLicenseNumber = '';
var userType = '';
var scaleID = '';

//var APIConnection = 'http://b-d-web1:107/'
var APIConnection = 'http://b-p-web4:107/'
//var APIConnection = 'http://localhost:8080/'
//var SigConnecton = 'http://b-d-web4:82/'
//PDF Printer?


window.setCookie = function (name, value){
    if (name == 'weightMasterLicenseNumber') {
        weightMasterLicenseNumber = value;
    } else if (name == 'userType') {
         userType = value;
   } else if (name == 'scaleID') {
        scaleID = value;
    } else {
        
    }
}
window.getCookie = function(name){
    var returnValue = '';
    if (name == 'weightMasterLicenseNumber') {
        returnValue = weightMasterLicenseNumber;
    } else if (name == 'userType') {
        returnValue = userType;
    } else if (name == 'scaleID') {
        returnValue = scaleID;        
    } else {
        returnValue = '';
    }
    return returnValue;
}

window.ClickOnLogin = function () {

   document.getElementById("login-menu").click();

  }


window.global = window;



  
  