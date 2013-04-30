// Jonathan Wade
// ASD 1304 Wk3
//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************




$("#homePage").on("pagebeforeshow", function () {

    console.log("initialized");


    //-------------------------------------------------------------------------


    $(".editButton").css("display", "none");
    $(".saveButton").css("display", "block");
    console.log("Edit and Save buttons swapped");


    //-------------------------------------------------------------------------


    $("#dataView").empty();


    //-------------------------------------------------------------------------


/*
Options:
url - string - request url address
type - string - GET or POST?
data - Object - Key : Value pairs
dataType - string - expected data to be returned: xml, html, text, json, script, jsonp
timeout - number - milliseconds to wait before cancel. Evokes error call back
cache - boolean - Default is true (Caches requests by default unless you use false)
beforeSend - function - evokes before ajax is sent
error - function - evokes on error timeout
success - function evokes on successful ajax
complete - function - always evokes after a retrun
*/


$(".jsonDisplay").on("click", function(){

$("#jsonView").empty();
console.log("jsonView emptied");

$.ajax({
	url: 'xhr/data.json',
	type: 'GET',
	dataType: 'json',
	 success:function(response){
	 console.log(response);
		 // successful request; do something with the data
		for(var i=0, j=response.logData.length; i<j; i++){
			var item = response.logData[i];
			$('<li class="itemView">' +
                '<h3 style="text-align: center;">' + item.techname + " :: " + item.date + '</h3>' +
                '<ul class="bodyText" style="list-style: none;">' +
                '<li id="imgAvatar">' +
                '<img src="img/' + item.techname + '.png">' +
                '</li>' +
                '<li>' +
                '<h6>Inbox Check 1: ' + item.check1 + '</h6>' +
                '<h6>Inbox Check 2: ' + item.check2 + '</h6>' +
                '<h6>Report Check: ' + item.check3 + '</h6>' +
                '<h6>Notes: ' + item.notes + '</h6>' +
                '</li>' +
                '</ul>' +
                '<hr />' +
                '</li>').appendTo("#jsonView");
                	 	
		};
		$("#jsonView").listview('refresh');
		
	},
		 error:function(){
			 // failed request; give feedback to user
			 $("#jsonView").html("<p class='ajaxError'>You Broke It!</p>");
			 }
});

});


  //-------------------------------------------------------------------------	
  
  
$(".xmlDisplay").on("click", function(){
       
$("#xmlView").empty();

$.ajax({
	url: "xhr/data.xml",
	type: "GET",
	dataType: "xml",
	 success:function(xml){
		 // successful request; write data to the DOM
		$(xml).find("log").each(function(){
   				var techName = $(this).find('techName').text();
   				var date = $(this).find('date').text();
   				var check1 = $(this).find('check1').text();
   				var check2 = $(this).find('check2').text();
   				var check3 = $(this).find('check3').text();
   				var notes = $(this).find('notes').text();
   				console.log(xml);
			$('<li class="itemView">' +
                '<h3 style="text-align: center;">' + techName + " :: " + date + '</h3>' +
                '<ul class="bodyText" style="list-style: none;">' +
                '<li id="imgAvatar">' +
                '<img src="img/' + techName + '.png">' +
                '</li>' +
                '<li>' +
                '<h6>Inbox Check 1: ' + check1 + '</h6>' +
                '<h6>Inbox Check 2: ' + check2 + '</h6>' +
                '<h6>Report Check: ' + check3 + '</h6>' +
                '<h6>Notes: ' + notes + '</h6>' +
                '</li>' +
                '</ul>' +
                '<hr />' +
                '</li>').appendTo("#xmlView");
		});
		$("#xmlView").listview('refresh');
			
	},
	

		 error:function(){
			 // failed request; give feedback to user
			 $("#xmlView").html("<p class='ajaxError'>You Broke It!</p>");
			 }
});

});
  
  
  
  
    //-------------------------------------------------------------------------	


    //End of home Pageinit
});



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************


$("#trackDuty").on("pageinit", function () {
    //code needed for trackDuty page goes here




    //-------------------------------------------------------------------------	




    //-------------------------------------------------------------------------




    //-------------------------------------------------------------------------


    function getCheckValue1() {
        //Find Value of Checkbox 1
        var check1;
        if ($("#inboxCheck1").is(":checked")) {
            check1 = "Complete";
        } else {
            check1 = "Incomplete";
        }
        return check1;
    }


    //-------------------------------------------------------------------------


    function getCheckValue2() {
        //Find Value of Checkbox 2
        var check2;
        if ($("#inboxCheck2").is(":checked")) {
            check2 = "Complete";
        } else {
            check2 = "Incomplete";
        }
        return check2;
    }


    //-------------------------------------------------------------------------


    function getCheckValue3() {
        //Find Value of Checkbox 2
        var check3;
        if ($("#reportCheck").is(":checked")) {
            check3 = "Complete";
        } else {
            check3 = "Incomplete";
        }
        return check3;
    }


    //-------------------------------------------------------------------------


    $(".saveButton").on("click", function (data) {
        //Stores form data into Local Storage


        var key,
            id,
            techName = $("#techName").val(),
            date = $("#date").val(),
            check1 = getCheckValue1(),
            check2 = getCheckValue2(),
            check3 = getCheckValue3(),
            notes = $("#notes").val();

        if (!key) {

            id = Math.floor(Math.random() * 1000001);

        } else {

            id = key;
        }

        console.log(data);
        console.log(id);

        var item = {};
        item.techName = ["Tech Name: ", techName];
        item.date = ["Date: ", date];
        item.inboxCheck1 = ["Inbox Check 1: ", check1];
        item.inboxCheck2 = ["Inbox Check 2: ", check2];
        item.reportCheck = ["Report Check: ", check3];
        item.notes = ["Notes: ", notes];
        item.key = id;
        //Saving object to local storage
        localStorage.setItem(id, JSON.stringify(item));
        alert("Log Saved");
        //activating a transition back to the home page to start over once submission is complete
       
        $.mobile.changePage("#homePage", {
                transition: "slidefade"
            });
       
       location.reload();
       
      

    });


    //-------------------------------------------------------------------------


    //End of trackDuty Pageinit
});



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************





$("#emailData").on('pagebeforeshow', function () {

    $("#dataView").empty();
    //Retreives data from local storage
    if (localStorage.length === 0) {
        /* autoFillData(); */
        alert("Nothing has been saved yet!");
        /* $.mobile.changePage("#trackDuty", { transition: "slide" }); */
    } else {


        for (var i = 0, j = localStorage.length; i < j; i++) {
            //Write data from localStorage to the Browser
            var dataView = $("#dataView");
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var item = JSON.parse(value);
            $('<li class="itemView">' +
                '<h6>' + item.techName[1] + " :: " + item.date[1] + '</h6>' +
                '<ul class="bodyText">' +
                '<li id="imgAvatar">' +
                '<img src="img/' + item.techName[1] + '.png">' +
                '</li>' +
                '<li>' +
                '<h6>' + item.inboxCheck1[0] + item.inboxCheck1[1] + '</h6>' +
                '<h6>' + item.inboxCheck2[0] + item.inboxCheck2[1] + '</h6>' +
                '<h6>' + item.reportCheck[0] + item.reportCheck[1] + '</h6>' +
                '<h6>' + item.notes[0] + item.notes[1] + '</h6>' +
                '</li>' +
                '<a href="#" class="deleteLog" data-key="' + item.key + '" data-role="button" data-mini="true" data-inline="true" data-icon="delete" data-theme="b">Delete</a>' +
                '<a href="#trackDuty" class="editLog" data-key="' + item.key + '" data-role="button" data-transition="slide" data-mini="true" data-inline="true" data-icon="edit" data-theme="b">Edit</a>' +
                '</ul>' +
                '</li>').appendTo(dataView);
        };


    };



    //-------------------------------------------------------------------------


    $("#dataView").listview("refresh");



    //-------------------------------------------------------------------------


    $(".editLog").on("click", function () {


        $(".saveButton").css("display", "none");
        $(".editButton").css("display", "block");


        //Grab the data for our items in Local Storage
        var key = $(this).data("key");
        var value = localStorage.getItem(key);
        var item = JSON.parse(value);



        //Populate the form fields with current localStorage values.
        $("#techName").val(item.techName[1]);
        $("#date").val(item.date[1]);
        $("#notes").val(item.notes[1]);

        //For Check Boxes
        //-------------------------------------------------------------------------

        //Find Value of Checkbox 1
        if (item.inboxCheck1[1] === "Complete") {
            $("#inboxCheck1").prop("checked", true);
        }
        //-------------------------------------------------------------------------

        //Find Value of Checkbox 2
        if (item.inboxCheck2[1] === "Complete") {
            $("#inboxCheck2").prop("checked", true);
        }

        //-------------------------------------------------------------------------

        //Find Value of Checkbox 2
        if (item.reportCheck[1] === "Complete") {
            $("#reportCheck").prop("checked", true);
        }

        //-------------------------------------------------------------------------


        $(".editButton").on("click", function () {


            var Key,
             	check1,
             	check2,
             	check3;

            //-------------------------------------------------------------------------

            //Find Value of Checkbox 1
            if ($("#inboxCheck1").is(":checked")) {
                check1 = "Complete";
            } else {
                check1 = "Incomplete";
            };

            //-------------------------------------------------------------------------

            //Find Value of Checkbox 2
            if ($("#inboxCheck2").is(":checked")) {
                check2 = "Complete";
            } else {
                check2 = "Incomplete";
            };

            //-------------------------------------------------------------------------

            //Find Value of Checkbox 2
            if ($("#reportCheck").is(":checked")) {
                check3 = "Complete";
            } else {
                check3 = "Incomplete";
            };

            //-------------------------------------------------------------------------

            var item = {};
            item.techName = ["Tech Name: ", $("#techName").val()];
            item.date = ["Date: ", $("#date").val()];
            item.inboxCheck1 = ["Inbox Check 1: ", check1];
            item.inboxCheck2 = ["Inbox Check 2: ", check2];
            item.reportCheck = ["Report Check: ", check3];
            item.notes = ["Notes: ", $("#notes").val()];
            item.key = key;

            //Saving object to local storage
            localStorage.setItem(key, JSON.stringify(item));

            alert("Log Updated");

            $(".editButton").css("display", "none");
            $(".saveButton").css("display", "block");

            $.mobile.changePage("#homePage", {
                transition: "slidefade"
            });
            
            location.reload();


        });

       

    });


    //-------------------------------------------------------------------------


    $(".deleteLog").on("click", function () {
        //Delete item from localStorage
        console.log($(this).data("key"), ' <-- If this is a number, this is working');
        var ask = confirm("Delete log?");
        if (ask) {
            localStorage.removeItem($(this).data("key"));
            $.mobile.changePage("#emailData", {
                transition: "slidefade"
            });

        } else {
            alert("Whew, that was close!");
        }
    });


    //-------------------------------------------------------------------------


    $("#clearLocal").on("click", function () {
        //Clears local storage
        if (localStorage.length === 0) {
            alert("There is nothing to clear!");
            return false;
        } else {
            localStorage.clear();
            alert("All logs have been deleted.");
            $.mobile.changePage("#homePage", {
                transition: "slidefade"
            });

        }
    });



    //-------------------------------------------------------------------------


    //End of emailData Pageinit
});