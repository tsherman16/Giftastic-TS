//variables======================================================================

var topics = ["Football", "Basketball", "Soccer", "Gym Fail", "Movies", "Madden", "Hip hop", "South Park", "Dogs", "Cats", "Safari"]

//functions =====================================================================

        //function calling for the gifs then displaying the gifs and ratings on the page
function displayGifList () {
    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=aMYkZxZd9DJoNDCwF5t82p0OlpXqgtZ5&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
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

        //function for creating the buttons
function gifButtons () {
    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var g = $("<button>");
        g.addClass("gif-btn");
        g.attr("data-name", topics[i]);
        g.text(topics[i]);
        $("#buttons-view").append(g);
    }
}

        //this is for once inputting text to then run the functions (create buttons, display gifs, etc.)
$("#add-gif").on("click", function(event) {
    //ERROR....ERROR...stating $ not defined
    event.preventDefault();

    var gifInput = $("gif-input").val().trim()

    topics.push(gifInput);

    gifButtons();
})

$(document).on("click", "gif-btn", displayGifList);

gifButtons();

