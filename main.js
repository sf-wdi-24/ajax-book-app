var results=[];
// wait for DOM to load before running JS
$(function() {


  // check to make sure JS is loaded
  console.log('JS is loaded!');

  //handelbars 
  var source = $("#booksForm").html();
  var template = Handlebars.compile(source);
  $("#form2").hide();


 //creating list from the data receive from the API 
 function create_list(){

 //API call to get the data	
 $.get("https://super-crud.herokuapp.com/books", function(data){
 	results = data;

//appending the handelbars templates
 var trackHtml = template({books:results.books});
 	$("#books-list").append(trackHtml);
 });
}

//posting the data in the API when user click submit
$("#formDiv").submit(function(event){

 	//new book object
 	var newBook = $(this).serialize();
 	console.log(newBook);

 	//post to the API, empty the list and recreate the updated list
 	$.post("https://super-crud.herokuapp.com/books", newBook, function(){
 		$("#books-list").empty();
 		create_list();
 	});

 });

//delete selected item
 $("#books-list").on("click", "#delete", function(event){
 	var book_id = $(this).attr("data_id");
 	$.ajax({
 		type: "DELETE",
 		url: "https://super-crud.herokuapp.com/books/" + book_id,
 		success: function(data){
 			$("#books-list").empty();
 			create_list();
 		},
 		error: function(error){
 			console.log(error);
 		}
 	});	
 });

 // $("#books-list").on("click", "#edit", function(event){
 // 	$(".form2").toggle();
 // });
//  	var book_id_edit = $(this).attr("data_id");
// 	$(this).on("submit", ".form2", function(event){
// 	event.preventDefault();
// 	var updatedBook = $(this).serialize();
// 	console.log(updatedBook);
// 	$.ajax({
// 			type: "PUT",
// 			url: "https://super-crud.herokuapp.com/books/" + book_id_edit,
// 			data: updatedBook,
//  			success: function(data){
//  				console.log("yay EDITED");
//  				create_list();
//  			},
//  			error: function(error){
//  				console.log(error);
//  			}
//  	});	
//  });

// });
 create_list();

});

