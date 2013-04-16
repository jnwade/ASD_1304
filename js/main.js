// Jonathan Wade
// ASD 1304 Wk1
// Meaningful Commit

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#trackDuty').on('pageinit', function(){

		var myForm = $('#mainForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var key = myForm.serializeArray();
			storeData(key);
		}
	});
	
	//any other code needed for addItem page goes here
	
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
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Song Saved!");
							
 	};
 	
 	
 	//Retreives data from local storage
 	function getData(){
	 	//Write data from localStorage to the Browser
	 	$("#dataView").append("<div></div>").addClass("dataContainer").attr("id" , "item");
	 	$("#item").append("<ul></ul>").addClass("dataList").attr("id" , "makeList");
	 	$("#item").css("display" , "block");
	 	for(var i = 0, j = localStorage.length; i<j; i++){
	 		$("#makeList").append("<li></li>").addClass("listItem").attr("id" , "makeLi");	
		 	var key = localStorage.key(i);
		 	var value = localStorage.getItem(key);
		 	// Here we are converting our localStorage string value back into an object using JSON.parse().
		 	var item = jQuery.parseJSON(value);	 	
		 	var makeSubList = $("makeLi").append("<ul></ul>").addClass("subList").attr("id" , "entry");
		 	getImage(item.techName[1], makeSubList);
		 	for(var n in item){
		 		$("#entry").append("<li></li>").addClass("subList2").attr("id" , "makeSubLi");
			 	var dataInfo = item[n][0]+" "+item[n][1];
			 	$("#makeSubLi").html(dataInfo);
			 	linksLi = $("#makeSubLi").append("<li></li>").addClass("editDeleteLinks").attr("id" , "linksLi");
			 	makeSubList.append(linksLi);
		 	}
		 	//Creates edit and delete links for each item submitted to local storage
		 	makeItemLinks(localStorage.key(i), linksLi); 	
	 	}	
 	}
 	
 	function getImage(techName, makeSubList) {
	 	//Get the image for the right catagory that's being displayed.alert
	 	$("#entry").append("<li></li>").addClass("imgLink").attr("id" , "imageLink");
	 	var imgLi = $("#imageLink");
	 	makeSubList.append(imgLi);
	 	var newImg = imgLi.append("<img/>").attr({"id" : "pic" , "src" : "img/" + techName + ".png"});
	 	imgLi.append(newImg);
 	}
 /*
	function autoFillData() {
	 	//Actual json object data required for this to work is coming from our json.js file which is loaded from our HTML page.
	 	//Store json object into local storage.
	 	for(var n in json){
		 	var id = Math.floor(Math.random()*1000001);
		 	localStorage.setItem(id, JSON.stringify(json[n]));
	 	}
 	}
*/
 	
 	//Make Item Links
 	//Creates the edit and delete links for each stored item when displayed
 	function makeItemLinks(key, linksLi) {
 		//Add edit single item link
 		var editLink = $("#linksLi").append("<a></a>").attr({"href" : "#" , "id" : "editLink"});
	 	editLink.key = key;
	 	var editText = "Edit";
	 	editLink.on("click", editItem);
	 	editLink.html(editText);
	 	
	 	//Add delete single item link	 	
	 	var deleteLink = $("#linksLi").append("<a></a>").attr({"href" : "#" , "id" : "deleteLink"});
	 	deleteLink.key = key;
	 	var deleteText = "Delete";
	 	deleteLink.on("click", deleteItem);
	 	deleteLink.html(deleteText);
	 	
 	}
 	
 	function editItem() {
		//Grab the data for our items in Local Storage
		var value = localStorage.getItem(this.key);
		var item = jQuery.parseJSON(value);
			
		//Populate the form fields with current localStorage values.
		$("#techName").value = item.techName[1];
		$("#date").value = item.date[1];
		$("#inboxCheck1").value = item.inboxCheck1[1];
		$("#inboxCheck2").value = item.inboxCheck2[1];
		$("#reportCheck").value = item.inboxCheck3[1];
		$("#notes").value = item.notes[1];
		
		
		
		//For Check Box
		if(item.inboxCheck1[1] == "on") {
			$("#inboxCheck1").attr("checked", "checked");
		}
		$("notes").value = item.notes[1];
		
 	}
 	
 	function deleteItem() {
	 	var ask = confirm("Delete log?");
	 	if(ask) {
		 	localStorage.removeItem(this.key);
		 	window.location.reload();
	 	}else{
		 	alert("Whew, that was a close one!");
		 	
	 	}
 	}
 	
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

$("#viewEmailLog").on("click" , getData);

});








	
	

