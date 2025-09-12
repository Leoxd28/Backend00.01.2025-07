/**
 * NodeJS API Gateway (Express + Axios)
 * Estilo OOP: clases y objetos
 *
 * Cómo ejecutar:
 * 1) npm init -y
 * 2) npm i express axios dotenv cors
 * 3) Crea un archivo .env en la raíz con las llaves que tengas:
 *    PORT=3000
 *    NASA_API_KEY=DEMO_KEY               # opcional (DEMO_KEY tiene límite bajo)
 *    UNSPLASH_ACCESS_KEY=                # opcional
 *    TMDB_API_KEY=                       # opcional
 *    QUOTES_API_KEY=                     # opcional (https://quotes.rest)
 * 4) node server.js
 * 5) Abre http://localhost:3000 para usar el probador web.
 */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// Utilidad común para peticiones HTTP
class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({ baseURL, timeout: 15000 });
  }
  async get(url, config = {}) {
    const res = await this.client.get(url, config);
    return res.data;
  }
}

// 1) GitHub
class GitHubService {
  constructor() {
    this.http = new HttpClient('https://api.github.com');
  }
  getUser(username) {
    return this.http.get(`/users/${encodeURIComponent(username)}`);
  }
}

// 2) Clima (Open‑Meteo: geocoding + forecast, sin API key)
class WeatherService {
  constructor() {
    this.geo = new HttpClient('https://geocoding-api.open-meteo.com/v1');
    this.weather = new HttpClient('https://api.open-meteo.com/v1');
  }
  async byCity(city) {
    if (!city) throw new Error('city es requerido');
    const geo = await this.geo.get(`/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`);
    if (!geo.results || geo.results.length === 0) throw new Error('Ciudad no encontrada');
    const { latitude, longitude, name, country } = geo.results[0];
    const forecast = await this.weather.get(`/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`);
    return { location: { name, country, latitude, longitude }, forecast };
  }
}

// 3) Tipo de cambio USD->PEN (Frankfurter)
class FXService {
  constructor() {
    this.http = new HttpClient('https://api.frankfurter.app');
  }
  async usdPen() {
    const data = await this.http.get('/latest?from=USD&to=PEN');
    return { date: data.date, rate: data.rates?.PEN };
  }
}

// 4 y 5) Pokémon
class PokemonService {
  constructor() {
    this.http = new HttpClient('https://pokeapi.co/api/v2');
  }
  list(limit = 50, offset = 0) {
    return this.http.get(`/pokemon?limit=${limit}&offset=${offset}`);
  }
  detail(nameOrId) {
    return this.http.get(`/pokemon/${encodeURIComponent(nameOrId)}`);
  }
}

// 6 y 7) Rick and Morty
class RickMortyService {
  constructor() {
    this.http = new HttpClient('https://rickandmortyapi.com/api');
  }
  characters(page = 1) {
    return this.http.get(`/character?page=${page}`);
  }
  characterDetail(id) {
    return this.http.get(`/character/${id}`);
  }
}

// 8) Cocteles
class CocktailService {
  constructor() {
    this.http = new HttpClient('https://www.thecocktaildb.com/api/json/v1/1');
  }
  top10() {
    // No hay un endpoint "top" oficial; se usa popular
    return this.http.get('/popular.php');
  }
}

// 9) Tienda falsa
class FakeStoreService {
  constructor() {
    this.http = new HttpClient('https://fakestoreapi.com');
  }
  products(limit = 20) {
    return this.http.get(`/products?limit=${limit}`);
  }
}

// 10) Fotos (Unsplash)
class UnsplashService {
  constructor() {
    this.http = new HttpClient('https://api.unsplash.com');
    this.key = process.env.UNSPLASH_ACCESS_KEY;
  }
  async search(query, width = 800, height = 600, perPage = 10) {
    if (!this.key) throw new Error('Falta UNSPLASH_ACCESS_KEY');
    const data = await this.http.get(`/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`, {
      headers: { Authorization: `Client-ID ${this.key}` }
    });
    // devolver URLs con tamaño solicitado
    const results = (data.results || []).map(p => ({
      id: p.id,
      description: p.description || p.alt_description,
      thumb: p.urls.thumb,
      url: `${p.urls.raw}&w=${width}&h=${height}&fit=crop`
    }));
    return { total: data.total, results };
  }
}

// 11) Citas famosas (TheySaidSo / quotes.rest)
class QuotesService {
  constructor() {
    this.http = new HttpClient('https://quotes.rest');
    this.key = process.env.QUOTES_API_KEY; // opcional, hay límites sin key
  }
  async random() {
    try {
      const headers = this.key ? { Authorization: `Bearer ${this.key}` } : {};
      const data = await this.http.get('/qod?language=en', { headers });
      return data;
    } catch (e) {
      // Respaldo sencillo si falla el servicio
      return { contents: { quotes: [{ quote: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' }] } };
    }
  }
}

// 12) Usuario ficticio
class RandomUserService {
  constructor() {
    this.http = new HttpClient('https://randomuser.me/api');
  }
  get(count = 1) {
    return this.http.get(`/?results=${count}&nat=us,es,br`);
  }
}

// 13 y 14) Películas (TMDB)
class MoviesService {
  constructor() {
    this.http = new HttpClient('https://api.themoviedb.org/3');
    this.key = process.env.TMDB_API_KEY;
  }
  async top() {
    if (!this.key) throw new Error('Falta TMDB_API_KEY');
    return this.http.get(`/movie/now_playing?api_key=${this.key}&language=es-ES&page=1`);
  }
  async detail(id) {
    if (!this.key) throw new Error('Falta TMDB_API_KEY');
    return this.http.get(`/movie/${id}?api_key=${this.key}&language=es-ES`);
  }
}

// 15) Datos de Marte (NASA)
class MarsService {
  constructor() {
    this.http = new HttpClient('https://api.nasa.gov');
    this.key = process.env.NASA_API_KEY || 'DEMO_KEY';
  }
  // Fotos de Marte por sol (día marciano) usando Mars Rover Photos
  photosBySol(sol = 1000, rover = 'curiosity') {
    return this.http.get(`/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${this.key}`);
  }
}

// API Gateway que compone todos los servicios
class ApiGateway {
  constructor() {
    this.github = new GitHubService();
    this.weather = new WeatherService();
    this.fx = new FXService();
    this.pokemon = new PokemonService();
    this.ram = new RickMortyService();
    this.cocktails = new CocktailService();
    this.store = new FakeStoreService();
    this.unsplash = new UnsplashService();
    this.quotes = new QuotesService();
    this.randomUser = new RandomUserService();
    this.movies = new MoviesService();
    this.mars = new MarsService();
  }
}

// ---- Servidor Express ----
const app = express();
app.use(cors());
app.use(express.json());
const api = new ApiGateway();

// Rutas
app.get('/api/github/:user', async (req, res) => {
  try { res.json(await api.github.getUser(req.params.user)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/weather', async (req, res) => {
  try { res.json(await api.weather.byCity(req.query.city)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});

app.get('/api/exchange/usd-pen', async (req, res) => {
  try { res.json(await api.fx.usdPen()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/pokemon', async (req, res) => {
  try { res.json(await api.pokemon.list(+req.query.limit || 50, +req.query.offset || 0)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/pokemon/:name', async (req, res) => {
  try { res.json(await api.pokemon.detail(req.params.name)); }
  catch (e) { res.status(404).json({ error: 'Pokémon no encontrado' }); }
});

app.get('/api/rickmorty/characters', async (req, res) => {
  try { res.json(await api.ram.characters(+req.query.page || 1)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/rickmorty/characters/:id', async (req, res) => {
  try { res.json(await api.ram.characterDetail(req.params.id)); }
  catch (e) { res.status(404).json({ error: 'Personaje no encontrado' }); }
});

app.get('/api/cocktails/top', async (req, res) => {
  try {
    const data = await api.cocktails.top10();
    // limitar a top 10
    const drinks = (data.drinks || []).slice(0, 10);
    res.json({ count: drinks.length, drinks });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/store/products', async (req, res) => {
  try { res.json(await api.store.products(+req.query.limit || 20)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/photos', async (req, res) => {
  try { res.json(await api.unsplash.search(req.query.q || 'nature', +req.query.w || 800, +req.query.h || 600, +req.query.perPage || 10)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/quotes', async (req, res) => {
  try { res.json(await api.quotes.random()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/randomuser', async (req, res) => {
  try { res.json(await api.randomUser.get(+req.query.results || 1)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/movies/top', async (req, res) => {
  try { res.json(await api.movies.top()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/movies/:id', async (req, res) => {
  try { res.json(await api.movies.detail(req.params.id)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/mars/photos', async (req, res) => {
  try { res.json(await api.mars.photosBySol(+req.query.sol || 1000, req.query.rover || 'curiosity')); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

// Home: probador simple (sin frameworks)
app.get('/', (req, res) => {
  res.type('html').send(`
  <!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>API Gateway OOP</title>
    <style>
      body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:24px;background:#0f172a;color:#e5e7eb}
      h1{font-size:28px;margin:0 0 8px}
      .grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
      .card{background:#111827;border:1px solid #1f2937;border-radius:14px;padding:14px}
      label{display:block;font-size:12px;margin-bottom:4px;color:#9ca3af}
      input,select{width:100%;padding:8px;border-radius:10px;border:1px solid #374151;background:#0b1220;color:#e5e7eb}
      button{margin-top:8px;padding:8px 10px;border:0;border-radius:10px;background:#22c55e;color:#052e12;cursor:pointer;font-weight:700}
      pre{white-space:pre-wrap;background:#0b1020;color:#a7f3d0;border-radius:12px;padding:12px}
      a{color:#93c5fd}
    </style>
  </head>
  <body>
    <h1>API Gateway (clases & objetos)</h1>
    <p>Endpoints listos para probar. Edita los campos y pulsa "Probar". Respuesta abajo.</p>
    <div class="grid">
      <div class="card">
        <label>GitHub user</label>
        <input id="gh" value="rpinedaec83" />
        <button onclick="hit('/api/github/'+encodeURIComponent(gh.value))">Probar</button>
      </div>
      <div class="card">
        <label>Clima (ciudad)</label>
        <input id="city" value="Lima" />
        <button onclick="hit('/api/weather?city='+encodeURIComponent(city.value))">Probar</button>
      </div>
      <div class="card">
        <label>USD → PEN</label>
        <button onclick="hit('/api/exchange/usd-pen')">Probar</button>
      </div>
      <div class="card">
        <label>Lista de Pokémon (50)</label>
        <button onclick="hit('/api/pokemon')">Probar</button>
      </div>
      <div class="card">
        <label>Detalle de Pokémon</label>
        <input id="poke" value="pikachu" />
        <button onclick="hit('/api/pokemon/'+encodeURIComponent(poke.value))">Probar</button>
      </div>
      <div class="card">
        <label>Rick and Morty - personajes</label>
        <button onclick="hit('/api/rickmorty/characters')">Probar</button>
      </div>
      <div class="card">
        <label>Detalle personaje Rick and Morty (id)</label>
        <input id="rmid" value="1" />
        <button onclick="hit('/api/rickmorty/characters/'+encodeURIComponent(rmid.value))">Probar</button>
      </div>
      <div class="card">
        <label>Top 10 cócteles</label>
        <button onclick="hit('/api/cocktails/top')">Probar</button>
      </div>
      <div class="card">
        <label>Productos de tienda</label>
        <button onclick="hit('/api/store/products')">Probar</button>
      </div>
      <div class="card">
        <label>Fotos (query, w, h)</label>
        <input id="q" value="space" />
        <input id="w" type="number" value="800" />
        <input id="h" type="number" value="600" />
        <button onclick="hit('/api/photos?q='+encodeURIComponent(q.value)+'&w='+w.value+'&h='+h.value)">Probar</button>
      </div>
      <div class="card">
        <label>Cita famosa (del día)</label>
        <button onclick="hit('/api/quotes')">Probar</button>
      </div>
      <div class="card">
        <label>Usuario(s) ficticio(s)</label>
        <input id="ru" type="number" value="1" />
        <button onclick="hit('/api/randomuser?results='+ru.value)">Probar</button>
      </div>
      <div class="card">
        <label>Películas en cines (TMDB)</label>
        <button onclick="hit('/api/movies/top')">Probar</button>
      </div>
      <div class="card">
        <label>Detalle de película (id, TMDB)</label>
        <input id="mid" value="550" />
        <button onclick="hit('/api/movies/'+encodeURIComponent(mid.value))">Probar</button>
      </div>
      <div class="card">
        <label>Fotos de Marte (sol)</label>
        <input id="sol" type="number" value="1000" />
        <button onclick="hit('/api/mars/photos?sol='+sol.value)">Probar</button>
      </div>
    </div>

    <h2>Respuesta</h2>
    <pre id="out">(esperando...)</pre>

    <script>
      async function hit(url){
        out.textContent = 'Cargando '+url+' ...';
        try{
          const res = await fetch(url);
          const json = await res.json();
          out.textContent = JSON.stringify(json, null, 2);
        }catch(e){
          out.textContent = e.message;
        }
      }
    </script>
  </body>
  </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway corriendo en http://localhost:${PORT}`));
