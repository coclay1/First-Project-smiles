
//APIs Code       
function tmdbFetch() {
  fetch('https://api.themoviedb.org/3/search/movie?api_key=a3bbed4a6852f63fa3cf3288ada02070&query=' + document.querySelector('#inputBar').value.trim())
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const dataElement = document.getElementById('TMBDData');
      dataElement.textContent = `What 2 Watch: ${data.results[0].title}`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}

function moviesDbFetch() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'fe1eb2d7d4msheca0d298fe99168p191519jsn9d55acf114b1',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };
  fetch('https://moviesdatabase.p.rapidapi.com/titles/search/keyword/' + document.querySelector('#inputBar').value.trim(), options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const dataElement = document.getElementById('MoviesDBData');
      dataElement.textContent = `What 2 Watch: ${data}`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

document.querySelector("#submitButton").addEventListener("click", function (event) {
  event.preventDefault();
  moviesDbFetch();
  tmdbFetch();
})

//Code for search results


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

  // https://api.themoviedb.org/3/movie/550?api_key=0ae5ef49885f7fea865abcc7fbc4aef3
  // https://api.themoviedb.org/3/find/ZAa?api_key=PUT_YOUR_API_KEY_HERE&language=en-US&external_source=imdb_id
  // var queryURL2 = "https://api.themoviedb.org/3/movie/550?t=" + movie + "&apikey=" + tmdbAPIKey;
  var queryURL2 = "https://api.themoviedb.org/3/find/tt0133093?api_key=" + tmdbAPIKey + "&language=en-US&external_source=imdb_id";


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

}

// userFormEl.addEventListener("submit", buttonClick2);
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

