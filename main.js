// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

var source = $("#books-template").html();
var template = Handlebars.compile(source);

var booksCollection = [];

// GET all books
$.get(
  "https://super-crud.herokuapp.com/books",
  function (data) {
   var bookHtml = template({allBooks: data.books});
	$('#books-list').append(bookHtml);
    console.log(data);
    booksCollection = data.books;
  });

$('#create-book').on('submit', function (event) {
	event.preventDefault();
	console.log('submitting form!');
	console.log($(this).serialize());

	var newBook = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: 'https://super-crud.herokuapp.com/books',
		data: newBook,
		success: function (data) {

		}
});

});
$('#title').val();

// POST request to create new book
$.post(
  "https://super-crud.herokuapp.com/books", 
  newBook,
  function (data) {
  	booksCollection.push(data);
  });

//   {
//     title: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling",
//     image: "https://upload.wikimedia.org/wikipedia/en/b/bf/Harry_Potter_and_the_Sorcerer's_Stone.jpg",
//     releaseDate: "September 1, 1998"
//   },
//   function (data) {
//     console.log(data);
//   }
// );


// 1. form to enter data (in html)
// 2. collect data from form in JS
// 3. AJAX POST request to server to create new book
// 4. handle response from API (render new book)
});