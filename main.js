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
		var bookHtml = template({
			books: bookStore
		});
		$booksList.append(bookHtml);
	}
	$.get(booksUrl, function(data) {
		bookStore = data.books;
		addBookToPage();
	});
	$("form").on("submit", function(event) {
		event.preventDefault();
		var addedBook = $(this).serialize();
		document.getElementById("bookForm").reset(); //use this to clear form
		$.post(booksUrl, addedBook, function(data) {
			bookStore.push(data); //add new book to bookStore
			addBookToPage(); //update new book to the Page
		});
	});

	$("#books-list").on("click", ".edit-button", function() {
		var getId = $(this).attr("id");
		var bookToBeEdited = bookStore.filter(function(book) {
			return book._id == getId;
		})[0];
		var bookToBeEditedIndex = bookStore.indexOf(bookToBeEdited);
		var $editForm = $("#form" + getId);
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
					bookStore = bookStore.splice(bookToBeEditedIndex, 1, data);
					addBookToPage();
				}
			});
		});
	});

	$("#books-list").on("click", "#delete", function() {
		var getId = $(".edit-button").attr("id");
		console.log(getId);
		var bookToBeDelete = bookStore.filter(function(book) {
			return book._id == getId;
		})[0];
		var bookToBeDeleteIndex = bookStore.indexOf(bookToBeDelete);
		$.ajax({
			type: "DELETE",
			url: booksUrl + "/" + getId,
			data: bookToBeDelete,
			success: function(data) {
				bookStore = bookStore.splice(bookToBeDeleteIndex, 1);
				addBookToPage();
			}
		});
	});
});