// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  var booksCollection = [];
  
  var render = function () {
  $('#books-list').empty();
  var bookHTML = template({books: booksCollection});
  $('#books-list').append(bookHTML);
  };

  // Populate list with book data
  $.get("https://super-crud.herokuapp.com/books",
  	function(data) {
  		console.log(data);
  		booksCollection = data.books;
  		render();
  	});

  //Add a new Book to the list
  $('#create-book').submit(function(event) {
  	event.preventDefault();
  	var newBook = $(this).serialize();
  	$.post("https://super-crud.herokuapp.com/books", 
  		newBook,
  		function(data) {
  			booksCollection.push(data);
  			// update book list
  			render();
  		});

  });
  
  //Update book list
  $('#books-list').on("submit","#update-book", function(event){
  	event.preventDefault();
  	var book_id = $(this).closest('.book').attr("data_id");
  	var updateBook = $(this).serialize();

  	console.log("https://super-crud.herokuapp.com/books/"+book_id+"/");
  	$.ajax({
  		type: "PUT",
  		url: "https://super-crud.herokuapp.com/books/"+book_id+"/",
  		data: updateBook,
  		success: function (data){
  			render();
  		}
  	});
  });

  //Delete Book from List
  $('#books-list').on("click","#delete", function(event){
  	event.preventDefault();
  	var book_id = ($(this).attr("data_id"));
  	$.ajax({
  		type: "DELETE",
  		url: "https://super-crud.herokuapp.com/books/"+book_id,
  		success: function(){
  			console.log("delete1");
  			$('#books-list').empty();
  			booksResults = data.books;
  			bookHTML = template({books: booksResults});
  			$('#books-list').append(bookHTML);	
  			console.log("delete2");
  		},
  		error: function (error) {
    		console.error(error);
  		}	
  	});
  });
});















