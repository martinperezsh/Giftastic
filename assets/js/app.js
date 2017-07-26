$("button").on("click", function(){
	var anime = $(this).attr("data-anime");
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
        animeImage.attr("src", results[i].images.original.url);
        animeDiv.append(p);
        animeDiv.append(animeImage);
        $("#gifs-appear-here").prepend(animeDiv);
      }
    });
});


