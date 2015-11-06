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

  // add event-handlers to books for updating/deleting
  $booksList

    // for update: submit event on `.update-book` form
    .on('submit', '.update-book', function (event) {
      event.preventDefault();
      
      // find the book's id (stored in HTML as `data-id`)
      var bookId = $(this).closest('.book').attr('data-id');

      // find the book to update by its id
      var bookToUpdate = allBooks.filter(function (book) {
        return book._id == bookId;
      })[0];

      // serialze form data
      var updatedBook = $(this).serialize();

      // PUT request to update book
      $.ajax({
        type: 'PUT',
        url: baseUrl + '/' + bookId,
        data: updatedBook,
        success: function(data) {
          // replace book to update with newly updated version (data)
          allBooks.splice(allBooks.indexOf(bookToUpdate), 1, data);

          // render all books to view
          render();
        }
      });
    })
    
    // for delete: click event on `.delete-book` button
    .on('click', '.delete-book', function (event) {
      event.preventDefault();

      // find the book's id (stored in HTML as `data-id`)
      var bookId = $(this).closest('.book').attr('data-id');

      // find the book to update by its id
      var bookToDelete = allBooks.filter(function (book) {
        return book._id == bookId;
      })[0];

      // DELETE request to delete book
      $.ajax({
        type: 'DELETE',
        url: baseUrl + '/' + bookId,
        success: function(data) {
          // remove deleted book from all books
          allBooks.splice(allBooks.indexOf(bookToDelete), 1);

          // render all books to view
          render();
        }
      });
    });

});