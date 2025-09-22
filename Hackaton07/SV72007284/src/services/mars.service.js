const axios = require("axios");
const BaseService = require("./base.service");

class MarsService extends BaseService {
  constructor() {
    super("Mars Service");
    this.api = axios.create({
      baseURL: "https://api.nasa.gov"
    });
    this.key = process.env.NASA_API_KEY || "DEMO_KEY";
  }

  async photosBySol(sol = 1000, rover = "curiosity") {
    return this.handleRequest(async () => {
      const response = await this.api.get(
        `/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${this.key}`
      );
      return response.data;
    }, "Fotos de Marte obtenidas correctamente");
  }
}
module.exports = new MarsService();