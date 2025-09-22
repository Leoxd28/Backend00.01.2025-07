const axios = require("axios");
const BaseService = require("./base.service");

class CocktailService extends BaseService {
    constructor() {
        super("Cocktail Service");
        this.api = axios.create({
            baseURL: "https://www.thecocktaildb.com/api/json/v1/1"
        });
    }
    async top10() {
        return this.handleRequest(async () => {
            const response = await this.api.get("/popular.php");
            return response.data;
        }, "Lista de cócteles obtenida correctamente")
    }
}
module.exports = new CocktailService();