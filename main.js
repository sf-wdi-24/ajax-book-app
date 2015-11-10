// wait for DOM to load before running JS
$(document).ready(function(data) {

	// check to make sure JS is loaded
	console.log("JS is loaded!");

	var source = $("#books").html();
	var template = Handlebars.compile(source);

	// Get a list of all books
	$('#showbooks').on('click', function(event) {

		$.get("https://super-crud.herokuapp.com/books", function(data) {
			console.log(data);

			var booksHtml = template({
				books: data.books
			});
			$("#bookslist").append(booksHtml);
		});
	});
	// Create a new book

	// Need an HTML for that passes data 
	$('#book-form').on('submit', function(event) {
		event.preventDefault();
		console.log('submitting form!');
		console.log($(this).serialize());

		// Need a submit handler

		// Need to read form data (in the handler)

		// Create the book using a post method, with the form values

		var newBook = $(this).serialize();

		$.ajax({
			type: 'POST',
			url: 'https://super-crud.herokuapp.com/books',
			data: newBook,
			success: function(data) {
				$('#title').val();
				$('#author').val();
			}
		});

		// Need another form that shows up in the list of book, with Edit and Delete
		// The Edit and Delete buttons need to be connected to JS file as "PUT" and "DELETE" functionality
		// So handlebars should ouput an Edit and Delete button with each book.  
		// The Edit and Delete buttons are Bootstrap buttons


	});
	$('.book-edit').on('submit', function(event) {
		event.preventDefault();

		// find the book's id (stored in HTML as `data-id`)

		var bookId = $(this).closest('.book').attr('data-id');

		// find the book to update by its id
		var bookToUpdate = allBooks.filter(function(book) {
			return book._id == bookId;
		})[0];
		// serialze form data

		var updatedBook = $(this).serialize();

		$.ajax({
				type: 'PUT',
				url: 'https://super-crud.herokuapp.com/books',
				+'/' + 'bookId';
				data: updatedBook;
				success: function(data) {
					$('#title').val();
					$('#author').val();
					event.preventDefault();

					console.log("Edit this book button was clicked, right?");

					allBooks.splice(allBooks.indexOf(bookToUpdate), 1, data);

					// My PUT function isn't being seen by the program.  It's being skipped. 

					// render all books to view
					render();
				});

		};
	});
});


// 1. form to enter data in HTML
// 2. collect data from from in JS
// 3. AJAX POST request to server to create new book
// 4. handle response from API  - render a new book to the page