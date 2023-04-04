var userFormEl = document.querySelector('#user-form');
var movieInput = document.querySelector('.movieInput');
var omdbAPIKey = "3bb8b603"
// omdbapi.com - send all data requests to http://www.omdbapi.com/?apikey=[yourkey]&




var buttonClick = function (event){
  event.preventDefault()
  if (!movieInput.value) {
    return;
  }

  var movie = movieInput.value;
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbAPIKey;
  console.log(event)
  fetch(queryURL)
  .then(function (response){
    console.log(response);

    return response.json();
  })
    .then(function (data){
      console.log(data);
    })



  

}
userFormEl.addEventListener("submit", buttonClick);
