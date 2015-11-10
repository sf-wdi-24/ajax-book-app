$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  
  // your code here
  var $deleteThis = $('#delete');
  var siteUrl = "https://super-crud.herokuapp.com/books"
  var $submit_book = $('#submit_book');
  var $book_list = $('#books-list');
  var bookCollection = [];
  var source = $('#books_template').html();
  //template is a function //setting up data to pass into template
  var template = Handlebars.compile(source);
  
  var createBooks = function() {
  	$book_list.empty();
  	var booksHtml = template({books: bookCollection});
  	$book_list.append(booksHtml)
  }

  $.get(siteUrl, function(data) {
  	console.log(data.books);
  	 bookCollection = data.books;
  	 createBooks();
  	}
 );

  // $submit_book = $('#submit_book');
  // $book_title = $('#book_title');
  // $author = $('#author');
  // $image = $('#image');
  // $date = $('#date')
  //used the serialize function
  
$submit_book.on('submit', function(event) {
	event.preventDefault();
	//can use $(this).serialize();
	//to get all the data from the form
	var newBook = $(submit_book).serialize();
	  $.post(siteUrl, newBook, function(data){
	  		console.log(data);
	  		bookCollection.push(data);
	  		createBooks();
			});
	  $submit_book[0].reset();
	  $submit_book.find('input').first().focus();
	});	

		$('body').on('click', '.delete_book', function(event) { 
			event.preventDefault();
			console.log('clicked this')
			// get book id
			var bookId = $(this).attr('id');
			console.log(bookId);

			
		$.ajax({
			type: 'DELETE',
			url: siteUrl + '/' + bookId,
			success: function(data) {
				console.log('DESTROYER')
				createBooks();
				// needs a page refresh for the book to be deleted
			}
		});
	});
	$('body').on('click', '.edit_book',function(event) {
		event.preventDefault();
	})
	$('body').on('submit', '.edit_book_form', function(event) {
		event.preventDefault();
		var editFormId = $(this).attr('id');
		var updatedBook = $(this).serialize();

		//ajax put request

		$.ajax({
			type: 'PUT',
			url: siteUrl + '/' + editFormId,
			data: updatedBook,
			success: function(data) {
				console.log('book updated');
				createBooks();
			}
		})
	})
});