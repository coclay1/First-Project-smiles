            
           
function tmdbFetch(){
            fetch('https://api.themoviedb.org/3/search/movie?api_key=a3bbed4a6852f63fa3cf3288ada02070&query='+ document.querySelector('#inputBar').value.trim())
            .then(response => response.json() )
            .then(data => {
                console.log(data)
                const dataElement = document.getElementById('TMBDData');
                dataElement.textContent = `What 2 Watch: ${data.results[0].title}`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

                    }

function moviesDbFetch(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe1eb2d7d4msheca0d298fe99168p191519jsn9d55acf114b1',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    fetch('https://moviesdatabase.p.rapidapi.com/titles/search/keyword/'+ document.querySelector('#inputBar').value.trim(),options)
            .then(response => response.json() )
            .then(data => {
                console.log(data)
                const dataElement = document.getElementById('MoviesDBData');
                dataElement.textContent = `What 2 Watch: ${data}`;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
}

document.querySelector("#submitButton").addEventListener("click",function(event){
    event.preventDefault();
    moviesDbFetch();
    tmdbFetch();
})
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
