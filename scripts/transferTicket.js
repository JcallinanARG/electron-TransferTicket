const ptp  = require('pdf-to-printer');
var http = require('http');
const { settings } = require('cluster');
const electron = require('electron');
const { post } = require('jquery');
const path = require('path');
const { dialog } = require('electron');
const { contextIsolated } = require('process');
const { Console } = require('console');
//import autocomplete from 'autocompleter';
var autocomplete = require('autocompleter');

const machineLogin = os.userInfo().username;
async function test(){
console.log('Test')
}

GetReasonCodeEdit()

function openTicketTabs(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }


  // Show the current tab, and add an "active" class to the button that opened the tab
 
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  document.getElementById('divDeleteTransfer').style.display = 'none'
 
  if (tabName == 'transferTicket-search'){
     document.getElementById('transferMachineLogon').value = machineLogin.toString()
     GetReasonCodeNumber()
     document.getElementById('TransferDirection1').value = "OUT"
     document.getElementById('TransferDirection2').value = "IN"
     document.getElementById('TransferDirection3').value = "IN"
     document.getElementById('TransferDirection4').value = "IN"
     document.getElementById('TransferDirection5').value = "IN"
     //reset Complet checkboxes
     document.getElementById('fromLineItemComplete1').checked = false
     document.getElementById('fromLineItemComplete2').checked = false
     document.getElementById('fromLineItemComplete3').checked = false
     document.getElementById('fromLineItemComplete4').checked = false
     document.getElementById('fromLineItemComplete5').checked = false

    console.log("Auto populate Login.")
  }

  if (tabName == 'viewTransferTickets'){
    // document.getElementById('carrierSearchInput').value = ''
     loadjsGridTransferTicket()

    console.log("I am working correctly for once.")
  }

  if (tabName == 'viewClosedTransferTickets'){
    // document.getElementById('carrierSearchInput').value = ''
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    var formattedDateStart = currentDate.toISOString().split('T')[0];
    document.getElementById('searchTransferDateEndClosed').value = formattedDateStart;
    currentDate.setDate(currentDate.getDate() - 31);
    var formattedDate = currentDate.toISOString().split('T')[0];
    document.getElementById('searchTransferDateStartClosed').value = formattedDate;
   
    loadjsGridClosedTransferTicket()
    console.log("Closed Transfer tickets.")
   
  }
  if (tabName == 'viewAllClosedTransferTickets'){
    // document.getElementById('carrierSearchInput').value = ''
    var currentDateAll = new Date();
    currentDateAll.setDate(currentDateAll.getDate() + 1);
    var formattedDateStartAll = currentDateAll.toISOString().split('T')[0];
    document.getElementById('searchTransferDateEndAll').value = formattedDateStartAll;
    currentDateAll.setDate(currentDateAll.getDate() - 31);
    var formattedDateStartAll = currentDateAll.toISOString().split('T')[0];
    document.getElementById('searchTransferDateStartAll').value = formattedDateStartAll;

    loadjsGridAllTransferTicket()
    console.log("Closed Transfer tickets.")
   
  }
    userType =  window.getCookie("userType")


  }


async function UpdateTransferDetail(transferDetailID,Tank,Feet,Inches,Gallons,Direction,Comments, AfterFeet,AfterInches, Completed) {
   
    console.log(Completed)
    //replace fields below with values passed into proc
    var transferDetailRecordUpdate = {
      TransferDetailID: transferDetailID,
      Tank: Tank,
      Feet: Feet,
      Inches: Inches,
      Gallons: Gallons,
      Direction:Direction,
      Comments: Comments,
      AfterFeet: AfterFeet,
      AfterInches: AfterInches,
      Completed: Completed
  
      //ReasonCode: window.getCookie('weightMasterLicenseNumber'),
    };
  
  
    var transferDetailUpdateRecordJSON = JSON.stringify(transferDetailRecordUpdate);
  
  
  
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": APIConnection + "updateTransferDetail",
      "method": "POST",
      "headers": {
        
        "content-type": "application/json"
      },
      "processData": false,
      "data": transferDetailUpdateRecordJSON
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      
       
    });
  
  
  
  }

  async function updateTransferDetailAsync(i) {
    return new Promise(async (resolve, reject) => {
      const detailId = document.getElementById(`editTransferDetailID${i}`).value;

      // Check if editTransferDetailID is null and other fields are populated
      if (detailId.trim() === '' && (
        document.getElementById(`editTranferTank${i}`).value 
      )) {
        // Add new record
        console.log("adding record");
       await saveTransferDetailUpdate(
          document.getElementById('transferHeaderIDEdit').value,
          document.getElementById(`editTranferTank${i}`).value,
          document.getElementById(`editTransferFeet${i}`).value,
          document.getElementById(`editTranferInches${i}`).value,
          document.getElementById(`editTransferGallons${i}`).value,
          document.getElementById(`editTransferDirection${i}`).value,
          document.getElementById(`editTranferComments${i}`).value,
          document.getElementById(`editTransferAfterFeet${i}`).value,
          document.getElementById(`editTranferAfterInches${i}`).value,
          document.getElementById(`editTransferCompleted${i}`).checked
        );
      } else {
        // Update existing record
        console.log("Update")
        console.log(detailId); 
        
       await UpdateTransferDetail(
          detailId,
          document.getElementById(`editTranferTank${i}`).value,
          document.getElementById(`editTransferFeet${i}`).value,
          document.getElementById(`editTranferInches${i}`).value,
          document.getElementById(`editTransferGallons${i}`).value,
          document.getElementById(`editTransferDirection${i}`).value,
          document.getElementById(`editTranferComments${i}`).value,
          document.getElementById(`editTransferAfterFeet${i}`).value,
          document.getElementById(`editTranferAfterInches${i}`).value,
          document.getElementById(`editTransferCompleted${i}`).checked
        );
      }
  
      const settings = {
        "async": true,
        "crossDomain": true,
        //... (other settings for AJAX call)
      };
  
      $.ajax(settings).done(function (response) {
        console.log(`Server response for Record${i}:`, response);
        resolve();  // Resolve the promise to indicate completion
      });
    });
  }
function anyCompleteCheckedNew() {
  for (let i = 1; i <= 5; i++) {
    const tank = document.getElementById(`fromBeforeTank${i}`)?.value?.trim() || "";
    const complete = !!document.getElementById(`fromLineItemComplete${i}`)?.checked;
    if (tank !== "" && complete) return true;
  }
  return false;
}

function anyCompleteCheckedEdit() {
  for (let i = 1; i <= 5; i++) {
    const detailId = document.getElementById(`editTransferDetailID${i}`)?.value?.trim() || "";
    const tank = document.getElementById(`editTranferTank${i}`)?.value?.trim() || "";
    const complete = !!document.getElementById(`editTransferCompleted${i}`)?.checked;

    // prompt if it's a real line (existing detailId OR tank filled in) and complete is checked
    if ((detailId !== "" || tank !== "") && complete) return true;
  }
  return false;
}

function shouldPromptSampleOnSave(transferId, endTimeValue) {
  // prompt once per transferId+endTime per app session
  const safeTransferId = (transferId && transferId.trim()) ? transferId.trim() : "NEW";
  const safeEnd = (endTimeValue && endTimeValue.trim()) ? endTimeValue.trim() : "NOEND";
  const key = `finishedTankSampleSave:${safeTransferId}:${safeEnd}`;

  if (sessionStorage.getItem(key)) return false;
  sessionStorage.setItem(key, "true");
  return true;
}


function completeAllTransfer(){
  if (document.getElementById("editTransferDetailID1").value != ''){
    document.getElementById("editTransferCompleted1").checked = true
  }
  if (document.getElementById("editTransferDetailID2").value != ''){
    document.getElementById("editTransferCompleted2").checked = true
  }
  if (document.getElementById("editTransferDetailID3").value != ''){
    document.getElementById("editTransferCompleted3").checked = true
  }
  if (document.getElementById("editTransferDetailID4").value != ''){
    document.getElementById("editTransferCompleted4").checked = true
  }
  if (document.getElementById("editTransferDetailID5").value != ''){
    document.getElementById("editTransferCompleted5").checked = true
  }
  document.getElementById("updateMSG").value = 'Records marked complete.'

}

function shouldPromptFinishedTankSample(transferId, endTimeValue) {
  if (!transferId || !endTimeValue) {
    return false;
  }

  const promptKey = `finishedTankSample:${transferId}:${endTimeValue}`;
  if (sessionStorage.getItem(promptKey)) {
    return false;
  }

  sessionStorage.setItem(promptKey, "true");
  return true;
}

function getFinishedTankSampleResponse() {
  const alertMessage = [
    "Finished tank sample reminder:",
    "Please sample the finished tank after completing the transfer.",
    "Select OK for Yes or Cancel for N/A."
  ].join("\n");

  return window.confirm(alertMessage) ? "Yes" : "N/A";
}

  




  // async  function saveTransferDetail(transferID,Tank,BeforeFeet,BeforeInches,Gallons,Direction,Comments, AfterFeet, AfterInches, Completed) {
   
  // //Ceegan Updated to include after in the same detail record. 
  //       var transferDetailRecord = {
  //         TransferID: transferID,
  //         Tank: Tank,
  //         BeforeFeet: BeforeFeet,
  //         BeforeInches: BeforeInches,
  //         Gallons: Gallons,
  //         Direction: Direction,
  //         Comments: Comments,
  //         AfterFeet: AfterFeet,
  //         AfterInches: AfterInches,  
  //         Completed: Completed

  //         //ReasonCode: window.getCookie('weightMasterLicenseNumber'),
  //       };
    
  
  //       var transferDetailRecordJSON = JSON.stringify(transferDetailRecord);



  //       const settings = {
  //         "async": true,
  //         "crossDomain": true,
  //         "url": APIConnection + "insertDetails",
  //         "method": "POST",
  //         "headers": {
            
  //           "content-type": "application/json"
  //         },
  //         "processData": false,
  //         "data": transferDetailRecordJSON
  //       };
        
  //       $.ajax(settings).done(function (response) {
  //         console.log(response);
          
           
  //       });

    

  // }
 async function saveTransferDetail(transferID, Tank, BeforeFeet, BeforeInches, Gallons, Direction, Comments, AfterFeet, AfterInches, Completed) {
    const transferDetailRecord = {
        TransferID: transferID,
        Tank: Tank,
        BeforeFeet: BeforeFeet,
        BeforeInches: BeforeInches,
        Gallons: Gallons,
        Direction: Direction,
        Comments: Comments,
        AfterFeet: AfterFeet,
        AfterInches: AfterInches,
        Completed: Completed,
    };

    const transferDetailRecordJSON = JSON.stringify(transferDetailRecord);

    const settings = {
        async: true,
        crossDomain: true,
        url: APIConnection + 'insertDetails',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        processData: false,
        data: transferDetailRecordJSON,
    };

    return $.ajax(settings)
        .done((response) => {
          if (response && response.someExpectedProperty && response.statusText === 'OK') {
            console.log('Detail saved successfully:', response);
        } else {
            console.error('Unexpected response:', response);
        }
        });
}
   async function saveTransferDetailUpdate(transferID,Tank,BeforeFeet,BeforeInches,Gallons,Direction,Comments, AfterFeet, AfterInches, Completed) {
        console.log("TransferID" + transferID)
        console.log("BeforeFeet" + BeforeFeet)
        console.log("BeforeInches" + BeforeInches)
        console.log("Gallons" + Gallons)
        console.log("Direction" + Direction)
        console.log("BeforeFeet" + Comments)
        console.log("BeforeFeet" + AfterFeet)
        console.log("BeforeFeet" + AfterInches)

         BeforeFeet = BeforeFeet === '' ? '0' : BeforeFeet;
         BeforeInches = BeforeInches === '' ? '0' : BeforeInches;
         Gallons = Gallons === '' ? '0' : Gallons;
         AfterFeet = AfterFeet === '' ? '0' : AfterFeet;
        AfterInches = AfterInches === '' ? '0' : AfterInches;

    //Ceegan Updated to include after in the same detail record. 
          var transferDetailRecord = {
            TransferID: transferID,
            Tank: Tank,
            BeforeFeet: BeforeFeet,
            BeforeInches: BeforeInches,
            Gallons: Gallons,
            Direction: Direction,
            Comments: Comments,
            AfterFeet: AfterFeet,
            AfterInches: AfterInches,  
            Completed: Completed
  
            //ReasonCode: window.getCookie('weightMasterLicenseNumber'),
          };
      
    
          var transferDetailRecordJSON = JSON.stringify(transferDetailRecord);
  
  
  
          const settings = {
            "async": true,
            "crossDomain": true,
            "url": APIConnection + "insertDetails",
            "method": "POST",
            "headers": {
              
              "content-type": "application/json"
            },
            "processData": false,
            "data": transferDetailRecordJSON
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            
             
          });
  
      
  
    }

function loadjsGridTransferTicket(){
  


    var searchParam = {
      searchParam: "",
      unitLogin: os.userInfo().username
      //serachParam: document.getElementById('searchTransfer').value,
    };
      //searchParam: ""
      //serachParam: document.getElementById('searchTransfer').value,
 
 
  var searchParamJSON = JSON.stringify(searchParam);
  
console.log(searchParamJSON)

    const settings = {
      "async": true,
      "crossDomain": true,
      "url": APIConnection + "OpenTransferSearchWithTank",
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "processData": false,
      "data": searchParamJSON
    };



    $("#transferTicketjsGrid").jsGrid({
        height: "auto",
        width: "100%",
        sorting: true,
        paging: true,
        autoload: true,
        confirmDeleting: false,
        selecting: true,
  
        pageSize: 10,
        pageIndex: 1,
        onItemUpdated: paint(),
        onRefreshed: paint(),
        controller: {
            loadData: function () {
                var d = $.Deferred();
            
                $.ajax(settings).done(function (response) {
                   
                    d.resolve(response);
                });

                return d.promise();
            }
        },
        fields: [
          { name: "TransferID", title: "TransferID", type: "text", width: 200 },
          { name: "FirstTank", title: "Tank/Order", type: "text", width: 200 },
            { name: "Login", title: "Operator", type: "text", width: 200 },
            { name: "TransferedBy", title: "TransferedBy", type: "text", width: 200 },
            { name: "TransferedByEnding", title: "TransferedByEnding", type: "text", width: 200 },
            { name: "Unit", title: "Unit", type: "text", width: 200 },
            { name: "ReasonCode", title: "ReasonCode", type: "text", width: 200 },
            { name: "StartTime", title: "StartTime", type: "text", width: 200 },
            { name: "EndTime", title: "EndTime", type: "text", width: 200 },
   
       ],
       rowClass: function(item, itemIndex) {
        console.log("ItemIndex")
        console.log(itemIndex)

        var startDate = new Date(item.StartTime); // Assuming StartTime is a date string
        var currentDate = new Date();
        var diffInHours = (currentDate - startDate) / (1000 * 60 * 60); // Calculate difference in hours
        console.log("Item Start Time:")
        console.log(item.StartTime)
        if (diffInHours < 8) {
          console.log('In Green!');
          return "bg-green";
       // return { backgroundColor: "green" }; // Class name for green rows
      } else if (diffInHours >= 8 && diffInHours < 24) {
        console.log('In Yellow!');
          return "bg-yellow"; // Class name for yellow rows
      } else {
        console.log('In Red!');
          return "bg-red"; // Class name for red rows
      }

    },

  

       rowDoubleClick: function(args){
        var getData = args.item;
        var keys = Object.keys(getData);
        var text = [];

        document.getElementById("editTransferCompleted1").checked = false
        document.getElementById("editTransferCompleted2").checked = false
        document.getElementById("editTransferCompleted3").checked = false
        document.getElementById("editTransferCompleted4").checked = false
        document.getElementById("editTransferCompleted5").checked = false
        document.getElementById("deleteTransfer").style.display = "block"
        document.getElementById("updateTransferBtn").style.display = "block"
        document.getElementById("completeTransfer").style.display = "block"
//clear values first
document.getElementById("editTransferDetailID1").value = ""
document.getElementById("editTransferDetailID2").value = ""
document.getElementById("editTransferDetailID3").value = ""
document.getElementById("editTransferDetailID4").value = ""
document.getElementById("editTransferDetailID5").value = ""


//Populate details grid here
//editTranferTank1
document.getElementById("editTranferTank1").value = ""
document.getElementById("editTranferTank2").value = ""
document.getElementById("editTranferTank3").value = ""
document.getElementById("editTranferTank4").value = ""
document.getElementById("editTranferTank5").value = ""



        //GetReasonCodeEdit()

        
        document.getElementById("transferMachineLogonEdit").value=  os.userInfo().username

        console.log(args.item["TransferID"])
        //console.log("Should Have logged transferID")
        console.log(args.item["Login"])
       // console.log("Should Have logged Login")

        console.log(args.item["TransferedBy"])
        //console.log("Should Have logged TransferedBy")

        document.getElementById("transferOperatorEdit").value = args.item["TransferedBy"]
        document.getElementById("transferOperatorFinishEdit").value = args.item["TransferedByEnding"]
   
        if (args.item["StartTime"] != null) {
        document.getElementById("transferTimeStartEdit").value = args.item["StartTime"].slice(0,-5)
        }
        if (args.item["EndTime"] != null){
        document.getElementById("transferTimeFinishEdit").value = args.item["EndTime"].slice(0,-5)
        }
        document.getElementById("transferHeaderIDEdit").value = args.item["TransferID"]
        document.getElementById("transferHeaderIDEdit").disabled = true


        var ticketRecordDetailSearch = {
          searchParam: args.item["TransferID"].toString(),
          
        };
        console.log(ticketRecordDetailSearch)
        var ticketRecordDetailSearchJSON = JSON.stringify(ticketRecordDetailSearch);
        const settings = {
          "async": true,
          "crossDomain": true,
        
          "url": APIConnection + "transferDetailSearch",
          "method": "POST",
          "headers": {
          
            "content-type": "application/json"
          },
          "processData": false,
          "data": ticketRecordDetailSearchJSON
        };
        
        $.ajax(settings).done(function (response) {
          document.getElementById("updateMSG").value = ""
         
        
          // document.getElementById("editTranferTank6").value = ""
          // document.getElementById("editTranferTank7").value = ""
          // document.getElementById("editTranferTank8").value = ""
          // document.getElementById("editTranferTank9").value = ""
          // document.getElementById("editTranferTank10").value = ""
          
          document.getElementById("editTransferGallons1").value = ""
          document.getElementById("editTransferGallons2").value = ""
          document.getElementById("editTransferGallons3").value = ""
          document.getElementById("editTransferGallons4").value = ""
          document.getElementById("editTransferGallons5").value = ""
          // document.getElementById("editTransferGallons6").value = ""
          // document.getElementById("editTransferGallons7").value = ""
          // document.getElementById("editTransferGallons8").value = ""
          // document.getElementById("editTransferGallons9").value = ""
          // document.getElementById("editTransferGallons10").value = ""

          document.getElementById("editTransferFeet1").value = ""
          document.getElementById("editTransferFeet2").value = ""
          document.getElementById("editTransferFeet3").value = ""
          document.getElementById("editTransferFeet4").value = ""
          document.getElementById("editTransferFeet5").value = ""
          // document.getElementById("editTransferFeet6").value = ""
          // document.getElementById("editTransferFeet7").value = ""
          // document.getElementById("editTransferFeet8").value = ""
          // document.getElementById("editTransferFeet9").value = ""
          // document.getElementById("editTransferFeet10").value = ""
          
          document.getElementById("editTranferInches1").value = ""
          document.getElementById("editTranferInches2").value = ""
          document.getElementById("editTranferInches3").value = ""
          document.getElementById("editTranferInches4").value = ""
          document.getElementById("editTranferInches5").value = ""
          // document.getElementById("editTranferInches6").value = ""
          // document.getElementById("editTranferInches7").value = ""
          // document.getElementById("editTranferInches8").value = ""
          // document.getElementById("editTranferInches9").value = ""
          // document.getElementById("editTranferInches10").value = ""

          document.getElementById("editTranferComments1").value = ""
          document.getElementById("editTranferComments2").value = ""
          document.getElementById("editTranferComments3").value = ""
          document.getElementById("editTranferComments4").value = ""
          document.getElementById("editTranferComments5").value = ""
          // document.getElementById("editTranferComments6").value = ""
          // document.getElementById("editTranferComments7").value = ""
          // document.getElementById("editTranferComments8").value = ""
          // document.getElementById("editTranferComments9").value = ""
          // document.getElementById("editTranferComments10").value = ""



          document.getElementById("editTransferAfterFeet1").value = ""
          document.getElementById("editTransferAfterFeet2").value = ""
          document.getElementById("editTransferAfterFeet3").value = ""
          document.getElementById("editTransferAfterFeet4").value = ""
          document.getElementById("editTransferAfterFeet5").value = ""
          // document.getElementById("editTransferAfterFeet6").value = ""
          // document.getElementById("editTransferAfterFeet7").value = ""
          // document.getElementById("editTransferAfterFeet8").value = ""
          // document.getElementById("editTransferAfterFeet9").value = ""
          // document.getElementById("editTransferAfterFeet10").value = ""


          
          document.getElementById("editTranferAfterInches1").value = ""
          document.getElementById("editTranferAfterInches2").value = ""
          document.getElementById("editTranferAfterInches3").value = ""
          document.getElementById("editTranferAfterInches4").value = ""
          document.getElementById("editTranferAfterInches5").value = ""
          // document.getElementById("editTranferAfterInches6").value = ""
          // document.getElementById("editTranferAfterInches7").value = ""
          // document.getElementById("editTranferAfterInches8").value = ""
          // document.getElementById("editTranferAfterInches9").value = ""
          // document.getElementById("editTranferAfterInches10").value = ""



          var $myData = response;
  
          var arrayAmount = $myData.length;
          var i = 0;
          for (i = 0; i < arrayAmount; i++) {
             
              // console.log($myData[i].TransferDetailID)
              // console.log($myData[i].Tank)
              // console.log($myData[i].Feet)
              // console.log($myData[i].Inches)
              // console.log($myData[i].Gallons)
              // console.log($myData[i].Direction)
              // console.log($myData[i].Comments)
             if (i == 0) {
              document.getElementById("editTransferDetailID1").value = $myData[i].TransferDetailsID
              console.log($myData[i].Tank)
              document.getElementById("editTranferTank1").value = $myData[i].Tank
              document.getElementById("editTransferGallons1").value = $myData[i].Gallons
              document.getElementById("editTransferFeet1").value = $myData[i].BeforeFeet
              document.getElementById("editTranferInches1").value = $myData[i].BeforeInches
              document.getElementById("editTransferDirection1").value = $myData[i].Direction
              document.getElementById("editTransferAfterFeet1").value = $myData[i].AfterFeet
              document.getElementById("editTranferAfterInches1").value = $myData[i].AfterInches
              document.getElementById("editTranferComments1").value = $myData[i].Comments
              //document.getElementById("fromLineItemComplete1").value = $myData[i].Completed
              //console.log($myData[i].Completed)
              //document.getElementById("fromLineItemComplete1").checked =  true
              //add comments and Checkbox?
             }
      
             if (i==1){
              document.getElementById("editTransferDetailID2").value = $myData[i].TransferDetailsID
              console.log($myData[i].Tank)
              document.getElementById("editTranferTank2").value = $myData[i].Tank
              document.getElementById("editTransferGallons2").value = $myData[i].Gallons
              document.getElementById("editTransferFeet2").value = $myData[i].BeforeFeet
              document.getElementById("editTranferInches2").value = $myData[i].BeforeInches
              document.getElementById("editTransferDirection2").value = $myData[i].Direction
              document.getElementById("editTransferAfterFeet2").value = $myData[i].AfterFeet
              document.getElementById("editTranferAfterInches2").value = $myData[i].AfterInches
              document.getElementById("editTranferComments2").value = $myData[i].Comments
              //ocument.getElementById("fromLineItemComplete1").value = $myData[i].Completed
              
             }
             if (i==2){
              document.getElementById("editTransferDetailID3").value = $myData[i].TransferDetailsID
              console.log($myData[i].Tank)
              document.getElementById("editTranferTank3").value = $myData[i].Tank
              document.getElementById("editTransferGallons3").value = $myData[i].Gallons
              document.getElementById("editTransferFeet3").value = $myData[i].BeforeFeet
              document.getElementById("editTranferInches3").value = $myData[i].BeforeInches
              document.getElementById("editTransferDirection3").value = $myData[i].Direction
              document.getElementById("editTransferAfterFeet3").value = $myData[i].AfterFeet
              document.getElementById("editTranferAfterInches3").value = $myData[i].AfterInches
              document.getElementById("editTranferComments3").value = $myData[i].Comments
             // document.getElementById("fromLineItemComplete1").value = $myData[i].Completed
             //document.getElementById("fromLineItemComplete1").checked =  true

             }
             if (i==3){
              document.getElementById("editTransferDetailID4").value = $myData[i].TransferDetailsID
              console.log($myData[i].Tank)
              document.getElementById("editTranferTank4").value = $myData[i].Tank
              document.getElementById("editTransferGallons4").value = $myData[i].Gallons
              document.getElementById("editTransferFeet4").value = $myData[i].BeforeFeet
              document.getElementById("editTranferInches4").value = $myData[i].BeforeInches
              document.getElementById("editTransferDirection4").value = $myData[i].Direction
              document.getElementById("editTransferAfterFeet4").value = $myData[i].AfterFeet
              document.getElementById("editTranferAfterInches4").value = $myData[i].AfterInches
              document.getElementById("editTranferComments4").value = $myData[i].Comments
              //document.getElementById("fromLineItemComplete1").value = $myData[i].Completed
             }
             if (i==4){
              document.getElementById("editTransferDetailID5").value = $myData[i].TransferDetailsID
              console.log($myData[i].Tank)
              document.getElementById("editTranferTank5").value = $myData[i].Tank
              document.getElementById("editTransferGallons5").value = $myData[i].Gallons
              document.getElementById("editTransferFeet5").value = $myData[i].BeforeFeet
              document.getElementById("editTranferInches5").value = $myData[i].BeforeInches
              document.getElementById("editTransferDirection5").value = $myData[i].Direction
              document.getElementById("editTransferAfterFeet5").value = $myData[i].AfterFeet
              document.getElementById("editTranferAfterInches5").value = $myData[i].AfterInches
              document.getElementById("editTranferComments5").value = $myData[i].Comments
              //document.getElementById("fromLineItemComplete1").value = $myData[i].Completed
             }
            //  if (i==5){
            //   document.getElementById("editTransferDetailID6").value = $myData[i].TransferDetailsID
            //   console.log($myData[i].Tank)
            //   document.getElementById("editTranferTank6").value = $myData[i].Tank
            //   document.getElementById("editTransferGallons6").value = $myData[i].Gallons
            //   document.getElementById("editTransferFeet6").value = $myData[i].BeforeFeet
            //   document.getElementById("editTranferInches6").value = $myData[i].BeforeInches
            //   document.getElementById("editTransferDirection6").value = $myData[i].Direction
            //   document.getElementById("editTransferAfterFeet6").value = $myData[i].AfterFeet
            //   document.getElementById("editTranferAfterInches6").value = $myData[i].AfterInches
            //  }
            //  if (i==6){
            //   document.getElementById("editTransferDetailID7").value = $myData[i].TransferDetailsID
            //   console.log($myData[i].Tank)
            //   document.getElementById("editTranferTank7").value = $myData[i].Tank
            //   document.getElementById("editTransferGallons7").value = $myData[i].Gallons
            //   document.getElementById("editTransferFeet7").value = $myData[i].BeforeFeet
            //   document.getElementById("editTranferInches7").value = $myData[i].BeforeInches
            //   document.getElementById("editTransferDirection7").value = $myData[i].Direction
            //   document.getElementById("editTransferAfterFeet7").value = $myData[i].AfterFeet
            //   document.getElementById("editTranferAfterInches7").value = $myData[i].AfterInches
            //  }
            //  if (i==7){
            //   document.getElementById("editTransferDetailID8").value = $myData[i].TransferDetailsID
            //   console.log($myData[i].Tank)
            //   document.getElementById("editTranferTank8").value = $myData[i].Tank
            //   document.getElementById("editTransferGallons8").value = $myData[i].Gallons
            //   document.getElementById("editTransferFeet8").value = $myData[i].BeforeFeet
            //   document.getElementById("editTranferInches8").value = $myData[i].BeforeInches
            //   document.getElementById("editTransferDirection8").value = $myData[i].Direction
            //   document.getElementById("editTransferAfterFeet8").value = $myData[i].AfterFeet
            //   document.getElementById("editTranferAfterInches8").value = $myData[i].AfterInches
            //  }
            //  if (i==8){
            //   document.getElementById("editTransferDetailID9").value = $myData[i].TransferDetailsID
            //   console.log($myData[i].Tank)
            //   document.getElementById("editTranferTank9").value = $myData[i].Tank
            //   document.getElementById("editTransferGallons9").value = $myData[i].Gallons
            //   document.getElementById("editTransferFeet9").value = $myData[i].BeforeFeet
            //   document.getElementById("editTranferInches9").value = $myData[i].BeforeInches
            //   document.getElementById("editTransferDirection9").value = $myData[i].Direction
            //   document.getElementById("editTransferAfterFeet9").value = $myData[i].AfterFeet
            //   document.getElementById("editTranferAfterInches9").value = $myData[i].AfterInches
            //  }
            //  if (i==9){
            //   document.getElementById("editTransferDetailID10").value = $myData[i].TransferDetailsID
            //   console.log($myData[i].Tank)
            //   document.getElementById("editTranferTank10").value = $myData[i].Tank
            //   document.getElementById("editTransferGallons10").value = $myData[i].Gallons
            //   document.getElementById("editTransferFeet10").value = $myData[i].BeforeFeet
            //   document.getElementById("editTranferInches10").value = $myData[i].BeforeInches
            //   document.getElementById("editTransferDirection10").value = $myData[i].Direction
            //   document.getElementById("editTransferAfterFeet10").value = $myData[i].AfterFeet
            //   document.getElementById("editTranferAfterInches10").value = $myData[i].AfterInches
            //  }
              
          }


          document.getElementById("editTransferDetailID1").disabled = true
          document.getElementById("editTransferDetailID2").disabled = true
          document.getElementById("editTransferDetailID3").disabled = true
          document.getElementById("editTransferDetailID4").disabled = true
          document.getElementById("editTransferDetailID5").disabled = true
          // document.getElementById("editTransferDetailID6").disabled = true
          // document.getElementById("editTransferDetailID7").disabled = true
          // document.getElementById("editTransferDetailID8").disabled = true
          // document.getElementById("editTransferDetailID9").disabled = true
          // document.getElementById("editTransferDetailID10").disabled = true

          
          console.log(response);


        });




    
        $.each(keys, function(idx, value) {
          text.push(value + " : " + getData[value])
        });
    
        //alert(text.join(", "))
    



        openTicketTabs(event,'editTransfer')
       $('html, body').animate({ scrollTop: 0 }, 'fast');
       for (var option of document.getElementById("transferReasonCode1Edit").options)
       {
       if (option.value === args.item["ReasonCode"])
       {
           option.selected = true;
           return
       }
       }
      }

    
    });

    function paint(ev) {
      $("#jsGrid tbody tr").each((i, tr) => {
          var value = parseInt(tr.children[0].textContent); // Assuming the value to compare is in the first column
          var color = value < 30 ? "red" : ""; // Change color to red if value is less than 30
          $(tr).children().css("background-color", color);
      });
  }
  

}




function loadjsGridClosedTransferTicket(){
  
  var searchParam = {
    searchParam: document.getElementById('searchClosedTransfer').value,
    unitLogin: os.userInfo().username,
    StartDate: document.getElementById('searchTransferDateStartClosed').value,
    EndDate: document.getElementById('searchTransferDateEndClosed').value
  
    //serachParam: document.getElementById('searchTransfer').value,
  };
    //searchParam: ""
    //serachParam: document.getElementById('searchTransfer').value,


var searchParamJSON = JSON.stringify(searchParam);
console.log(searchParamJSON)

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "CompletedTransferWithFirstTankSearch",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "processData": false,
    "data": searchParamJSON
  };



  $("#closedTransferTicketjsGrid").jsGrid({
      height: "auto",
      width: "100%",
      sorting: true,
      paging: true,
      autoload: true,
      confirmDeleting: false,
      selecting: true,
      pageSize: 10,
      pageIndex: 1,
      controller: {
          loadData: function () {
              var d = $.Deferred();
          
              $.ajax(settings).done(function (response) {
                 
                  d.resolve(response);
              });

              return d.promise();
          }
      },
      fields: [
        { name: "TransferID", title: "TransferID", type: "text", width: 200 },
        { name: "FirstTank", title: "Tank/Order", type: "text", width: 200 },
          { name: "Login", title: "Operator", type: "text", width: 200 },
          { name: "TransferedBy", title: "TransferedBy", type: "text", width: 200 },
          { name: "Unit", title: "Unit", type: "text", width: 200 },
          { name: "ReasonCode", title: "ReasonCode", type: "text", width: 200 },
          { name: "StartTime", title: "StartTime", type: "text", width: 200 },
          { name: "EndTime", title: "EndTime", type: "text", width: 200 }
 
     ],
     rowDoubleClick: function(args){
      var getData = args.item;
      var keys = Object.keys(getData);
      var text = [];

      document.getElementById("deleteTransfer").style.display = "none"
      document.getElementById("updateTransferBtn").style.display = "none"
      document.getElementById("completeTransfer").style.display = "none"
      //Popluate grid now with all detail records as well as header info.

      // document.getElementById('editTransferDetailID').value = args.item["TransferDetailID"]
      // document.getElementById('editTranferTank').value = args.item["Tank"]
      // document.getElementById('editTransferGallons').value = args.item["Feet"]
      // document.getElementById('editTransferFeet').value = args.item["Inches"]
      // document.getElementById('editTranferInches').value = args.item["Gallons"]
      // document.getElementById('editTranferComments').value = args.item["Comments"]
      // //populate grid screen
      // document.getElementById('editTransferDetailID').disabled = true
      // document.getElementById('editTransferCompleted').checked = true
      var ticketRecordDetailSearch = {
        searchParam: args.item["TransferID"].toString(),
        
      };
      console.log(ticketRecordDetailSearch)
      var ticketRecordDetailSearchJSON = JSON.stringify(ticketRecordDetailSearch);
      const settings = {
        "async": true,
        "crossDomain": true,
      
        "url": APIConnection + "transferDetailSearch",
        "method": "POST",
        "headers": {
        
          "content-type": "application/json"
        },
        "processData": false,
        "data": ticketRecordDetailSearchJSON
      };
      
      $.ajax(settings).done(function (response) {
        document.getElementById("updateMSG").value = ""
        //GetReasonCodeEdit()
        //clear header records before setting
        document.getElementById("transferHeaderIDEdit").value = ''
        //document.getElementById("transferReasonCode1Edit").value = ''
        document.getElementById("transferOperatorEdit").value = ''
        document.getElementById("transferOperatorFinishEdit").value = ''
        document.getElementById("transferTimeStartEdit").value = ''
        document.getElementById("transferTimeFinishEdit").value = ''
        document.getElementById("transferMachineLogonEdit").value = ''

//setting values for header from gridview
        document.getElementById("transferHeaderIDEdit").value = args.item["TransferID"]
        //document.getElementById("transferReasonCode1Edit").value = args.item["ReasonCode"]

        document.getElementById("transferOperatorEdit").value = args.item["Login"]
        document.getElementById("transferOperatorFinishEdit").value = args.item["TransferID"]
        document.getElementById("transferTimeStartEdit").value = args.item["StartTime"].slice(0,-5)
        document.getElementById("transferTimeFinishEdit").value = args.item["EndTime"].slice(0,-5)
      
 
      

       // document.getElementById("transferMachineLogonEdit").value = args.item["TransferID"]


       
        document.getElementById("editTransferDetailID1").value = ""
        document.getElementById("editTransferDetailID2").value = ""
        document.getElementById("editTransferDetailID3").value = ""
        document.getElementById("editTransferDetailID4").value = ""
        document.getElementById("editTransferDetailID5").value = ""
     

        //Populate details grid here
        editTranferTank1
        document.getElementById("editTranferTank1").value = ""
        document.getElementById("editTranferTank2").value = ""
        document.getElementById("editTranferTank3").value = ""
        document.getElementById("editTranferTank4").value = ""
        document.getElementById("editTranferTank5").value = ""
        
        
        document.getElementById("editTransferGallons1").value = ""
        document.getElementById("editTransferGallons2").value = ""
        document.getElementById("editTransferGallons3").value = ""
        document.getElementById("editTransferGallons4").value = ""
        document.getElementById("editTransferGallons5").value = ""
    

        document.getElementById("editTransferFeet1").value = ""
        document.getElementById("editTransferFeet2").value = ""
        document.getElementById("editTransferFeet3").value = ""
        document.getElementById("editTransferFeet4").value = ""
        document.getElementById("editTransferFeet5").value = ""
     
        
        document.getElementById("editTranferInches1").value = ""
        document.getElementById("editTranferInches2").value = ""
        document.getElementById("editTranferInches3").value = ""
        document.getElementById("editTranferInches4").value = ""
        document.getElementById("editTranferInches5").value = ""
   

        document.getElementById("editTranferComments1").value = ""
        document.getElementById("editTranferComments2").value = ""
        document.getElementById("editTranferComments3").value = ""
        document.getElementById("editTranferComments4").value = ""
        document.getElementById("editTranferComments5").value = ""
      



        document.getElementById("editTransferAfterFeet1").value = ""
        document.getElementById("editTransferAfterFeet2").value = ""
        document.getElementById("editTransferAfterFeet3").value = ""
        document.getElementById("editTransferAfterFeet4").value = ""
        document.getElementById("editTransferAfterFeet5").value = ""
       


        
        document.getElementById("editTranferAfterInches1").value = ""
        document.getElementById("editTranferAfterInches2").value = ""
        document.getElementById("editTranferAfterInches3").value = ""
        document.getElementById("editTranferAfterInches4").value = ""
        document.getElementById("editTranferAfterInches5").value = ""


        document.getElementById("transferReasonCode1Edit").selectedIndex = 2
        


        var $myData = response;

        var arrayAmount = $myData.length;
        var i = 0;
        for (i = 0; i < arrayAmount; i++) {
           
            // console.log($myData[i].TransferDetailID)
            // console.log($myData[i].Tank)
            // console.log($myData[i].Feet)
            // console.log($myData[i].Inches)
            // console.log($myData[i].Gallons)
            // console.log($myData[i].Direction)
            // console.log($myData[i].Comments)
           if (i == 0) {
            document.getElementById("editTransferDetailID1").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank1").value = $myData[i].Tank
            document.getElementById("editTransferGallons1").value = $myData[i].Gallons
            document.getElementById("editTransferFeet1").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches1").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection1").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet1").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches1").value = $myData[i].AfterInches
            document.getElementById("editTranferComments1").value = $myData[i].Comments
            //add comments and Checkbox?
           }
    
           if (i==1){
            document.getElementById("editTransferDetailID2").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank2").value = $myData[i].Tank
            document.getElementById("editTransferGallons2").value = $myData[i].Gallons
            document.getElementById("editTransferFeet2").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches2").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection2").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet2").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches2").value = $myData[i].AfterInches
            document.getElementById("editTranferComments2").value = $myData[i].Comments
            
           }
           if (i==2){
            document.getElementById("editTransferDetailID3").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank3").value = $myData[i].Tank
            document.getElementById("editTransferGallons3").value = $myData[i].Gallons
            document.getElementById("editTransferFeet3").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches3").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection3").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet3").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches3").value = $myData[i].AfterInches
            document.getElementById("editTranferComments3").value = $myData[i].Comments
           }
           if (i==3){
            document.getElementById("editTransferDetailID4").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank4").value = $myData[i].Tank
            document.getElementById("editTransferGallons4").value = $myData[i].Gallons
            document.getElementById("editTransferFeet4").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches4").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection4").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet4").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches4").value = $myData[i].AfterInches
            document.getElementById("editTranferComments4").value = $myData[i].Comments
           }
           if (i==4){
            document.getElementById("editTransferDetailID5").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank5").value = $myData[i].Tank
            document.getElementById("editTransferGallons5").value = $myData[i].Gallons
            document.getElementById("editTransferFeet5").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches5").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection5").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet5").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches5").value = $myData[i].AfterInches
            document.getElementById("editTranferComments5").value = $myData[i].Comments
           }

            
        }


        document.getElementById("editTransferDetailID1").disabled = true
        document.getElementById("editTransferDetailID2").disabled = true
        document.getElementById("editTransferDetailID3").disabled = true
        document.getElementById("editTransferDetailID4").disabled = true
        document.getElementById("editTransferDetailID5").disabled = true
  

        
        console.log(response);


      });

      $.each(keys, function(idx, value) {
        text.push(value + " : " + getData[value])
      });
  
      //alert(text.join(", "))
  



      openTicketTabs(event,'editTransfer')
     $('html, body').animate({ scrollTop: 0 }, 'fast');
     for (var option of document.getElementById("transferReasonCode1Edit").options)
     {
     if (option.value === args.item["ReasonCode"])
     {
         option.selected = true;
       return
     }
     }
    }
  });

}

function loadjsGridAllTransferTicket(){
  
  var searchParam = {
    searchParam: document.getElementById('searchAllClosedTransfer').value,
    StartDate: document.getElementById('searchTransferDateStartAll').value,
    EndDate: document.getElementById('searchTransferDateEndAll').value
   // unitLogin: os.userInfo().username
    //serachParam: document.getElementById('searchTransfer').value,
  };
    //searchParam: ""
    //serachParam: document.getElementById('searchTransfer').value,


var searchParamJSON = JSON.stringify(searchParam);
console.log(searchParamJSON)

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "AllTransferSearchWithFirstTank",
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "processData": false,
    "data": searchParamJSON
  };



  $("#closedAllTransferTicketjsGrid").jsGrid({
      height: "auto",
      width: "100%",
      sorting: true,
      paging: true,
      autoload: true,
      confirmDeleting: false,
      selecting: true,
      pageSize: 10,
      pageIndex: 1,
      controller: {
          loadData: function () {
              var d = $.Deferred();
          
              $.ajax(settings).done(function (response) {
                 
                  d.resolve(response);
              });

              return d.promise();
          }
      },
      fields: [
        { name: "TransferID", title: "TransferID", type: "text", width: 200 },
        { name: "FirstTank", title: "Tank/Order", type: "text", width: 200 },
          { name: "Login", title: "Operator", type: "text", width: 200 },
          { name: "TransferedBy", title: "TransferedBy", type: "text", width: 200 },
          { name: "Unit", title: "Unit", type: "text", width: 200 },
          { name: "ReasonCode", title: "ReasonCode", type: "text", width: 200 },
          { name: "StartTime", title: "StartTime", type: "text", width: 200 },
          { name: "EndTime", title: "EndTime", type: "text", width: 200 }
 
     ],
     rowDoubleClick: function(args){
      var getData = args.item;
      var keys = Object.keys(getData);
      var text = [];

      document.getElementById("deleteTransfer").style.display = "none"
      document.getElementById("updateTransferBtn").style.display = "none"
      document.getElementById("completeTransfer").style.display = "none"

      //Popluate grid now with all detail records as well as header info.

      // document.getElementById('editTransferDetailID').value = args.item["TransferDetailID"]
      // document.getElementById('editTranferTank').value = args.item["Tank"]
      // document.getElementById('editTransferGallons').value = args.item["Feet"]
      // document.getElementById('editTransferFeet').value = args.item["Inches"]
      // document.getElementById('editTranferInches').value = args.item["Gallons"]
      // document.getElementById('editTranferComments').value = args.item["Comments"]
      // //populate grid screen
      // document.getElementById('editTransferDetailID').disabled = true
      // document.getElementById('editTransferCompleted').checked = true
      var ticketRecordDetailSearch = {
        searchParam: args.item["TransferID"].toString(),
        
      };
      console.log(ticketRecordDetailSearch)
      var ticketRecordDetailSearchJSON = JSON.stringify(ticketRecordDetailSearch);
      const settings = {
        "async": true,
        "crossDomain": true,
      
        "url": APIConnection + "transferDetailSearch",
        "method": "POST",
        "headers": {
        
          "content-type": "application/json"
        },
        "processData": false,
        "data": ticketRecordDetailSearchJSON
      };
      
      $.ajax(settings).done(function (response) {
        document.getElementById("updateMSG").value = ""
        //GetReasonCodeEdit()
        //clear header records before setting
        document.getElementById("transferHeaderIDEdit").value = ''
        //document.getElementById("transferReasonCode1Edit").value = ''
        document.getElementById("transferOperatorEdit").value = ''
        document.getElementById("transferOperatorFinishEdit").value = ''
        document.getElementById("transferTimeStartEdit").value = ''
        document.getElementById("transferTimeFinishEdit").value = ''
        document.getElementById("transferMachineLogonEdit").value = ''

//setting values for header from gridview
        document.getElementById("transferHeaderIDEdit").value = args.item["TransferID"]
        //document.getElementById("transferReasonCode1Edit").value = args.item["ReasonCode"]

        document.getElementById("transferOperatorEdit").value = args.item["Login"]
        document.getElementById("transferOperatorFinishEdit").value = args.item["TransferID"]
        document.getElementById("transferTimeStartEdit").value = args.item["StartTime"].slice(0,-5)
        document.getElementById("transferTimeFinishEdit").value = args.item["EndTime"].slice(0,-5)
      
 
      

       // document.getElementById("transferMachineLogonEdit").value = args.item["TransferID"]


       
        document.getElementById("editTransferDetailID1").value = ""
        document.getElementById("editTransferDetailID2").value = ""
        document.getElementById("editTransferDetailID3").value = ""
        document.getElementById("editTransferDetailID4").value = ""
        document.getElementById("editTransferDetailID5").value = ""
     

        //Populate details grid here
        editTranferTank1
        document.getElementById("editTranferTank1").value = ""
        document.getElementById("editTranferTank2").value = ""
        document.getElementById("editTranferTank3").value = ""
        document.getElementById("editTranferTank4").value = ""
        document.getElementById("editTranferTank5").value = ""
        
        
        document.getElementById("editTransferGallons1").value = ""
        document.getElementById("editTransferGallons2").value = ""
        document.getElementById("editTransferGallons3").value = ""
        document.getElementById("editTransferGallons4").value = ""
        document.getElementById("editTransferGallons5").value = ""
    

        document.getElementById("editTransferFeet1").value = ""
        document.getElementById("editTransferFeet2").value = ""
        document.getElementById("editTransferFeet3").value = ""
        document.getElementById("editTransferFeet4").value = ""
        document.getElementById("editTransferFeet5").value = ""
     
        
        document.getElementById("editTranferInches1").value = ""
        document.getElementById("editTranferInches2").value = ""
        document.getElementById("editTranferInches3").value = ""
        document.getElementById("editTranferInches4").value = ""
        document.getElementById("editTranferInches5").value = ""
   

        document.getElementById("editTranferComments1").value = ""
        document.getElementById("editTranferComments2").value = ""
        document.getElementById("editTranferComments3").value = ""
        document.getElementById("editTranferComments4").value = ""
        document.getElementById("editTranferComments5").value = ""
      



        document.getElementById("editTransferAfterFeet1").value = ""
        document.getElementById("editTransferAfterFeet2").value = ""
        document.getElementById("editTransferAfterFeet3").value = ""
        document.getElementById("editTransferAfterFeet4").value = ""
        document.getElementById("editTransferAfterFeet5").value = ""
       


        
        document.getElementById("editTranferAfterInches1").value = ""
        document.getElementById("editTranferAfterInches2").value = ""
        document.getElementById("editTranferAfterInches3").value = ""
        document.getElementById("editTranferAfterInches4").value = ""
        document.getElementById("editTranferAfterInches5").value = ""


        document.getElementById("transferReasonCode1Edit").selectedIndex = 2
        


        var $myData = response;

        var arrayAmount = $myData.length;
        var i = 0;
        for (i = 0; i < arrayAmount; i++) {
           
            // console.log($myData[i].TransferDetailID)
            // console.log($myData[i].Tank)
            // console.log($myData[i].Feet)
            // console.log($myData[i].Inches)
            // console.log($myData[i].Gallons)
            // console.log($myData[i].Direction)
            // console.log($myData[i].Comments)
           if (i == 0) {
            document.getElementById("editTransferDetailID1").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank1").value = $myData[i].Tank
            document.getElementById("editTransferGallons1").value = $myData[i].Gallons
            document.getElementById("editTransferFeet1").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches1").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection1").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet1").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches1").value = $myData[i].AfterInches
            document.getElementById("editTranferComments1").value = $myData[i].Comments
            //add comments and Checkbox?
           }
    
           if (i==1){
            document.getElementById("editTransferDetailID2").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank2").value = $myData[i].Tank
            document.getElementById("editTransferGallons2").value = $myData[i].Gallons
            document.getElementById("editTransferFeet2").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches2").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection2").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet2").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches2").value = $myData[i].AfterInches
            document.getElementById("editTranferComments2").value = $myData[i].Comments
            
           }
           if (i==2){
            document.getElementById("editTransferDetailID3").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank3").value = $myData[i].Tank
            document.getElementById("editTransferGallons3").value = $myData[i].Gallons
            document.getElementById("editTransferFeet3").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches3").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection3").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet3").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches3").value = $myData[i].AfterInches
            document.getElementById("editTranferComments3").value = $myData[i].Comments
           }
           if (i==3){
            document.getElementById("editTransferDetailID4").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank4").value = $myData[i].Tank
            document.getElementById("editTransferGallons4").value = $myData[i].Gallons
            document.getElementById("editTransferFeet4").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches4").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection4").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet4").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches4").value = $myData[i].AfterInches
            document.getElementById("editTranferComments4").value = $myData[i].Comments
           }
           if (i==4){
            document.getElementById("editTransferDetailID5").value = $myData[i].TransferDetailsID
            console.log($myData[i].Tank)
            document.getElementById("editTranferTank5").value = $myData[i].Tank
            document.getElementById("editTransferGallons5").value = $myData[i].Gallons
            document.getElementById("editTransferFeet5").value = $myData[i].BeforeFeet
            document.getElementById("editTranferInches5").value = $myData[i].BeforeInches
            document.getElementById("editTransferDirection5").value = $myData[i].Direction
            document.getElementById("editTransferAfterFeet5").value = $myData[i].AfterFeet
            document.getElementById("editTranferAfterInches5").value = $myData[i].AfterInches
            document.getElementById("editTranferComments5").value = $myData[i].Comments
           }

            
        }


        document.getElementById("editTransferDetailID1").disabled = true
        document.getElementById("editTransferDetailID2").disabled = true
        document.getElementById("editTransferDetailID3").disabled = true
        document.getElementById("editTransferDetailID4").disabled = true
        document.getElementById("editTransferDetailID5").disabled = true
  

        
        console.log(response);


      });

      $.each(keys, function(idx, value) {
        text.push(value + " : " + getData[value])
      });
  
      //alert(text.join(", "))
  



      openTicketTabs(event,'editTransfer')
     $('html, body').animate({ scrollTop: 0 }, 'fast');
     for (var option of document.getElementById("transferReasonCode1Edit").options)
     {
     if (option.value === args.item["ReasonCode"])
     {
         option.selected = true;
       return
     }
     }
    }
  });

}
///need to populate grid now
function setUpdateMsg(text) {
  const el = document.getElementById("updateMSG");
  if (el) {
    el.value = text;
  } else {
    // fallback if updateMSG doesn't exist on the "new" screen
    console.log(text);
  }
}

async function updateDetailRecordsButton() {
  console.log("Start Time Being Sent to database");
  console.log(document.getElementById("transferTimeStartEdit").value);
  console.log("Ending Time Being Sent to database");
  console.log(document.getElementById("transferTimeFinishEdit").value);

   const transferId = document.getElementById("transferHeaderIDEdit").value;
  const endTimeValue = document.getElementById("transferTimeFinishEdit").value;

  let finishedTankSampleResponse = "";

  // ✅ Only prompt on Save, only if any line is marked Complete
  if (anyCompleteCheckedEdit() && shouldPromptSampleOnSave(transferId, endTimeValue)) {
    finishedTankSampleResponse = getFinishedTankSampleResponse();
  }

  UpdateTransferHeader(
    transferId,
    document.getElementById("transferMachineLogonEdit").value,
    document.getElementById("transferOperatorEdit").value,
    document.getElementById("transferMachineLogonEdit").value,
    document.getElementById("transferReasonCode1Edit").value,
    document.getElementById("transferTimeStartEdit").value,
    endTimeValue,
    document.getElementById("transferOperatorFinishEdit").value
  );

  // Loop through the transfer details

  //removed looking for null / ""
  for (let i = 1; i <= 5; i++) {
    const detailId = document.getElementById(`editTransferDetailID${i}`).value;

    if (detailId.trim() === '' && (
      document.getElementById(`editTranferTank${i}`).value 
    )) {
      // Add new record
      console.log("adding record");
     await saveTransferDetailUpdate(
        document.getElementById('transferHeaderIDEdit').value,
        document.getElementById(`editTranferTank${i}`).value,
        document.getElementById(`editTransferFeet${i}`).value,
        document.getElementById(`editTranferInches${i}`).value,
        document.getElementById(`editTransferGallons${i}`).value,
        document.getElementById(`editTransferDirection${i}`).value,
        document.getElementById(`editTranferComments${i}`).value,
        document.getElementById(`editTransferAfterFeet${i}`).value,
        document.getElementById(`editTranferAfterInches${i}`).value,
        document.getElementById(`editTransferCompleted${i}`).checked
      );
    } else {
      // Update existing record
      console.log("Update")
      console.log(detailId); 
      
     await UpdateTransferDetail(
        detailId,
        document.getElementById(`editTranferTank${i}`).value,
        document.getElementById(`editTransferFeet${i}`).value,
        document.getElementById(`editTranferInches${i}`).value,
        document.getElementById(`editTransferGallons${i}`).value,
        document.getElementById(`editTransferDirection${i}`).value,
        document.getElementById(`editTranferComments${i}`).value,
        document.getElementById(`editTransferAfterFeet${i}`).value,
        document.getElementById(`editTranferAfterInches${i}`).value,
        document.getElementById(`editTransferCompleted${i}`).checked
      );
    }
   
      console.log(`Called UpdateTransferDetail for Record${i}`);
      await new Promise(resolve => setTimeout(resolve, 100));
     // await updateTransferDetailAsync(i);
      
      console.log(`Called UpdateTransferDetail for Record${i} Finish`);
    }
    

  document.getElementById("updateMSG").value = finishedTankSampleResponse
    ? `Records Updated. Finished tank sample: ${finishedTankSampleResponse}.`
    : "Records Updated";
}




function UpdateTransferHeader(TransferID,Login,TransferedBy,Unit,ReasonCode,StartTimeUpdate,EndTimeUpdate, TransferedByEnding) {
   console.log(TransferID)
   console.log(Login)
   console.log(TransferedBy)
   console.log(Unit)
   console.log(ReasonCode)

  //replace fields below with values passed into proc
  var transferHeaderRecordUpdate = {
    TransferID: TransferID,
    Login: Login,
    TransferedBy: TransferedBy,
    Unit: Unit,
    ReasonCode: ReasonCode,
    StartTimeUpdate:StartTimeUpdate,
    EndTimeUpdate: EndTimeUpdate,
    TransferedByEnding: TransferedByEnding

    //ReasonCode: window.getCookie('weightMasterLicenseNumber'),
  };


  var transferHeaderRecordUpdateJSON = JSON.stringify(transferHeaderRecordUpdate);

console.log(transferHeaderRecordUpdateJSON)

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "updateTransferHeader",
    "method": "POST",
    "headers": {
      
      "content-type": "application/json"
    },
    "processData": false,
    "data": transferHeaderRecordUpdateJSON
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    
     
  });



}




function DeleteTransfer(TransferID) {
  console.log(TransferID)
  document.getElementById('editTransfer').style.display = 'none'
  document.getElementById('divDeleteTransfer').style.display = 'block'

//Add delete confirmation
//Show Panel


}

function DeleteTransferCancel() {
  document.getElementById('editTransfer').style.display = 'block'
  document.getElementById('divDeleteTransfer').style.display = 'none'
}

function DeleteTransferConfirm() {


    var transferRecordDelete = {
    TransferID: document.getElementById("transferHeaderIDEdit").value,

  };


  var transferDeleteJSON = JSON.stringify(transferRecordDelete);

 console.log(transferDeleteJSON)

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "DeleteTransfer",
    "method": "POST",
   "headers": {
     
      "content-type": "application/json"
    },
    "processData": false,
    "data": transferDeleteJSON
   };
 
  $.ajax(settings).done(function (response) {
    console.log(response);
   
    
  });
  document.getElementById('editTransfer').style.display = 'block'
  document.getElementById('divDeleteTransfer').style.display = 'none'
  openTicketTabs(event, 'viewTransferTickets')
}


function GetReasonCodeNumber() {
  var d = $.Deferred();

  var reasonCodeSearch = {
    searchParam: ""
  };

  var reasonCodeJSON= JSON.stringify(reasonCodeSearch);
console.log("ReasonCode Should be Populated")
  const settings = {
    "async": true,
    "crossDomain": true,
    //Ceegan Changing to localhost for testing
    "url": APIConnection + "reasonCodeSearch",
    "method": "POST",
    "headers": {
    
      "content-type": "application/json"
    },
    "processData": false,
    "data": reasonCodeJSON
  };

  $.ajax(settings).done(function (response) {
      var $s = $('#transferReasonCode1').empty();

      var $myData = response;
  
      var arrayAmount = $myData.length;
      var i = 0;
      for (i = 0; i < arrayAmount; i++) {
          $('<option/>', {
              'value': $myData[i].ReasonCode,
              'text': $myData[i].ReasonCode 
          }).appendTo('#transferReasonCode1');
      }

     // $("#divStatus").text("Loading users complete. Waiting for selection.");
      d.resolve(response);
      console.log(response)
  });


  return d.promise();

}


function GetReasonCodeEdit() {
  var d = $.Deferred();

  var reasonCodeSearch = {
    searchParam: ""
  };

  var reasonCodeJSON= JSON.stringify(reasonCodeSearch);
console.log("ReasonCode Should be Populated")
  const settings = {
    "async": true,
    "crossDomain": true,
    //Ceegan Changing to localhost for testing
    "url": APIConnection + "reasonCodeSearch",
    "method": "POST",
    "headers": {
    
      "content-type": "application/json"
    },
    "processData": false,
    "data": reasonCodeJSON
  };

  $.ajax(settings).done(function (response) {
      var $s = $('#transferReasonCode1Edit').empty();

      var $myData = response;
  
      var arrayAmount = $myData.length;
      var i = 0;
      for (i = 0; i < arrayAmount; i++) {
          $('<option/>', {
              'value': $myData[i].ReasonCode,
              'text': $myData[i].ReasonCode 
          }).appendTo('#transferReasonCode1Edit');
      }

     // $("#divStatus").text("Loading users complete. Waiting for selection.");
      d.resolve(response);
      console.log(response)
  });


  return d.promise();

}

///Ceegan - Keep new transferHeader. 
async function saveTransferHeader() {
  function validateInput(id) {
      const element = document.getElementById(id);
      const isValid = element.value.length !== 0;

      element.style.backgroundColor = isValid ? 'rgb(239, 239, 240)' : 'rgb(255, 127, 127)';
      element.style.fontWeight = '200';

      return isValid;
  }

  if (!validateInput('transferOperator') || !validateInput('transferTimeStart')) {
      return;
  }

  const transferTimeFinish = document.getElementById('transferTimeFinish');
  transferTimeFinish.value = transferTimeFinish.value || document.getElementById('transferTimeStart').value;
  transferTimeFinish.style.backgroundColor = 'rgb(239, 239, 240)';
  transferTimeFinish.style.fontWeight = '200';

  console.log('Start Time:', document.getElementById('transferTimeStart').value);
  console.log('Ending Time:', transferTimeFinish.value);

  const currentStartTime = new Date(JSON.parse(JSON.stringify(document.getElementById('transferTimeStart').value)));
  console.log(currentStartTime);

  const ticketHeaderRecord = {
      Login: document.getElementById('transferOperator').value,
      TransferedBy: document.getElementById('transferOperator').value,
      Unit: document.getElementById('transferMachineLogon').value,
      ReasonCode: document.getElementById('transferReasonCode1').value,
      StartTime: document.getElementById('transferTimeStart').value,
      EndTime: transferTimeFinish.value,
  };

  console.log(ticketHeaderRecord);

  const ticketHeaderRecordJSON = JSON.stringify(ticketHeaderRecord);
  console.log(ticketHeaderRecordJSON);

  const settings = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: ticketHeaderRecordJSON,
  };

  try {
      const response = await fetch(APIConnection + 'insertTransferHeader', settings);
      const responseData = await response.json();
      console.log(responseData);

      const transferIDInsert = String(responseData[0].TransferID);

    // ✅ Finished tank sample prompt (NEW TICKET FLOW)
      const endTimeValue = transferTimeFinish.value;
      let finishedTankSampleResponse = "";

       // ✅ Only prompt on Save, only if any new-line item is marked Complete
      if (anyCompleteCheckedNew() && shouldPromptSampleOnSave(transferIDInsert, transferTimeFinish.value)) {
        finishedTankSampleResponse = getFinishedTankSampleResponse();
      }

      for (let i = 1; i <= 5; i++) {
        const tankId = `fromBeforeTank${i}`;
        if (document.getElementById(tankId).value.length === 0) {
            document.getElementById(tankId).style.backgroundColor = 'rgb(239, 239, 240)';
            document.getElementById(tankId).style.fontWeight = '200';
        } else {
            document.getElementById(tankId).style.backgroundColor = 'rgb(239, 239, 240)';
            document.getElementById(tankId).style.fontWeight = '200';
    
            const gallonsId = `fromBeforeGallons${i}`; 
            const feetId = `fromBeforeFeet${i}`;
            const inchesId = `fromBeforeInches${i}`;

           // if (document.getElementById(gallonsId).value.length !== 0 || document.getElementById(feetId).value.length !== 0 || document.getElementById(inchesId).value.length !== 0 ) {
                console.log(transferIDInsert);
    
               
                const directionId = `TransferDirection${i}`;
                const commentsId = `fromAfterComments${i}`;
                const afterFeetId = `fromAfterFeet${i}`;
                const afterInchesId = `fromAfterInches${i}`;
                const lineItemCompleteId = `fromLineItemComplete${i}`;
    
                try {
                    await saveTransferDetail(
                        transferIDInsert,
                        document.getElementById(tankId).value,
                        document.getElementById(feetId).value || '0',
                        document.getElementById(inchesId).value || '0',
                        document.getElementById(gallonsId).value || '0',
                        document.getElementById(directionId).value,
                        document.getElementById(commentsId).value,
                        document.getElementById(afterFeetId).value || '0',
                        document.getElementById(afterInchesId).value || '0',
                        document.getElementById(lineItemCompleteId).checked
                    );
    
                    // Clear values after processing
                    document.getElementById(tankId).value = '';
                    document.getElementById(feetId).value = '';
                    document.getElementById(inchesId).value = '';
                    document.getElementById(gallonsId).value = '';
                    document.getElementById(commentsId).value = '';
                    document.getElementById(afterFeetId).value = '';
                    document.getElementById(afterInchesId).value = '';
                    document.getElementById(lineItemCompleteId).checked = false;
                } catch (error) {
                  if (error.statusText == 'OK'){
                    document.getElementById(tankId).value = '';
                    document.getElementById(feetId).value = '';
                    document.getElementById(inchesId).value = '';
                    document.getElementById(gallonsId).value = '';
                    document.getElementById(commentsId).value = '';
                    document.getElementById(afterFeetId).value = '';
                    document.getElementById(afterInchesId).value = '';
                    document.getElementById(lineItemCompleteId).checked = false;
                  }else{console.error('Error saving transfer detail:', error);
                }
                    
                }
              //}
        }
    }
 const msgEl = document.getElementById("updateMSG");
      if (msgEl) {
        msgEl.value = finishedTankSampleResponse
          ? `Transfer saved. Finished tank sample: ${finishedTankSampleResponse}.`
          : "Transfer saved.";
      }
      document.getElementById('transferReasonCode1').value = '';
      document.getElementById('transferOperator').value = '';
      document.getElementById('transferOperatorFinish').value = '';
      document.getElementById('transferTimeStart').value = '';
      document.getElementById('transferTimeFinish').value = '';

      //clear boxes here?
      

      $('html, body').animate({ scrollTop: 0 }, 'fast');
  } catch (error) {
      console.error('Error saving transfer header:', error);
  }
}


 function saveTransferHeaderAsync(ticketHeaderRecordJSON) {
  try {
      const response =  $.ajax({
          async: true,
          crossDomain: true,
          url: APIConnection + 'insertTransferHeader',
          method: 'POST',
          headers: {
              'content-type': 'application/json',
          },
          processData: false,
          data: ticketHeaderRecordJSON,
          dataType: 'json', // Explicitly specify the expected response type
      });

      // Check if the response status is OK
      if (response && response.length > 0 && response[0].Status === 'OK') {
          return response;
      } else {
          throw new Error('Invalid response format or status');
      }
  } catch (error) {
      throw new Error('Error during AJAX request:', error);
  }
}


//autocoplete stuff

// var countries = [
//   { label: 'United Kingdom', value: 'UK' },
//   { label: 'United States', value: 'US' }
// ];

// var inputElement = document.getElementById('editTranferTank1Test');
//    inputElement.addEventListener('input', handleInput);
// autocomplete({
//   input: inputElement,
//   fetch: function (text, update) {
//     text = text.toLowerCase();
//     // you can also use AJAX requests instead of preloaded data
//     var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
//     update(suggestions);
//   },
//   onSelect: onSelect // Make sure to define onSelect function
// });

// function handleInput(event) {
//   console.log(event);

//   // Check if the event object is defined
//   if (event && event.target) {
//     var input = event.target;
//     var text = input.value.toLowerCase();

//     // Assuming 'countries' is an array of objects with a 'label' property
//     var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text));

//     // Update the suggestions
//     updateSuggestions(suggestions);
//   } else {
//     console.error("Event object or target is undefined");
//   }
// }

// function updateSuggestions(suggestions) {
//   // Update the suggestions in your UI (replace this with your logic)
//   console.log(suggestions);
// }

// inputElement.addEventListener('input', handleInput);

// function onSelect(item) {
//   // Replace this logic with what you want to do when an item is selected
//   input.value = item.label.substring(0, item.label.indexOf(' – '));
//   console.log('HelloWorld')
// }
// document.addEventListener('DOMContentLoaded', function () {
//   var inputElement = document.getElementById('autocomplete-input');
//   var suggestionsList = document.getElementById('suggestions-list');

//   var countries = [
//       { label: 'United Kingdom', value: 'UK' },
//       { label: 'United States', value: 'US' },
//       { label: 'Canada', value: 'CA' },
//       // Add more countries as needed
//   ];

//   function onInput(event) {
//       var text = event.target.value.toLowerCase();
//       var filteredCountries = countries.filter(country =>
//           country.label.toLowerCase().startsWith(text)
//       );

//       updateSuggestions(filteredCountries);
//   }

//   window.onInput = onInput;

//   function updateSuggestions(suggestions) {
//       suggestionsList.innerHTML = '';

//       if (suggestions.length > 0) {
//           suggestions.forEach(function (suggestion) {
//               var li = document.createElement('li');
//               li.textContent = suggestion.label;
//               li.addEventListener('click', function () {
//                   inputElement.value = suggestion.label;
//                   suggestionsList.innerHTML = '';
//               });
//               suggestionsList.appendChild(li);
//           });
//       } else {
//           var li = document.createElement('li'
//           li.textContent = 'No suggestions';
//           suggestionsList.appendChild(li);
//       }
//   }

//   document.addEventListener('click', function (event) {
//       if (!inputElement.contains(event.target)) {
//           suggestionsList.innerHTML = '';
//       }
//   });

//   // Attach the onInput function to the input element
//   inputElement.addEventListener('input', onInput);
// })

function HelloWorld() {
  console.log("Hello")


//document.addEventListener('DOMContentLoaded', function () {

var inputElement = document.getElementById('autocomplete-input');
var suggestionsList = document.getElementById('suggestions-list');
var tankDataNew = ''

// Fetch tank data from the server
const getTankList = {
    searchParam: ''
};

var getTankListJSON = JSON.stringify(getTankList);

const tankInfoSettings = {
    "async": true,
    "crossDomain": true,
    "url": APIConnection + "tankInfoSearch",
    "method": "POST",
    "headers": {
        "content-type": "application/json"
    },
    "processData": false,
    "data": getTankListJSON
};

$.ajax(tankInfoSettings).done(function (tankData) {
    console.log(tankData);
    console.log('Yes, I ran tankInfo');
    tankDataNew = tankData
    console.log(tankDataNew)
    // Call the function  to initialize autocomplete with tank data
    initializeAutocomplete(tankDataNew);
});

// Function to initialize autocomplete with tank data
function initializeAutocomplete(tankDataNew) {
  console.log('TankDataNew:', tankDataNew);

  // Ensure tankData is an array
  if (Array.isArray(tankDataNew)) {
      // Assuming tankData is an array of objects with a 'label' property
      var countries = tankDataNew.map(tank => ({ label: tank.TankNumber, value: tank.TankID }));

      if (countries && countries.length > 0) {
          console.log('Countries:', countries);

          // Attach the input event listener directly to the input element
          inputElement.addEventListener('input', function (event) {
              if (event && event.target && event.target.value !== undefined) {
                  var text = event.target.value.toLowerCase();
                  console.log('Input text:', text);

                  // Ensure country.label is defined before calling toLowerCase()
                  var filteredCountries = countries.filter(country =>
                      country.label && country.label.toLowerCase().startsWith(text)
                  );

                  console.log('Filtered countries:', filteredCountries);

                  updateSuggestions(filteredCountries);
              } else {
                  console.error("Input value is undefined");
              }
          });
      } else {
          console.error("Countries array is empty or undefined");
      }
  } else {
      console.error("Tank data is not an array");
  }
}

function updateSuggestions(suggestions) {
    suggestionsList.innerHTML = '';

    if (suggestions.length > 0) {
        suggestions.forEach(function (suggestion) {
            var li = document.createElement('li');

            // Check if suggestion and suggestion.label are defined before calling toLowerCase()
            if (suggestion && suggestion.label) {
                li.textContent = suggestion.label;
                li.addEventListener('click', function () {
                    inputElement.value = suggestion.label;
                    suggestionsList.innerHTML = '';
                });
                suggestionsList.appendChild(li);
            }
        });
    } else {
        var li = document.createElement('li');
        li.textContent = 'No suggestions';
        suggestionsList.appendChild(li);
    }

  }

}
//});

// document.addEventListener('click', function (event) {
//   if (inputElement && !inputElement.contains(event.target)) {
//       suggestionsList.innerHTML = '';
//   }
// });