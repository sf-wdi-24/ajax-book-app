// wait for DOM to load before running JS
$(function() {

	// check to make sure JS is loaded
	console.log('JS is loaded!');

	// your code here
	var booksUrl = "https://super-crud.herokuapp.com/books";
	var bookStore = [];
	console.log(bookStore);
	var $booksList = $('#books-list');
	
	//compile handlebars template
	var source = $("#books-template").html();
	var template = Handlebars.compile(source);

	function addBookToPage() {
		document.getElementById("bookForm").reset(); //use this to clear form
		var bookHtml = template({books: bookStore});
		$booksList.append(bookHtml);
	}
	$.get(booksUrl, function(data) {
		bookStore = data.books;
		addBookToPage();
	}); 

	$("form").on("submit", function(event){
		event.preventDefault();
		var addedBook = $(this).serialize();
		$.post(booksUrl, addedBook, function(newbook) {
			bookStore.push(newbook); //add new book to bookStore
			addBookToPage(); //update new book to the Page
		});
	});
});