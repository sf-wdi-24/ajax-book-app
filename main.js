// wait for DOM to load before running JS
$(document).ready(function(data) {

	$(function() {

		// check to make sure JS is loaded
		console.log("JS is loaded!");

		var source = $("#books").html();
		var template = Handlebars.compile(source);

		// Get a list of all books
		$.get("https://super-crud.herokuapp.com/books", function(data) {
			console.log(data);

			var booksHtml = template({
				books: data.books
			});
			$("#bookslist").append(booksHtml);
		});
		// Create a new book

		// Need an HTML for that passes data 
		$('#book-form').on('submit', function(event) {
			event.preventDefault();
			console.log('submitting form!');
			console.log($(this).serialize());

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

		});

		// Need a submit handler

		// Need to read form data (in the handler)

		// Create the book using a post method, with the form values
	});

});


// 1. form to enter data in HTML
// 2. collect data from from in JS
// 3. AJAX POST request to server to create new book
// 4. handle response from API  - render a new book to the page