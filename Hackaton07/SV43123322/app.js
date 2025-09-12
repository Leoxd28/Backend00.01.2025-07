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
//---Ejercicio 2. Consultar el Clima de una ciudad o ubicacion especifica                      
// https://www.weatherapi.com/
//----------------------------------------------------------------------

const weatherBtn = document.getElementById("weather-search-btn");
const weatherInput = document.getElementById("weather-city-input");
const weatherResult = document.getElementById("weather-result");

if (weatherBtn && weatherInput && weatherResult) {
  weatherBtn.addEventListener("click", async () => {
    const city = weatherInput.value.trim();
    weatherResult.innerHTML = "<div class='text-center text-gray-500'>Consultando clima...</div>";
    if (!city) {
      weatherResult.innerHTML = "<div class='text-center text-red-500'>Ingrese una ciudad o ubicación.</div>";
      return;
    }
    try {
      const apiKey = "28c8d53c8c9447619fb42704250809";
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=es`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        weatherResult.innerHTML = `<div class='text-center text-red-500'>${data.error.message}</div>`;
        return;
      }
      weatherResult.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
          <div class="font-bold text-lg mb-2">${data.location.name}, ${data.location.country}</div>
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" class="w-20 h-20 mb-2"/>
          <div class="text-gray-700 text-xl mb-2">${data.current.temp_c}°C</div>
          <div class="text-gray-600 text-sm mb-2">${data.current.condition.text}</div>
          <div class="text-gray-500 text-xs">Humedad: ${data.current.humidity}% | Viento: ${data.current.wind_kph} km/h</div>
          <div class="text-gray-400 text-xs mt-2">Última actualización: ${data.current.last_updated}</div>
        </div>
      `;
    } catch (error) {
      weatherResult.innerHTML = "<div class='text-center text-red-500'>Error al consultar la API de clima.</div>";
    }
  });
}





//----------------------------------------------------------------------
//-- Ejercicio 3. Consultar el tipo de cambio del dolar en Peru                          
// https://open.er-api.com/v6/latest/USD
//----------------------------------------------------------------------

 const usdPenBtn = document.getElementById("usd-pen-btn");
const usdPenResult = document.getElementById("usd-pen-result");

if (usdPenBtn && usdPenResult) {
  usdPenBtn.addEventListener("click", async () => {
    usdPenResult.innerHTML = "<div class='text-center text-gray-500'>Consultando tipo de cambio...</div>";
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();
      const rate = data.rates && data.rates.PEN;
      if (rate) {
        usdPenResult.innerHTML = `
          <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
            <div class="font-bold text-lg mb-2">Tipo de cambio USD a PEN</div>
            <div class="text-gray-700 text-xl">1 USD = <span class="font-bold text-blue-700">${rate}</span> PEN</div>
            <div class="text-gray-500 text-xs mt-2">Fecha: ${data.time_last_update_utc}</div>
          </div>
        `;
      } else {
        usdPenResult.innerHTML = "<div class='text-center text-red-500'>No se pudo obtener el tipo de cambio.</div>";
      }
    } catch (error) {
      usdPenResult.innerHTML = "<div class='text-center text-red-500'>Error al consultar la API de tipo de cambio.</div>";
    }
  });
}



//----------------------------------------------------------------------
//---Ejercicio 4. Consultar la lista de Pokemones actual                     
// https://pokeapi.co/docs/v2#resource-listspagination-section
//----------------------------------------------------------------------


  const pokemonBtn = document.getElementById("pokemon-list-search");
const pokemonResult = document.getElementById("result-pokemon-list");

if (pokemonBtn && pokemonResult) {
  pokemonBtn.addEventListener("click", async () => {
    pokemonResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Cargando...</div>";
    try {
 
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0");
      const data = await response.json();
      if (data.results && data.results.length > 0) {
 
        const pokemons = await Promise.all(
          data.results.slice(0, 1500).map(async (pokemon) => {
            const pokeResp = await fetch(pokemon.url);
            const pokeData = await pokeResp.json();
            return {
              name: pokemon.name,
              image: pokeData.sprites.front_default,
            };
          })
        );
        pokemonResult.innerHTML = `
          <div class="w-full text-center font-bold text-lg mb-4">
            Total de Pokemones: ${data.count}
          </div>
          <div class="w-full min-w-xl grid grid-cols-3 gap-4 p-10 max-h-[600px] overflow-auto">
            ${pokemons
              .map(
                (pokemon) => `
                  <div class="w-full flex flex-col items-center justify-center h-[180px] bg-white rounded-lg shadow-lg p-4">
                    <img src="${pokemon.image}" alt="${pokemon.name}" class="w-16 h-16 mb-2"/>
                    <span class="font-bold text-blue-700">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        `;
      } else {
        pokemonResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>No se encontraron pokemones.</div>";
      }
    } catch (error) {
      pokemonResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Error al consultar la API de Pokemones.</div>";
    }
  });
}



//----------------------------------------------------------------------
//---Ejercicio 5. Consultar los poderes de un pokemon especifico                                  
// https://pokeapi.co/docs/v2#abilities
//----------------------------------------------------------------------

const abilityBtn = document.getElementById("pokemon-abilities-search");
const abilityInput = document.getElementById("pokemon-abilities-input");
const abilityResult = document.getElementById("result-pokemon-abilities");

if (abilityBtn && abilityInput && abilityResult) {
  abilityBtn.addEventListener("click", async () => {
    const pokemonName = abilityInput.value.trim().toLowerCase();
    abilityResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Cargando...</div>";
    if (!pokemonName) {
      abilityResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Ingrese el nombre de un Pokémon.</div>";
      return;
    }
    try {

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        abilityResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>No se encontró el Pokémon.</div>";
        return;
      }
      const data = await response.json();
      if (!data.abilities || data.abilities.length === 0) {
        abilityResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Este Pokémon no tiene habilidades registradas.</div>";
        return;
      }

      const abilities = await Promise.all(
        data.abilities.map(async (item) => {
          const abilityResp = await fetch(item.ability.url);
          const abilityData = await abilityResp.json();
          let effectEntry = abilityData.effect_entries.find(
            (entry) => entry.language.name === "es"
          );
          let effect = effectEntry ? effectEntry.effect : null;

          if (!effect) {
            effectEntry = abilityData.effect_entries.find(
              (entry) => entry.language.name === "en"
            );
            effect = effectEntry ? effectEntry.effect : "No hay descripción disponible para esta habilidad.";
          }
          return {
            name: abilityData.names.find(n => n.language.name === "es")?.name || item.ability.name,
            effect
          };
        })
      );

      abilityResult.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
          <img src="${data.sprites.front_default}" alt="${pokemonName}" class="w-24 h-24 mb-4"/>
          <div class="font-bold text-lg mb-2 capitalize">${pokemonName}</div>
          <div class="w-full">
            ${abilities
              .map(
                (ab) => `
                  <div class="mb-4">
                    <div class="font-semibold text-blue-700">${ab.name}</div>
                    <div class="text-gray-700 text-sm">${ab.effect}</div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    } catch (error) {
      abilityResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Error al consultar la API de habilidades.</div>";
    }
  });
}




//----------------------------------------------------------------------
//---Ejercicio 6. Consultar los principales personajes de Rick and Morty                                     
// https://rickandmortyapi.com/documentation/#get-a-single-character
//----------------------------------------------------------------------


const rickBtn = document.getElementById("characters-RickAndMorty-search");
const rickResult = document.getElementById("result-characters-RickAndMorty");

 
const mainCharacterIds = [
  1,   // Rick Sanchez
  2,   // Morty Smith
  3,   // Summer Smith
  4,   // Beth Smith
  5,   // Jerry Smith
  38,  // Mr. Meeseeks
  45,  // Birdperson
  267, // Evil Morty
  8,   // Abradolf Lincler
  10   // Alan Rails
];

if (rickBtn && rickResult) {
  rickBtn.addEventListener("click", async () => {
    rickResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Cargando...</div>";
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${mainCharacterIds.join(",")}`);
      const data = await response.json();
 
      const characters = Array.isArray(data) ? data : [data];
      rickResult.innerHTML = `
        <div class="w-full text-center font-bold text-lg mb-4">
          Los principales personaje de Rick and Morty
        </div>
        <div class="w-full min-w-xl grid grid-cols-3 gap-4 p-10 max-h-[600px] overflow-auto">
          ${characters
            .map(
              (char) => `
                <div class="w-full flex flex-col items-center justify-center h-[260px] bg-white rounded-lg shadow-lg p-4">
                  <img src="${char.image}" alt="${char.name}" class="w-24 h-24 mb-2 rounded-full border-2 border-blue-400"/>
                  <span class="font-bold text-blue-700">${char.name}</span>
                  <span class="text-gray-600 text-sm">${char.species} - ${char.status}</span>
                  <span class="text-gray-500 text-xs mt-1">Origen: ${char.origin.name}</span>
                </div>
              `
            )
            .join("")}
        </div>
      `;
    } catch (error) {
      rickResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Error al consultar la API de Rick and Morty.</div>";
    }
  });
}



//----------------------------------------------------------------------
//---Ejercicio 7. Consultar el detalle de cada personaje de Rick and Morty                                       
// https://rickandmortyapi.com/documentation/#get-a-single-character
//----------------------------------------------------------------------


const characterBtn = document.getElementById("characters-RickAndMorty-uno-search");
const characterInput = document.getElementById("characters-RickAndMorty-uno-input");
const characterResult = document.getElementById("result-characters-RickAndMorty-uno");

if (characterBtn && characterInput && characterResult) {
  characterBtn.addEventListener("click", async () => {
    const searchValue = characterInput.value.trim().toLowerCase();
    characterResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Cargando...</div>";
    if (!searchValue) {
      characterResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Ingrese el nombre de un personaje.</div>";
      return;
    }
    try {
      // Buscar personaje por nombre para obtener su ID
      const searchResp = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchValue)}`);
      const searchData = await searchResp.json();
      if (!searchData.results || searchData.results.length === 0) {
        characterResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>No se encontró el personaje.</div>";
        return;
      }
      // Tomar el primer resultado
      const character = searchData.results[0];
      characterResult.innerHTML = `
        <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
          <img src="${character.image}" alt="${character.name}" class="w-32 h-32 mb-4 rounded-full border-2 border-blue-400"/>
          <div class="font-bold text-lg mb-2">${character.name}</div>
          <div class="text-gray-700 text-sm mb-1">Estado: ${character.status}</div>
          <div class="text-gray-700 text-sm mb-1">Especie: ${character.species}</div>
          <div class="text-gray-700 text-sm mb-1">Género: ${character.gender}</div>
          <div class="text-gray-700 text-sm mb-1">Origen: ${character.origin.name}</div>
          <div class="text-gray-700 text-sm mb-1">Ubicación: ${character.location.name}</div>
          <div class="text-gray-500 text-xs mt-2">Apariciones: ${character.episode.length} episodios</div>
        </div>
      `;
    } catch (error) {
      characterResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Error al consultar la API de Rick and Morty.</div>";
    }
  });
}






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

// Obtener detalles usando el ID 
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




//----------------------------------------------------------------------
//---Ejercicio 15. Consultar datos especificos de Marte
// https://api.nasa.gov/#browseAPI
//----------------------------------------------------------------------


const marsBtn = document.getElementById("mars-search");
const marsInput = document.getElementById("mars-sol-input");
const marsResult = document.getElementById("mars-result");

if (marsBtn && marsInput && marsResult) {
  marsBtn.addEventListener("click", async () => {
    const sol = marsInput.value.trim();
    marsResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>Cargando imágenes...</div>";
    if (!sol || isNaN(sol) || Number(sol) < 0) {
      marsResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Ingrese un número de días válido.</div>";
      return;
    }
    try {
      const apiKey = "Rzfwpomqe41MBbYywIcwxCV0dwoMJbo04VWKwHVp";
      const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        marsResult.innerHTML = `
          <div class="w-full text-center font-bold text-lg mb-4">
            Imágenes de Marte (Curiosity, sol ${sol})
          </div>
          <div class="w-full min-w-xl grid grid-cols-3 gap-4 p-10 max-h-[600px] overflow-auto">
            ${data.photos
              .slice(0, 30)
              .map(
                (photo) => `
                  <div class="w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-4">
                    <img src="${photo.img_src}" alt="Mars" class="w-full h-40 object-cover rounded mb-2"/>
                    <span class="text-gray-700 text-xs">Cámara: ${photo.camera.full_name}</span>
                    <span class="text-gray-500 text-xs">Fecha Tierra: ${photo.earth_date}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        `;
      } else {
        marsResult.innerHTML = "<div class='col-span-3 text-center text-gray-500'>No se encontraron imágenes para ese sol.</div>";
      }
    } catch (error) {
      marsResult.innerHTML = "<div class='col-span-3 text-center text-red-500'>Error al consultar la API de NASA.</div>";
    }
  });
}