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

	function refresh (data) {
		$('#books-list').empty();
		$('input').val('');
		// Rerender the data
	  var bookHTML = template({books: bookResults});
	  $('#books-list').append(bookHTML);
	}

	function addBook(data) {
		bookResults.push(data);
		refresh();
	}

	function putBook(data) {
		event.preventDefault();
		var url = 'https://super-crud.herokuapp.com/books/' + $(this)._id;
		$.ajax({
			type: 'PUT',
			url: url,
			success: function (data) {
				bookResults.splice()
			}
		});
	}

  $('#newBook').on('submit', function(event) {
  	event.preventDefault();
  	console.log($(this).serialize());
		var newBook = $(this).serialize();
		$.post("https://super-crud.herokuapp.com/books/", newBook, addBook);
  });

  $('.glyphicon-pencil').click(putBook);



});