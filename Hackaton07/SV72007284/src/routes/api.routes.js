const {Router} = require("express");
const apiController = require("../controllers/api.controller");

const router = Router();

// 1) GitHub
router.get("/github/:username", apiController.github);

// 2) Clima
router.get("/weather/:city", apiController.weather);

// 3) Tipo de cambio
router.get("/fx", apiController.fx);

// 4 y 5) Pokémon
router.get("/pokemons", apiController.pokemons);
router.get("/pokemons/:nameOrId", apiController.pokemonDetail);

// 6 y 7) Rick & Morty
router.get("/rickmorty", apiController.rickmortyCharacters);
router.get("/rickmorty/:id", apiController.rickmortyCharacterDetail);

// 8) Cócteles
router.get("/cocktails", apiController.cocktails);

// 9) Tienda falsa
router.get("/products", apiController.products);

// 10) Fotos (Unsplash)
router.get("/photos", apiController.photos);

// 11) Citas famosas
router.get("/quote", apiController.quote);

// 12) Usuario ficticio
router.get("/users", apiController.users);

// 13 y 14) Películas
router.get("/movies/top", apiController.moviesTop);
router.get("/movies/:id", apiController.movieDetail);

// 15) Datos de Marte (NASA)
router.get("/mars/photos", apiController.marsPhotos);

module.exports = router;