// wait for DOM to load before running JS
$(function() {

  // base API route
  var baseUrl = 'https://super-crud.herokuapp.com/books';

  // array to hold book data from API
  var allBooks = [];

  // element to display list of books
  var $booksList = $('#books-list');

  // form to create new book
  var $createBook = $('#create-book');

  // compile handlebars template
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);

  // helper function to render all books to view
  // note: we empty and re-render the collection each time our book data changes
  var render = function() {
    // empty existing books from view
    $booksList.empty();

    // pass `allBooks` into the template function
    var booksHtml = template({ books: allBooks });

    // append html to the view
    $booksList.append(booksHtml);
  };

  // GET all books on page load
  $.get(baseUrl, function (data) {
    console.log(data);

    // set `allBooks` to book data from API
    allBooks = data.books;

    // render all books to view
    render();
  });

  // listen for submit even on form
  $createBook.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newBook = $(this).serialize();

    // POST request to create new book
    $.post(baseUrl, newBook, function (data) {
      console.log(data);

      // add new book to `allBooks`
      allBooks.push(data);

      // render all books to view
      render();
    });

    // reset the form
    $createBook[0].reset();
    $createBook.find('input').first().focus();
  });

});