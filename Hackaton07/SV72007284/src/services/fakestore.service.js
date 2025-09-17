const axios = require("axios");
const BaseService = require("./base.service");

class FakeStoreService extends BaseService {
  constructor() {
    super("Fake Store Service");
    this.api = axios.create({
      baseURL: "https://fakestoreapi.com"
    });
  }

  async products(limit = 20) {
    return this.handleRequest(async () => {
      const response = await this.api.get(`/products?limit=${limit}`);
      return response.data;
    }, "Productos obtenidos correctamente");
  }
}
module.exports = new FakeStoreService();