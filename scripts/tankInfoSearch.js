function openTankTabs(evt, tabName) {
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

    if (tabName == 'Tank-search'){
      // document.getElementById('carrierSearchInput').value = ''
      loadjsGridTankInfoSearch()
      
    }
  
    // if (tabName == 'viewTransferTickets'){
    //   // document.getElementById('carrierSearchInput').value = ''
    //    loadjsGridTransferTicket()
    //   console.log("I am working correctly for once.")
    // }
    //   userType =  window.getCookie("userType")
  
  
     }


     function loadjsGridTankInfoSearch() {
        var searchParam = {
          searchParam: document.getElementById('tankSearchInput').value,
      };
     
      var searchParamJSON = JSON.stringify(searchParam);
    console.log(searchParamJSON)
    
        const settings = {
          "async": true,
          "crossDomain": true,
          "url": APIConnection + "tankInfoSearch",
          "method": "POST",
          "headers": {
            "content-type": "application/json"
          },
          "processData": false,
          "data": searchParamJSON
        };
    
    
    
        $("#tankjsGrid").jsGrid({
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
                { name: "TankNumber", title: "Tank Number", type: "text", width: 200 },
                { name: "Location", title: "Location", type: "text", width: 200 },
                { name: "Height", title: "Height", type: "text", width: 200 },
                { name: "MaxFillHeight", title: "MaxFillHeight", type: "text", width: 200 },
                { name: "FaculityMaxFillHeight", title: "FaculityMaxFillHeight", type: "text", width: 200 }
            
           ],
           rowDoubleClick: function(args){
            var getData = args.item;
            var keys = Object.keys(getData);
            var text = [];
        
            $.each(keys, function(idx, value) {
              text.push(value + " : " + getData[value])
            });
        
        
             document.getElementById('reasonCodeID').value = args.item["ReasonCodeID"]
             document.getElementById('reasonCodeIseries').value = args.item["ReasonCodeIseries"]
             document.getElementById('reasonCode').value = args.item["ReasonCode"]

    
    
           openCarrierTabs(event,'addeditReasonCode')
           $('html, body').animate({ scrollTop: 0 }, 'fast');
          }
        });
    
    }


    function triggerSearchOnEnter(e, textarea) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) { //Enter keycode
            loadjsGridReasonCode()
        }

    }

