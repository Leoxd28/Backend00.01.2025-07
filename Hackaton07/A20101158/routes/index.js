const express = require('express');
const router = express.Router();

// Importar clases
const GitHubAPI = require('../controllers/GitHubAPI');
const WeatherAPI = require('../controllers/WeatherAPI');
const CurrencyAPI = require('../controllers/CurrencyAPI');
const PokemonAPI = require('../controllers/PokemonAPI');
const RickMortyAPI = require('../controllers/RickMortyAPI');
const CocktailAPI = require('../controllers/CocktailAPI');
const StoreAPI = require('../controllers/StoreAPI');
const UnsplashAPI = require('../controllers/UnsplashAPI');
const QuotesAPI = require('../controllers/QuotesAPI');
const RandomUserAPI = require('../controllers/RandomUserAPI');
const MoviesAPI = require('../controllers/MoviesAPI');
const MarsAPI = require('../controllers/MarsAPI');

// Instancias
const github = new GitHubAPI();
const weather = new WeatherAPI();
const currency = new CurrencyAPI();
const pokemon = new PokemonAPI();
const rickmorty = new RickMortyAPI();
const cocktail = new CocktailAPI();
const store = new StoreAPI();
const unsplash = new UnsplashAPI();
const quotes = new QuotesAPI();
const randomUser = new RandomUserAPI();
const movies = new MoviesAPI();
const mars = new MarsAPI();

// Rutas
router.get('/github/:username', async (req, res) => {
  res.json(await github.getUser(req.params.username));
});

router.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  res.json(await weather.getWeather(lat, lon));
});

router.get('/currency', async (req, res) => {
  res.json(await currency.getDollarToPEN());
});

router.get('/pokemon', async (req, res) => {
  res.json(await pokemon.listPokemons());
});

router.get('/pokemon/:name', async (req, res) => {
  res.json(await pokemon.getPokemonDetails(req.params.name));
});

router.get('/rickmorty', async (req, res) => {
  res.json(await rickmorty.getCharacters());
});

router.get('/rickmorty/:id', async (req, res) => {
  res.json(await rickmorty.getCharacterDetails(req.params.id));
});

router.get('/cocktails', async (req, res) => {
  res.json(await cocktail.getTopDrinks());
});

router.get('/store', async (req, res) => {
  res.json(await store.listProducts());
});

router.get('/photos', async (req, res) => {
  const { query, size } = req.query;
  res.json(await unsplash.searchPhotos(query, size));
});

router.get('/quote', async (req, res) => {
  res.json(await quotes.getQuote());
});

router.get('/randomuser', async (req, res) => {
  res.json(await randomUser.getUser());
});

router.get('/movies', async (req, res) => {
  res.json(await movies.getTopMovies());
});

router.get('/movies/:id', async (req, res) => {
  res.json(await movies.getMovieDetails(req.params.id));
});

router.get('/mars', async (req, res) => {
  const { sol } = req.query;
  res.json(await mars.getMarsPhotos(sol));
});

module.exports = router;

