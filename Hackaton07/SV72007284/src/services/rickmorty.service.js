const axios = require("axios");
const BaseService = require("./base.service");

class RickMortyService extends BaseService {
    constructor() {
        super("Rick & Morty Service");
        this.api = axios.create({
            baseURL: "https://rickandmortyapi.com/api"
        });
    }
    async characters(page = 1) {
        return this.handleRequest(async () => {
            const response = await this.api.get(`/character?page=${page}`);
            return response.data;
        }, "Lista de personajes obtenida correctamente")
    }
    async charactersDetail(id) {
        return this.handleRequest(async () => {
            const response = await this.api.get(`/character/${id}`);
            return response.data;
        }, "Detalle de personaje obtenido correctamente")
    }
}
module.exports = new RickMortyService();