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
  $('#books-list').on("click","#edit", function(event){
  	event.preventDefault();
  	console.log("editbuttonclicked");
  	console.log(data_id.closest());
  });

  //Delete Book from List
  $('#books-list').on("click","#delete", function(event){
  	console.log("deletebuttonclicked");
  });
});















