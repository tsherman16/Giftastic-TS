//variables======================================================================

var topics = ["Football", "Basketball", "Soccer", "Gym Fail", "Movies", "Madden", "Hip hop", "South Park", "Dogs", "Cats", "Safari"]

//functions =====================================================================

//function calling for the gifs then displaying the gifs and ratings on the page
function displayGifList() {
    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=aMYkZxZd9DJoNDCwF5t82p0OlpXqgtZ5&limit=10";

    $("#gif-view").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            var newGifDiv = $("<div class = 'gif'>");

            var gifURL = response.data[i].images.original_still.url;
            var gifRating = response.data[i].rating;
    
            var theGif = $("<img>")
                .attr("src", gifURL)
                .attr("still", gifURL)
                .attr("moving", response.data[i].images.original.url)
                .addClass("gifImage");
            var theRating = $("<p>").text("Rating: " + gifRating)
    
            newGifDiv.append(theGif);
            newGifDiv.append(theRating);
    
            $("#gif-view").prepend(newGifDiv);
        }

    })
}

//function for creating the buttons
function gifButtons() {
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
$(document).on("click", "#add-gif", function (event) {
    event.preventDefault();

    var gifInput = $("#gif-input").val().trim()

    topics.push(gifInput);

    gifButtons();
})

$(document).on("click", ".gif-btn", displayGifList);

$(document).on("click", ".gifImage", function() {
    var $img = $(this);
    if ($img.attr("src").includes("_s")) {
        $img.attr("src", $img.attr("moving"));
    } else {
        $img.attr("src", $img.attr("still"));
    }
});

gifButtons();

