const axios = require("axios");
const BaseService = require("./base.service");

class RandomUserService extends BaseService {
  constructor() {
    super("Random User Service");
    this.api = axios.create({
      baseURL: "https://randomuser.me/api"
    });
  }

  async get(count = 1) {
    return this.handleRequest(async () => {
      const response = await this.api.get(`/?results=${count}&nat=us,es,br`);
      return response.data;
    }, "Usuarios ficticios obtenidos correctamente");
  }
}
module.exports = new RandomUserService();