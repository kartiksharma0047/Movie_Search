const btn = document.querySelector("#btn");
const input = document.querySelector("input");
const img_base_path = 'https://image.tmdb.org/t/p/original';
const output = document.querySelector("#output");
const h1 = document.querySelector("h1");

btn.onclick = () => {
    if (input.value) {
        h1.innerHTML = "";
        h1.classList.remove("visible");
        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + "985b071731f610f61d7941ffac8e8545" + "&query=" + input.value + "&include_adult=false&language=en-US&page=1")
            .then((resolve) => { return resolve.json() })
            .then((data) => {
                console.log(data);
                showData(data);
            });
        function showData(d) {
            output.innerHTML = "";
            if (d.total_results != 0) {
                for (let i in d.results) {
                    let link = d.results[i].poster_path;
                    if (link != null) {
                        const Movie_detail = document.createElement("div");
                        Movie_detail.setAttribute("class", "poster");
                        const Movie_name = document.createElement("h3");
                        Movie_name.innerHTML = d.results[i].original_title;
                        const rating = document.createElement("p");
                        rating.innerHTML = "Rating : "
                        const Movie_rating = document.createElement("span");
                        Movie_rating.innerHTML = d.results[i].vote_average;
                        const img = document.createElement("img");
                        img.setAttribute("src", img_base_path + link);
                        img.setAttribute("title", d.results[i].overview);

                        rating.append(Movie_rating);
                        Movie_detail.append(img);
                        Movie_detail.append(Movie_name);
                        Movie_detail.append(rating);

                        output.append(Movie_detail)
                    }
                }
            }
            else {
                h1.classList.add("visible");
                h1.innerHTML = "Movies Site";
            }
        }
    }
    else {
        output.innerHTML = "";
        h1.innerHTML = "Movies Site";
        h1.classList.add("visible");
    }
}
