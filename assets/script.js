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