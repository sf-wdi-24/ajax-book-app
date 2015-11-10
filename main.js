// wait for DOM to load before running JS
$(function() {

	// check to make sure JS is loaded
	console.log("JS is loaded!");

	var source = $("#books").html();
	var template = Handlebars.compile(source);

	$.get("https://super-crud.herokuapp.com/books", function(data) {
		console.log(data);

		var booksHtml = template({
			books: data.books
		});
		$("#bookslist").append(booksHtml);
	});

});

$("create-book").on("submit", function(event) {
			event.preventDefault();
			console.log($(this.serialize());

				var newBook = $(this).serialize();

				$.ajax({
					type: "POST",
					url: "https://super-crud.herokuapp.com/books"
					data: newBook,
					success: function(data) {

						console.log(data);

					}
				});


				$.post("https://super-crud.herokuapp.com/books, "
					newBook,
					function(data) {
						booksCollection.push(data);
						console.log(data)
					}

				)
			};

			// 1. form to enter data in HTML
			// 2. collect data from from in JS
			// 3. AJAX POST request to server to create new book
			// 4. handle response from API  - render a new book to the page