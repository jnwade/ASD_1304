// Jonathan Wade
// ASD 1304 Wk1
// Meaningful Commit

$('#home').on('pageinit', function(){
	//code needed for home page goes here




});	
		
$('#trackDuty').on('pageinit', function(){


	jQuery.fn.reset = function () {
		$(this).each (function() { this.reset(); });
	}


		var myForm = $('#mainForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var key = myForm.serializeArray();
			storeData(key);
		}
	});
	
	$("#mainForm").reset();
	

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

	
	// Global Variables
	var check1,
		check2, 
		check3,
		id,
		linksLi;
		

		
	
	//Find Value of Checkbox 1
	function getCheckValue1(){
		if ($("#inboxCheck1").is(":checked")){
			check1 = "Complete";
		} else{
			check1 = "Incomplete";
		}
	}
	

  		//Find Value of Checkbox 2
	function getCheckValue2(){
		if ($("#inboxCheck2").is(":checked")){
			check2 = "Complete";
		} else{
			check2 = "Incomplete";
		}
	}
	
			//Find Value of Checkbox 2
	function getCheckValue3(){
		if($("#reportCheck").is(":checked")){
			check3 = "Complete";
		} else{
			check3 = "Incomplete";
		}
	}
  
	//Stores form data into Local Storage
	var storeData = function(data, key){
	//If there is no key, this means this is a brand new item and we need a new key
	if(!key){
		 id 					= Math.floor(Math.random()*1000001);
	}else{
		//Set the id to the existing key we're editing so that it will save over the existing data.
		//This is key is the same key that has been passed along from the editSubmit event handler
		//to the validate function, and then passed here, into the storeData function.
		id = key;
	}
		// Gather up all of our form field values and store them in an object.
		//Object properties contain array with the form label and input value which will allow us to label the data.
		getCheckValue1();
		getCheckValue2();
		getCheckValue3();
		var item 				= {};
			item.techName		= ["Tech Name: ", $("#techName").val()];
			item.date			= ["Date: ", $("#date").val()];
			item.inboxCheck1	= ["Inbox Check 1: ", check1];
			item.inboxCheck2	= ["Inbox Check 2: ", check2];
			item.reportCheck	= ["Report Check: ", check3];
			item.notes			= ["Notes: ", $("#notes").val()];
		//Saving object to local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Log Saved");
		$("#mainForm").reset();
		//activating a transition back to the home page to start over once submission is complete
		$.mobile.changePage("#home", { transition: "slide" });
						
 	};
 	

 

 	
 		//Retreives data from local storage
 	$("#viewEmailLog").on('click', function getData(){
 	
 		
  		if(localStorage.length === 0) {
	  		/* autoFillData(); */
	  		alert("Nothing has been saved yet so default data has been added.");
	  		}		
  
  		
	  		//Write data from localStorage to the Browser
  			for(var i=0, j=localStorage.length; i<j; i++) {
  				var dataView = $("#dataView");
	  			var key = localStorage.key(i);
	  			var value = localStorage.getItem(key);
	  			var item = JSON.parse(value);
	  			$('<section class="itemView">' +
	  			  '<ul id="imgAvatar">' +	
				  '<img src="img/' + item.techName[1] + '.png">' +
				  '</ul>'+
				  '<h5>' + item.techName[0] + item.techName[1] + '</h5>' +
				  '<p>' + item.date[0] + item.date[1] + '</p>' +
				  '<p>' + item.inboxCheck1[0] + item.inboxCheck1[1] + '</p>' +
				  '<p>' + item.inboxCheck2[0] + item.inboxCheck2[1] + '</p>' +
				  '<p>' + item.reportCheck[0] + item.reportCheck[1] + '</p>' +
				  '<p>' + item.notes[0] + item.notes[1] + '</p>' +
				  '<a href="#" class="deleteLog" data-role="button" data-mini="true" data-inline="true" data-icon="check" data-theme="b">Delete</a>' + 
				  '<a href="#trackDuty" class="editLog" data-role="button" data-transition="slide" data-mini="true" data-inline="true">Edit</a>' + 
				  '</section>'
				  ).appendTo(dataView);
				  
				  
	  			
		  		}

	});
	
});
 
 

 $('#emailData').on('pageinit', function(){
//code needed for emailData page goes here

 	

 	
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

 	
	$(".deleteLog").on("click", function(){
	console.log($("hello"));
	 	var ask = confirm("Delete log?");
	 	if(ask) {
	 		var logEntry = $(this).key;
		 	localStorage.removeItem(logEntry);
		 	window.location.reload();
	 	}else{
		 	alert("That was a close call");
		 	
	 	}
 	});
 	
 	//Clears local storage
 	function clearLocal() {
 		if(localStorage.length === 0) {
	 		alert("There is nothing to clear!");
 		}else{
	 		localStorage.clear();
	 		alert("All logs have been deleted.");
	 		window.location.reload();
	 		return false;
 		}
 	 }


});







	
	

