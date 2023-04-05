
var userFormEl = document.querySelector('#user-form');
var movieInput = document.querySelector('.movieInput');
var omdbAPIKey = "3bb8b603";
var tmdbAPIKey = "0ae5ef49885f7fea865abcc7fbc4aef3";
// omdbapi.com - send all data requests to http://www.omdbapi.com/?apikey=[yourkey]&



var buttonClick = function (event) {
  event.preventDefault()
  if (!movieInput.value) {
    return;
  }
  var movie = movieInput.value;
  var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbAPIKey;
  // https://api.themoviedb.org/3/movie/550?api_key=0ae5ef49885f7fea865abcc7fbc4aef3
  // https://api.themoviedb.org/3/find/ZAa?api_key=PUT_YOUR_API_KEY_HERE&language=en-US&external_source=imdb_id
  // var queryURL2 = "https://api.themoviedb.org/3/movie/550?t=" + movie + "&apikey=" + tmdbAPIKey;
  var queryURL2 = "https://api.themoviedb.org/3/find/tt0133093?api_key="+tmdbAPIKey+"&language=en-US&external_source=imdb_id";
  console.log(event)
  fetch(queryURL)
    .then(function (response) {
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  
  console.log(event)
  fetch(queryURL2)
    .then(function (response) {
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}
userFormEl.addEventListener("submit", buttonClick);



var buttonClick = function (event) {
  event.preventDefault()
  if (!movieInput.value) {
    return;
  }
  var movie = movieInput.value;

}
// userFormEl.addEventListener("submit", buttonClick2);
//Local Storage
var searchHistoryEl = document.querySelector("#searchHistory")
var searchBarEl = document.querySelector("#searchBar")
var searchTextEl = document.querySelector("#searchText")
var historyArr = [];


 function renderSearchHistory () {
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

 searchBarEl.addEventListener("submit", function(event) {
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

 searchHistoryEl.addEventListener("click", function(event) {
   var element = event.target;
   if (element.matches("button") === true) {
      var index = element.parentElement.getAttribute("data-index");
      historyArr.splice(index, 1);
      storeSearchHistory();
      renderSearchHistory();
   }
 })

init()

