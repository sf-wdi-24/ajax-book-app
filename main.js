// wait for DOM to load before running JS
$(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');

  var source = $('#books-list-template').html(); // loads the html from index.html
  var template = Handlebars.compile(source); // template is a function
  $('#new-book-form').hide();
  $('#completegif').hide();
  getBooks();
  
  // your code here
  function getBooks(){
    $.get('https://super-crud.herokuapp.com/books', function(data){
    	var books = data.books;
    	if(books.length > 0){
    		var trackHtml = template({book: books});
    		$('#books-list').append(trackHtml);
    	} else {
    		$('#books-list').append("No Results Available");
    	}
    });
  }

  function addBook(title, author, imageUrl, releaseDate){
  	var options = {
  		"title": title,
  		"author": author,
  		"image": imageUrl,
  		"releaseDate": releaseDate
  	};
  	$.ajax({
	  type: "POST",
	  url: 'https://super-crud.herokuapp.com/books',
	  data: options,
	  success: function(){
      $('#new-book-form').slideUp("slow");
      $('#completegif').show();
      setTimeout(function(){$('#completegif').slideUp("slow")}, 3000);
      getBooks();
	  }
	});
  }

  function deleteBook(book_id){
    $.ajax({
      type: "DELETE",
      url: 'https://super-crud.herokuapp.com/books/' + book_id,
      success: function (data) {
        console.log("DESTROYED!");
        getBooks();
      },
      error: function (error) {
        console.error(error);
      }
    });
  }

  function updateBook(book_id, title, author, image, releaseDate){
    $.ajax({
      type: "PUT",
      url: 'https://super-crud.herokuapp.com/books/' + book_id,
      data: {title: title, author: author, image: image, releaseDate: releaseDate},
      success: function (data) {
        console.log("UPDATED!");
        $('#books-list').empty();
        getBooks();
      }
    });
  }

  $('#new-book-form-submit').click(function(){
  	var title = $('#title-form').val();
  	var author = $('#author-form').val();
  	var imageUrl = $('#image-url-form').val();
  	var releaseDate = $('#release-date-form').val();
  	addBook(title, author, imageUrl, releaseDate);
  });

  $('#add-book').mouseenter(function(){
  	$(this).css('background-color', "#5bc0de");
  });

  $('#add-book').mouseout(function(){
  	$(this).css('background-color', "grey");
  });

  $('#add-book').click(function(){
  	if ($('#new-book-form').is( ":hidden" )) {
    	$('#new-book-form').slideDown( "slow" );
  	} else {
    	$('#new-book-form').slideUp("slow");
    }
  });

  $('#books-list').on('click', '#delete-book-form', function (e) {
    e.preventDefault();
    var id = e.currentTarget.attributes[2].nodeValue;
    deleteBook(id);
  });

  $('#books-list').on('submit', '.update-book', function(e) {
    e.preventDefault();
    var title = $('#updateTitle').val();
    var author = $('#updateAuthor').val();
    var image = $('#updateImage').val();
    var releaseDate = $('#updateReleaseDate').val();
    var book_id = $('#book-row')[0].attributes[2].nodeValue;
    updateBook(book_id, title, author, image, releaseDate);
    $('#update-' + book_id).collapse('toggle');
  });

});