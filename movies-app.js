
$(document).ready(function(){
    let moviesArr = [];
    let url = 'https://bumpy-proximal-dogwood.glitch.me/movies';

    //Function to get listing of movies
    const moviePoster = () => {
        //Displays a loading message
        let loadingMsg = `<div class = 'loading'>loading...</div>`
        $('#movie-container').html(loadingMsg);
        //Fetches data from json
        fetch(url)
            .then(resp => resp.json())
            .then(movies => {
                moviesArr = movies;
                let htmlStr = '';
                //Iterates through movies array
                for(let movie of movies){
                    //Creates movie display of posters with title, genre, rating, director
                    htmlStr += `<div class = 'moviePoster'>`
                    htmlStr += `<h1 class = 'title'>${movie.title}</h1>`
                    htmlStr += `<div class = 'genre'>Genre: ${movie.genre}</div>`
                    htmlStr += `<img src = ${movie.poster}>`
                    htmlStr += `<div class = 'rating'>Rating: ${movie.rating}</div><div class = 'director'>Director: ${movie.director}</div>`
                    htmlStr +=  `<div class = 'plot'>Plot: ${movie.plot}</div>`
                    htmlStr += `</div>`

                }
                console.log(movies);
                $('#movie-container').html(htmlStr);
            });
    }
    moviePoster();

    //Once clicked, toggles post form info to allow for user input
    $('#add-new-movie').click(function(){
        $('#new-movie-info-form').toggleClass('hidden-info');
    })

    //Once clicked, toggles class to remove input boxes and the ability to input information
    $('#new-movie').click(function(){
        $('#new-movie-info-form').toggleClass('hidden-info')
    })

    //Will create, post, then fetch the new title and rating that the user input
    $('#new-movie').click((e) => {
        e.preventDefault();

        let addNewMovie = {
            title: $('#title').val(),
            rating: $('#rating').val()
        }

        const postNewOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addNewMovie)
        };
        fetch(url, postNewOptions)
            .then(resp => resp.json())
            .then(moviePoster)
            .catch(err => console.log(err))
    })



//End of document.ready
})