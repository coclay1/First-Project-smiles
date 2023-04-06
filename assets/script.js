var userFormEl = document.querySelector('#user-form');
var movieInput = document.querySelector('.movieInput');
var omdbAPIKey = "3bb8b603";
var tmdbAPIKey = "0ae5ef49885f7fea865abcc7fbc4aef3";
var omdbRating = document.getElementById("omdbRating");
var tmdbRating = document.getElementById("tmdbRating");
var title1 = document.getElementById("titleOne");
var title2 = document.getElementById("titleTwo");
var poster1 = document.getElementById("posterOne")
var poster2 = document.getElementById("posterTwo")


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
      // grabbing API data here for OMDB
      var omdbRatingData = (data.imdbRating);
      omdbRating.textContent = omdbRatingData;
      // ** attempting to get poster and put in html lol
      var titleData = (data.Title);
      title1.textContent = titleData;


      // document.getElementById("posterOne").setAttribute("src", data.Poster)
      var posterData = (data.Poster);
      poster1.setAttribute("src", data.Poster);


      var queryURL2 = "https://api.themoviedb.org/3/find/" + data.imdbID + "?api_key=" + tmdbAPIKey + "&language=en-US&external_source=imdb_id";
      fetch(queryURL2)
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // grabbing API data here for TMDB
          var tmdbRatingData = (data.movie_results[0].vote_average);
          tmdbRating.textContent = tmdbRatingData;
          // ** attempting to get poster and put in html lol
          var titleData2 = (data.movie_results[0].title);
          title2.textContent = titleData2;

          var posterData2 = (data.movie_results[0].poster_path);
          poster2.setAttribute("src", "https://image.tmdb.org/t/p/original/" +  posterData2);
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


//Local Storage
var searchHistoryEl = document.querySelector("#searchHistory")
var searchBarEl = document.querySelector("#searchBar")
var searchTextEl = document.querySelector("#searchText")
var historyArr = [];


function renderSearchHistory() {
  searchHistoryEl.innerHTML = "";

  for (var i = 0; i < historyArr.length; i++) {
    var history1 = historyArr[i];
    var li = document.createElement("li");
    li.textContent = history1;
    li.setAttribute("data-index", i)
    var removeBtn = document.createElement("button");
    removeBtn.textContent = ("Remove ❌");
    li.appendChild(removeBtn);
    searchHistoryEl.appendChild(li);
  }
}


function init() {
  var storedHistory = JSON.parse(localStorage.getItem("search-history"));
  if (storedHistory !== null) {
    historyArr = storedHistory;
  }
  renderSearchHistory();
}


function storeSearchHistory() {
  localStorage.setItem("search-history", JSON.stringify(historyArr));
}

searchBarEl.addEventListener("submit", function (event) {
  event.preventDefault();
  var searchText = searchTextEl.value.trim();
  if (searchText === "") {
    return;
  }
  historyArr.push(searchText);
  searchTextEl.value = "";

  storeSearchHistory()
  renderSearchHistory()
})

searchHistoryEl.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    historyArr.splice(index, 1);
    storeSearchHistory();
    renderSearchHistory();
  }
})

