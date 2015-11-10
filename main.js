// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  // Compile the template
  var source   = $('#template').html();
	var template = Handlebars.compile(source);
	var bookResults = [];

  // Use AJAX to get data and append it to the page
  $.get("https://super-crud.herokuapp.com/books/", function(data) {
  	console.log(data.books);
  	bookResults = data.books;

	 	// Render the data
	  var bookHTML = template({books: bookResults});
	  $('#books-list').append(bookHTML);
  });

  // Refresh function called by addBook, putBook, and deleteBook
	function refresh (data) {
		console.log('refreshing');
		$('#books-list').empty();
		$('input').val('');
		// Rerender the data
	  var bookHTML = template({books: bookResults});
	  $('#books-list').append(bookHTML);
	}

	// Add book function called by submit button handler
	function addBook(data) {
		bookResults.push(data);
		refresh();
	}

	// Put book function called by glyphicon pencil handler
	function putBook() {
		event.preventDefault();
		var id = $(this).attr('id');
		$('#form' + id).toggle();
		$('#form' + id).on('submit', function(event) {
			event.preventDefault();
			var updatedBook = $(this).serialize();
			$.ajax({
				type: 'PUT',
				url: 'https://super-crud.herokuapp.com/books/' + id,
				data: updatedBook,
				success: function (data) {
					var index;
					for (var i=0; i<bookResults.lenght; i++) {
						if (bookResults[id] === id) {
							index = i;
						}
					}
					bookResults.splice(index, 1);
					bookResults.push();
					refresh();
				}
			});
		});
	}

	// Delete book function called by glyphicon trash handler
	function deleteBook() {
		event.preventDefault();
		var id = $(this).attr('id');
		$.ajax({
			type: 'DELETE',
			url: 'https://super-crud.herokuapp.com/books/' + id,
			success: function (data) {
				var index;
				for (var i=0; i<bookResults.lenght; i++) {
					if (bookResults[id] === id) {
						index = i;
					}
				}
				bookResults.splice(index, 1);
				refresh();
				console.log('deleted');
			}
		});
	}

	// Click handler for Submit button to add a book
  $('#newBook').on('submit', function(event) {
  	event.preventDefault();
		var newBook = $(this).serialize();
		$.post("https://super-crud.herokuapp.com/books/", newBook, addBook);
  });

  // Click handler for glyphicon pencil
  $('#books-list').on('click', '.glyphicon-pencil', putBook);

  // Click handler for glyphicon trash
  $('#books-list').on('click', '.glyphicon-trash', deleteBook);

});