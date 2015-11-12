// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  // your code here
  $.get(
    "https://super-crud.herokuapp.com/books",
    function (data) {
      var bookResults = data.books;
      var bookHtml = template({books: bookResults});

      console.log(data);
    }
  );


  //1. form to entere data (in html) X
  //2. collect data from form in JS
  //3. AJAX POST	request to server to create new book
  //4. handle response from API (render new book)

});