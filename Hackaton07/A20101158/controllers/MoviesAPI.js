class MoviesAPI {
  constructor() {
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.apiKey = 'TU_API_KEY';
  }

  async getTopMovies() {
    const res = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
    if (!res.ok) throw new Error('Error al obtener películas');
    return await res.json();
  }

  async getMovieDetails(id) {
    const res = await fetch(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
    if (!res.ok) throw new Error('Película no encontrada');
    return await res.json();
  }
}

module.exports = MoviesAPI;
