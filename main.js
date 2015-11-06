// wait for DOM to load before running JS
$(function() {

  // form to create new book
  var $createBook = $('#create-book');

  // element to display list of books
  var $booksList = $('#books-list');

  // loading gif
  var $loading = $('#loading');

  // compile handlebars template
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);

  // GET all books
  $.get('https://super-crud.herokuapp.com/books', function (data) {
    console.log(data);

    // books are in an array called `books`
    var allBooks = data.books;

    // pass in data to render in the template
    var booksHtml = template({ books: allBooks });

    // append html to the view
    $booksList.append(booksHtml);
  });

});