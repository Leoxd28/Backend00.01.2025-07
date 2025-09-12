const axios = require("axios");
const BaseService = require("./base.service");

class MoviesService extends BaseService {
  constructor() {
    super("Movies Service");
    this.api = axios.create({
      baseURL: "https://api.themoviedb.org/3"
    });
    this.key = process.env.TMDB_API_KEY;
  }

  async top() {
    if (!this.key) throw new Error("Falta TMDB_API_KEY");

    return this.handleRequest(async () => {
      const response = await this.api.get(
        `/movie/now_playing?api_key=${this.key}&language=es-ES&page=1`
      );
      return response.data;
    }, "Películas en cartelera obtenidas correctamente");
  }

  async detail(id) {
    if (!this.key) throw new Error("Falta TMDB_API_KEY");

    return this.handleRequest(async () => {
      const response = await this.api.get(
        `/movie/${id}?api_key=${this.key}&language=es-ES`
      );
      return response.data;
    }, "Detalle de película obtenido correctamente");
  }
}
module.exports = new MoviesService();