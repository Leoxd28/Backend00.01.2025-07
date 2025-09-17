const axios = require("axios");
const BaseService = require("./base.service");

class QuotesService extends BaseService {
  constructor() {
    super("Quotes Service");
    this.api = axios.create({
      baseURL: "https://quotes.rest"
    });
    this.key = process.env.QUOTES_API_KEY;
  }

  async random() {
    return this.handleRequest(async () => {
      try {
        const headers = this.key ? { Authorization: `Bearer ${this.key}` } : {};
        const response = await this.api.get("/qod?language=en", { headers });
        return response.data;
      } catch {
        return {
          contents: {
            quotes: [
              {
                quote: "Simplicity is the soul of efficiency.",
                author: "Austin Freeman"
              }
            ]
          }
        };
      }
    }, "Cita obtenida correctamente");
  }
}
module.exports = new QuotesService();