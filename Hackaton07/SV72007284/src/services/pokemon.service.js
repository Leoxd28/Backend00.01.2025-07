const axios = require("axios");
const BaseService = require("./base.service");

class PokemonService extends BaseService {
    constructor() {
        super("Pokémon Service");
        this.api = axios.create({
            baseURL: "https://pokeapi.co/api/v2"
        })
    }
    async list(limit = 50, offset = 0) {
        return this.handleRequest(async () => {
            const response = await this.api.get(`/pokemon?limit=${limit}&offset=${offset}`);
            return response.data;
        }, "Lista de pokemones obtenido correctamente");
    }

    async detail(nameOrId) {
        return this.handleRequest(async () => {
            const response = await this.api.get(`/pokemon/${encodeURIComponent(nameOrId)}`);
            return response.data;
        }, "Detalle de Pokémon obtenido correctamente")
    }
}
module.exports = new PokemonService();