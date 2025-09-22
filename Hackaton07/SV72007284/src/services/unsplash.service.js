const axios = require("axios");
const BaseService = require("./base.service");

class UnsplashService extends BaseService {
  constructor() {
    super("Unsplash Service");
    this.api = axios.create({
      baseURL: "https://api.unsplash.com"
    });
    this.key = process.env.UNSPLASH_ACCESS_KEY;
  }

  async search(query, width = 800, height = 600, perPage = 10) {
    if (!this.key) throw new Error("Falta UNSPLASH_ACCESS_KEY");

    return this.handleRequest(async () => {
      const response = await this.api.get(
        `/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}`,
        {
          headers: { Authorization: `Client-ID ${this.key}` }
        }
      );

      const data = response.data;
      const results = (data.results || []).map(p => ({
        id: p.id,
        description: p.description || p.alt_description,
        thumb: p.urls.thumb,
        url: `${p.urls.raw}&w=${width}&h=${height}&fit=crop`
      }));

      return { total: data.total, results };
    }, "Fotos obtenidas correctamente de Unsplash");
  }
}
module.exports = new UnsplashService();