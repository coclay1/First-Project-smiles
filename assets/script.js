            
           
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