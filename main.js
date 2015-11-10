// wait for DOM to load before running JS
$(function() {

	// check to make sure JS is loaded
	console.log('JS is loaded!');

	// your code here

	var booksUrl = "https://super-crud.herokuapp.com/books";
	var bookStore = [];
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
		$.post(booksUrl, addedBook, function(data) {
			bookStore.push(data); //add new book to bookStore
			addBookToPage(); //update new book to the Page
		});
	});
	$("#books-list").on("click", ".edit-button", function(){
		var getId = $(this).attr("id");
		var bookToBeEdited = bookStore.filter(function(book){
			return book._id == getId;
		})[0];
		var bookToBeEditedIndex = bookStore.indexOf(bookToBeEdited);
		var $editForm = $("#form"+ getId);
		$editForm.toggle();
		$("#books-list").on("submit", $editForm, function(event) {
			event.preventDefault();
			var editedBook = $editForm.serialize();
			document.getElementById("form" + getId).reset();
			$.ajax({
				type: "PUT",
				url: booksUrl + "/" + getId,
				data: editedBook,
				success: function(data) {
					bookStore.splice(bookToBeEditedIndex,1,data);
					addBookToPage();
				}
			});
		});
	});

});