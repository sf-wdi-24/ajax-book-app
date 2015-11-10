// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  var booksCollection = [];

  // Populate list with book data
  $.get("https://super-crud.herokuapp.com/books",
  	function(data) {
  		console.log(data);
  		booksCollection = data.books;
		  var booksResults = data.books;
		  var bookHTML = template({books: booksResults});
  		$('#books-list').append(bookHTML);
  	});

  //Add a new Book to the list
  $('#create-book').submit(function(event) {
  	event.preventDefault();
  	var newBook = $(this).serialize();
  	$.post("https://super-crud.herokuapp.com/books", 
  		newBook,
  		function(data) {
  			booksCollection.push(data);
  			// Clear book list
  			$('#books-list').empty();
  			$(this).val(' ');
  			//Re-render template with booksCollection
  			booksResults = booksCollection;
  			bookHTML = template({books: booksResults});
  			$('#books-list').append(bookHTML);	
  		});

  });
  
  //Update book list
  $('#books-list').on("submit","#update-book", function(event){
  	event.preventDefault();
  	var book_id1 = $(this).attr("data_id");
  	console.log($(this).attr("data_id1"));
  	var updateBook = $('#update-book').serialize();
  	console.log(updateBook);
  	console.log("https://super-crud.herokuapp.com/books/"+book_id+"/");
  	$.ajax({
  		type: "PUT",
  		url: "https://super-crud.herokuapp.com/books/"+book_id+"/",
  		data: {title: "Static", author:"Perm", releaseDate: "20", image:"https://cloud.githubusercontent.com/assets/7833470/10892121/866d27bc-8156-11e5-9810-62a875e36c27.jpg"}
  	});
  });

  //Delete Book from List
  $('#books-list').on("click","#delete", function(event){
  	console.log("deletebuttonclicked");
  	var book_id = ($(this).attr("data_id"));
  	$.ajax({
  		type: "DELETE",
  		url: "https://super-crud.herokuapp.com/books/"+book_id+"/",
  		success: function(data){
  			console.log("Book has been removed");
  		},
  		error: function (error) {
    		console.error(error);
  		}	
  	});
  });
});















