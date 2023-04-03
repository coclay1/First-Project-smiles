var searchListEl = document.querySelector("#searchHistory")
var history = [];

 function renderSearchHistory () {
    searchListEl.innerHTML = "";

    for (var i = 0; i < history.length; i++) {
        var history1 = history[i];
        var li = document.createElement("li");
        li.textContent = history1;
        li.setAttribute("data-index", i)
        var removeBtn = document.createElement("button");
        removeBtn.textContent("Remove ❌")
        li.appendChild(removeBtn)
        searchListEl.appendChild(li)
    }
 }

 function init() {
    var storedHistory = JSON.parse(localStorage.getItem("search-history"));
    if (storedHistory !== null) {
        history = storedHistory;
    }
    renderSearchHistory();
 }

 function storeSearchHistory() {
    localStorage.setItem("search-history", history)
 }