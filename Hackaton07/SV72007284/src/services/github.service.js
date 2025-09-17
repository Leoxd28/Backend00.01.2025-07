const axios = require("axios");
const BaseService = require("./base.service");

class GitHubService extends BaseService {
  constructor() {
    super("GitHub Service");
    this.api = axios.create({
      baseURL: "https://api.github.com"
    });
  }

  async getGitHubUser(username) {
    if (!username) throw new Error("El nombre de usuario es requerido");

    return this.handleRequest(async () => {
      const response = await this.api.get(`/users/${username}`);
      return response.data;
    }, "Usuario de GitHub obtenido correctamente");
  }
}
module.exports = new GitHubService();