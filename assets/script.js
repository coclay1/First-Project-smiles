var userFormEl = document.querySelector('#user-form');
var movieInput = document.querySelector('.movieInput');
var omdbAPIKey = "3bb8b603";
var tmdbAPIKey = "0ae5ef49885f7fea865abcc7fbc4aef3";

var buttonClick = function (event) {
  event.preventDefault()
  if (!movieInput.value) {
    return;
  }
  var movie = movieInput.value;
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbAPIKey;

  console.log(event)
  fetch(queryURL)
    .then(function (response) {
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var queryURL2 = "https://api.themoviedb.org/3/find/" + data.imdbID + "?api_key=" + tmdbAPIKey + "&language=en-US&external_source=imdb_id";
      fetch(queryURL2)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          

        })
    })

  console.log(event)
}
userFormEl.addEventListener("submit", buttonClick);

var buttonClick = function (event) {
  event.preventDefault()
  if (!movieInput.value) {
    return;
  }
  var movie = movieInput.value;

}