// Jonathan Wade
// ASD 1304 Wk3



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************



$('#home').on('pageinit', function(){
//code needed for home page goes here


//-------------------------------------------------------------------------


$("#mainForm").each(function(){
	this.reset();
});


//-------------------------------------------------------------------------


$("#dataView").empty();
		

//End of home Pageinit
});	



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************

		
$('#trackDuty').on('pageinit', function(){
//code needed for trackDuty page goes here


//-------------------------------------------------------------------------	


	var myForm = $("#mainForm");
	    myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
		var data = myForm.serializeArray();
		storeData(data);
		$("#mainForm").each(function(){
			this.reset();
		});
		}
		
//Will need to work out an if else statement to determine if there is a key or not.
	});
	
/* $("#mainForm").reset(); */
	

	/*
 $.ajax({
		 type: 'GET',
		 url: 'json.js',
		 data: { },
			 success:function(data){
				 // successful request; do something with the data
				 $('#ajax-panel').empty();
				 $(data).find('item').each(function(i){
					 $('#ajax-panel').append('<h1>Error</h1>');
					 });
					 },
					 error:function(){
						 // failed request; give feedback to user
						 $('#ajax-panel').html('<p class="error">No Go!</p>');
						 }
});
*/

	
	
//-------------------------------------------------------------------------
	
	
// Global Variables 
var	id;
		

//-------------------------------------------------------------------------
		

function getCheckValue1(){
//Find Value of Checkbox 1
	var check1;
	if ($("#inboxCheck1").is(":checked")){
		check1 = "Complete";
	} else{
		check1 = "Incomplete";
	}
	return check1;
}
	

//-------------------------------------------------------------------------


function getCheckValue2(){
//Find Value of Checkbox 2
	var check2;
	if ($("#inboxCheck2").is(":checked")){
		check2 = "Complete";
	} else{
		check2 = "Incomplete";
	}
	return check2;
}


//-------------------------------------------------------------------------


function getCheckValue3(){
//Find Value of Checkbox 2
	var check3;
	if($("#reportCheck").is(":checked")){
		check3 = "Complete";
	} else{
		check3 = "Incomplete";
	}
	 return check3;
}
  
  
//-------------------------------------------------------------------------
  

var storeData = function(data){
//Stores form data into Local Storage

//If there is no key, this means this is a brand new item and we need a new key
	/*
var key;

	if(!key){
		 	
		id = Math.floor(Math.random()*1000001);
	
	}else{
		
		id = key;
	
	}
*/
	
	id = Math.floor(Math.random()*1000001);

	
	console.log("data",data );
	
	var item 				= {};
		item.techName		= ["Tech Name: ", $("#techName").val()];
		item.date			= ["Date: ", $("#date").val()];
		item.inboxCheck1	= ["Inbox Check 1: ", getCheckValue1()];
		item.inboxCheck2	= ["Inbox Check 2: ", getCheckValue2()];
		item.reportCheck	= ["Report Check: ", getCheckValue3()];
		item.notes			= ["Notes: ", $("#notes").val()];
		item.key = id;
	//Saving object to local storage
	localStorage.setItem(id, JSON.stringify(item));
	alert("Log Saved");
	//activating a transition back to the home page to start over once submission is complete
	$.mobile.changePage("#home", { transition: "slide" });
					
};



//End of trackDuty Pageinit
});



//*************************************************************************
//*************************************************************************
//*************************************************************************
//*************************************************************************





$("#emailData").on('pageinit', function(){
	//Retreives data from local storage
	if(localStorage.length === 0) {
		/* autoFillData(); */
		alert("Nothing has been saved yet so default data has been added.");
		 $.mobile.changePage("#trackDuty", { transition: "slide" });
		}else{
		$("#dataView").empty();
				
		for(var i=0, j=localStorage.length; i<j; i++) {
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
					  '</li>'+
					  '<li>'+  
						  '<h6>' + item.inboxCheck1[0] + item.inboxCheck1[1] + '</h6>' +
						  '<h6>' + item.inboxCheck2[0] + item.inboxCheck2[1] + '</h6>' +
						  '<h6>' + item.reportCheck[0] + item.reportCheck[1] + '</h6>' +
						  '<h6>' + item.notes[0] + item.notes[1] + '</h6>' +
					  '</li>' +
					   '<a href="#" class="deleteLog" data-key="' + item.key + '" data-role="button" data-mini="true" data-inline="true" data-icon="delete" data-theme="b">Delete</a>' +
					   '<a href="#trackDuty" class="editLog" data-key="' + item.key + '" data-role="button" data-transition="slide" data-mini="true" data-inline="true" data-icon="edit" data-theme="b">Edit</a>' +
					'</ul>' + 
				   '</li>'
					).appendTo(dataView);					
		};
		
		
	};


//-------------------------------------------------------------------------


$("#dataView").listview("refresh");


//-------------------------------------------------------------------------

 	
$(".editLog").on("click", function(id) {	
	//Grab the data for our items in Local Storage
	var value = localStorage.getItem(id);
	var item = JSON.parse(value);
	
	
	//Populate the form fields with current localStorage values.
	$("#techName").val(item.techName[1]);
	$("#date").val(item.date[1]);
	$("#inboxCheck1").val(item.inboxCheck1[1]);
	$("#inboxCheck2").val(item.inboxCheck2[1]);
	$("#reportCheck").val(item.inboxCheck3[1]);
	$("#notes").val(item.notes[1]);
	//For Check Boxes
	
		if(item.inboxCheck1[1] == "Completed") {
			$("#inboxCheck1").attr("checked", "checked");
		}
		
		if(item.inboxCheck2[1] == "Completed") {
			$("#inboxCheck2").attr("checked", "checked");
		}
		
		if(item.reportCheck[1] == "Completed") {
			$("#reportCheck").attr("checked", "checked");
		}
		
	

});

 
//-------------------------------------------------------------------------
 
 	
$(".deleteLog").on("click", function(){
	//Delete item from localStorage
	console.log($(this).data("key") , ' <-- If this is a number, this is working');
	var ask = confirm("Delete log?");
		if(ask) {
		 	localStorage.removeItem($(this).data("key"));
		 	 //need an if else statement that will check to see if localstorage exists. If it does it will stay on the page. If not it will need to return to the home page.
		 	 if(localStorage.length === 0) {
			 	 $.mobile.changePage("#home", { transition: "slide" });
		 	 } else {
		 	 	window.location.reload();
			 	

		 	 }
	 	} else {
		 	alert("Whew, that was close!");
	 	}
 	});
 	

//-------------------------------------------------------------------------
 	
 	
 	function clearLocal() {
 	//Clears local storage
 		if(localStorage.length === 0) {
	 		alert("There is nothing to clear!");
 		}else{
	 		localStorage.clear();
	 		alert("All logs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
 	 }



//-------------------------------------------------------------------------



//End of emailData Pageinit
});







	
	

