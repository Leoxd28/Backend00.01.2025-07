//----------------------------------------------------------------------
//---Ejercicio 1. Ingrese el usuario de github
//----------------------------------------------------------------------

const username = document.getElementById("user-github");
const btnGithub = document.getElementById("btn-github");

const showSection = (sectionName) => {
  const section = document.getElementById(sectionName);
  section.classList.remove("hidden");
  section.classList.add("block");
};

const hiddenSection = (sectionName) => {
  const section = document.getElementById(sectionName);
  section.classList.add("hidden");
};

btnGithub.addEventListener("click", async () => {
  const user = username.value;
  if (!user) {
    alert("El usuario es necesario");
  }

  hiddenSection("github-section");
  showSection("result-github");

  const response = await fetch(`https://api.github.com/users/${user}`);

  const reposResponse = await fetch(
    `https://api.github.com/users/${user}/repos`
  );
  const repos = await reposResponse.json();

  const data = await response.json();

  const container = document.getElementById("result-github");

  container.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg px-5 py-2">
        <div class="flex flex-row items-center justify-center p-5">
          <img class="rounded-full w-32 h-32 overflow-hidden m-5"
            src="${data.avatar_url}"
            alt="${data.login}"
          />
          <div class="flex flex-col items-start justify-center m-5">
            <h1 class="text-xl font-bold">${data.login}</h1>
            <h2>${data.name || "Sin nombre"}</h2>
            <h3>${data.location || "Sin ubicación"}</h3>
            <h4>${data.company || "Sin compañía"}</h4>
          </div>
        </div>

        <div class="w-full h-[1px] border"></div>

        <div class="flex flex-row items-center justify-around p-5">
          <h2 class="font-bold">Repositorios</h2>
          <span>${repos.length}</span>
        </div>

        <div class="w-full h-[1px] border"></div>

        <div>
          <div class="grid max-h-[450px] overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
            ${repos
              .map(
                (repo) => `
              <div
                class="bg-gray-100 flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <h3 class="text-lg font-semibold mb-2">${repo.name}</h3>
                  <p class="text-gray-700">${
                    repo.description || "Sin descripción"
                  }</p>
                  <span class="text-sm text-gray-600">${
                    repo.language || "Desconocido"
                  }</span>
                </div>
                <a
                  href="${repo.html_url}"
                  target="_blank"
                  class="text-blue-500 hover:underline mt-2 inline-block"
                >Ver más</a>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>`;
});


//----------------------------------------------------------------------
//---Ejercicio 13. Ingrese el nombre de la película 
// https://developer.themoviedb.org/reference/person-popular-list
//----------------------------------------------------------------------

const sectionMovies = document.getElementById("result-movies");
const movieInput = document.getElementById("movie-input");
const movieSearch = document.getElementById("movie-search");

const tokenMovieDB = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTIxZTRiM2QxOWY0ZTExOWEyNDBhY2I2ZjhmOTNkMiIsIm5iZiI6MTc1NzE4NDMxMS4zNTM5OTk5LCJzdWIiOiI2OGJjODEzNzU3NzIzNjA4OGExYmMxMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.K4I33ADDjbeHFG0euJ4e7xrK11Sf0l597NR9DSXdZsc";

const getMovies = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=es-ES`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${tokenMovieDB}`,
    },
  });

  const data = await response.json();

  sectionMovies.innerHTML = `
    <div class="w-full min-w-xl grid grid-cols-3 gap-4 p-10 max-h-[400px] overflow-auto">
      ${data.results && data.results.length > 0
        ? data.results
            .map(
              (movie) => `
        <div class="w-full flex items-center justify-center h-[280px] bg-white rounded-lg shadow-lg relative">
          <img
              class="w-full h-[280px] rounded-lg"
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              alt="Avatar"
          />
          <div class="absolute w-full text-center text-white bg-white/30 bottom-0 text-wrap backdrop:blur-lg py-2 font-bold">
              ${movie.title}
          </div>
        </div>
        `
            )
            .join("")
        : "<div class='col-span-3 text-center text-gray-500'>No se encontraron películas.</div>"
      }
    </div>
  `;
};

// Ejecutar búsqueda al hacer click en BUSCAR o presionar Enter
if (movieSearch && movieInput) {
  movieSearch.addEventListener("click", () => {
    const value = movieInput.value.trim();
    if (value.length >= 3) getMovies(value);
  });
  movieInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = movieInput.value.trim();
      if (value.length >= 3) getMovies(value);
    }
  });
}





//----------------------------------------------------------------------
//---Ejercicio 14. Ingrese el nombre de la película desea DETALLE
// https://developer.themoviedb.org/reference/person-popular-list
//----------------------------------------------------------------------

const tokenMovieDetailDB = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTIxZTRiM2QxOWY0ZTExOWEyNDBhY2I2ZjhmOTNkMiIsIm5iZiI6MTc1NzE4NDMxMS4zNTM5OTk5LCJzdWIiOiI2OGJjODEzNzU3NzIzNjA4OGExYmMxMmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.K4I33ADDjbeHFG0euJ4e7xrK11Sf0l597NR9DSXdZsc";

// Buscar la película por nombre
const searchMovie = async (name) => {
  const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(name)}&language=es-ES`, {
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${tokenMovieDetailDB}`,
    },
  });
  const data = await resp.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].id; // Primer resultado
  }
  return null;
};

// Obtener detalles usando el ID (en español)
const getMovieDetails = async (movieId) => {
  const resp = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=es-ES`, {
    headers: {
      "accept": "application/json",
      "Authorization": `Bearer ${tokenMovieDetailDB}`,
    },
  });
  return await resp.json();
};

// Conectar el input y el botón con la búsqueda y mostrar el resultado
const movieDetailInput = document.getElementById("movie-detail-input");
const movieDetailSearch = document.getElementById("movie-detail-search");
const resultMovieDetail = document.getElementById("result-movie-detail");

const buscarYMostrarDetalle = async () => {
  const value = movieDetailInput.value.trim();
  resultMovieDetail.innerHTML = "";
  if (value.length >= 1) {
    const movieId = await searchMovie(value);
    if (movieId) {
      const detail = await getMovieDetails(movieId);
      resultMovieDetail.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
          <img class="w-48 h-72 rounded-lg mb-4" src="https://image.tmdb.org/t/p/w500${detail.poster_path}" alt="${detail.title}" />
          <div class="font-bold text-lg mb-2">${detail.title}</div>
          <div class="text-gray-700 text-sm mb-2">${detail.release_date}</div>
          <div class="text-gray-600 text-sm">${detail.overview}</div>
        </div>
      `;
    } else {
      resultMovieDetail.innerHTML = `<div class="text-center text-gray-500">No se encontró la película.</div>`;
    }
  }
};

if (movieDetailSearch && movieDetailInput) {
  movieDetailSearch.addEventListener("click", buscarYMostrarDetalle);
  movieDetailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") buscarYMostrarDetalle();
  });
}