//variables======================================================================

var topics = ["Football", "Basketball", "Soccer", "Gym Fail", "Movies", "Madden", "Hip hop", "South Park", "Dogs", "Cats", "Safari"]

//functions =====================================================================

        //function displaying the gifs and ratings on the page
function displayGifList () {
    var gifSearch = "";
    //add where to get gifs once function for button rendering made
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var newGifDiv = $("<div class = gif>");

        for (var i = 0; i < topics.length; i++) {
            var gifURL = response.data[i].images.original_still.url;
            var gifRating = response.data[i].rating;

            var theGif = $("<img>").attr("src", gifURL);
            var theRating = $("<p>").text("Rating: " + gifRating)

            newGifDiv.append(theGif);
            newGifDiv.append(theRating);

            $("gif-view").prepend(newGifDiv);
        }
      })
}

