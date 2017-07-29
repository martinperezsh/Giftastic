var buttonWords = ["One Piece", "Fairy Tail", "D Gray-Man", "Toriko", "Full Metal Alchemist", "Hunter x Hunter", "Yu Yu Hakusho", "Soul Eater", "Gintama"];

// creates buttons
function renderbtns(){
  $('#buttonArea').empty();

  for(var i = 0; i < buttonWords.length; i++) {
    var buttonTag = $('<button>');
    buttonTag.addClass('buttonMargin');
    buttonTag.attr('data-search', buttonWords[i]);
    buttonTag.text(buttonWords[i]);
    $('#buttonArea').append(buttonTag);
  };
};
// create a button with the search area
$('#submitSearch').on('click', function(event){
  event.preventDefault();
  var searchTerm = $('#searchBox').val().trim();
  buttonWords.push(searchTerm);
  renderbtns();
});
// Appending the buttons to the html
$("#buttonArea").on("click", "button", function(){
	var anime = $(this).attr("data-search");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        anime + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
    console.log(response);

      var results = response.data;
      for (var i = 0; i < results.length; i++){
      	var animeDiv = $("<div>");
        var p = $("<p>");
        $("p").text("Rating: " +  results[i].rating);
        var animeImage = $("<img>");
        animeImage.attr("src", results[i].images.fixed_height_small_still.url);
        animeImage.attr("data-still", results[i].images.fixed_height_small_still.url);
        animeImage.attr('data-state', "still");
        animeImage.attr('data-animate', results[i].images.fixed_height_small.url);
        animeImage.addClass('gifBox');
        animeDiv.append(p);
        animeDiv.append(animeImage);
        $("#gifs-appear-here").prepend(animeDiv);
      }
    });
});
renderbtns();

$("#gifs-appear-here").on("click", 'img', function() {
   var state = $(this).attr("data-state");
      console.log(state);

    var img = $(this);
    var animated = img.attr("data-animate");
    var stillURL = img.attr("data-still");
    if (state === "still") {
        img.attr("src", animated);
        img.attr('data-state', 'animated');
       } else {
        img.attr('src', stillURL);
        img.attr('data-state', 'still');
       }
});