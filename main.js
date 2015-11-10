// wait for DOM to load before running JS
$(function() {
	// check to make sure JS is loaded
	console.log('JS is loaded!');
	var source = $("#template").html();
	var template = Handlebars.compile(source);

	var booksCollection = [];

	$.get("https://super-crud.herokuapp.com/books", function(data) {
		booksCollection = data.books;
		addBook();
	});

	function addBook() {
		var html = template({book: booksCollection});
		$('#books-list').append(html);
		document.getElementById("bookForm").reset();
	}



	$(document).on('click', '.glyphicon-pencil', function (event) {
		var id = $(this).attr('id');
		$('#form' + id).toggle();
		console.log("clicked");
	});

	$('#books-list').on('submit', '.editDrop', function (event) {
		event.preventDefault();
		console.log(this);
		var bookId = $('.editDrop').attr('id');
		console.log(bookId);
		var bookToUpdate = booksCollection.filter(function (book) {
        	return book._id == bookId;
      		})[0];
		var editBook = $(this).serialize();
			
			$.ajax({
			type : 'PUT',
			url : "https://super-crud.herokuapp.com/books/" + bookId, 
			data: editBook,
			success: function() {
				booksCollection.splice(booksCollection.indexOf(bookToUpdate), 1, data);
			} 
			});

	});

	$('#bookForm').on('submit', function(event) {
		event.preventDefault();
		var newBook = $(this).serialize();

		$.post("https://super-crud.herokuapp.com/books", newBook, function (data) {
			booksCollection.push(data);
			$('#books-list').empty();
			addBook();
		});


	});


});