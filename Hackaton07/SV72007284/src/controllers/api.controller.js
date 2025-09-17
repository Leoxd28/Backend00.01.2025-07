const ApiResponse = require("../models/ApiResponse");
const apiService = require("../services/github.service");
const weatherService = require("../services/weather.service");
const cocktailService = require("../services/cocktail.service");
const fxService = require("../services/fx.service");
const pokemonService = require("../services/pokemon.service");
const rickMortyService = require("../services/rickmorty.service");
const fakeStoreService = require("../services/fakestore.service");
const unsplashService = require("../services/unsplash.service");
const quotesService = require("../services/quotes.service");
const randomUserService = require("../services/randomuser.service");
const moviesService = require("../services/movies.service");
const marsService = require("../services/mars.service");


class ApiController {
    // GitHub
    async github(req, res, next) {
        try {
            const { username } = req.params;
            const data = await apiService.getGitHubUser(username);
            res.json(new ApiResponse(true, "Usuario de GitHub obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Weather
    async weather(req, res, next) {
        try {
            const { city } = req.params;
            const data = await weatherService.byCity(city);
            res.json(new ApiResponse(true, "Clima obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // FX (USD → PEN)
    async fx(req, res, next) {
        try {
            const data = await fxService.usdPen();
            res.json(new ApiResponse(true, "Tipo de cambio obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Pokémon
    async pokemons(req, res, next) {
        try {
            const { limit = 20, offset = 0 } = req.query;
            const data = await pokemonService.list(limit, offset);
            res.json(new ApiResponse(true, "Lista de Pokémon obtenida correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    async pokemonDetail(req, res, next) {
        try {
            const { nameOrId } = req.params;
            const data = await pokemonService.detail(nameOrId);
            res.json(new ApiResponse(true, "Detalle de Pokémon obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Rick & Morty
    async rickmortyCharacters(req, res, next) {
        try {
            const { page = 1 } = req.query;
            const data = await rickMortyService.characters(page);
            res.json(new ApiResponse(true, "Personajes de Rick & Morty obtenidos correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    async rickmortyCharacterDetail(req, res, next) {
        try {
            const { id } = req.params;
            const data = await rickMortyService.characterDetail(id);
            res.json(new ApiResponse(true, "Detalle de personaje obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Cocktails
    async cocktails(req, res, next) {
        try {
            const data = await cocktailService.top10();
            res.json(new ApiResponse(true, "Lista de cócteles obtenida correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // FakeStore
    async products(req, res, next) {
        try {
            const { limit = 20 } = req.query;
            const data = await fakeStoreService.products(limit);
            res.json(new ApiResponse(true, "Productos obtenidos correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Unsplash
    async photos(req, res, next) {
        try {
            const { query, width, height, perPage } = req.query;
            const data = await unsplashService.search(query, width, height, perPage);
            res.json(new ApiResponse(true, "Fotos obtenidas correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Quotes
    async quote(req, res, next) {
        try {
            const data = await quotesService.random();
            res.json(new ApiResponse(true, "Cita obtenida correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Random User
    async users(req, res, next) {
        try {
            const { count = 1 } = req.query;
            const data = await randomUserService.get(count);
            res.json(new ApiResponse(true, "Usuarios ficticios obtenidos correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Movies
    async moviesTop(req, res, next) {
        try {
            const data = await moviesService.top();
            res.json(new ApiResponse(true, "Películas obtenidas correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    async movieDetail(req, res, next) {
        try {
            const { id } = req.params;
            const data = await moviesService.detail(id);
            res.json(new ApiResponse(true, "Detalle de película obtenido correctamente", data));
        } catch (error) {
            next(error);
        }
    }

    // Mars
    async marsPhotos(req, res, next) {
        try {
            const { sol = 1000, rover = "curiosity" } = req.query;
            const data = await marsService.photosBySol(sol, rover);
            res.json(new ApiResponse(true, "Fotos de Marte obtenidas correctamente", data));
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new ApiController();