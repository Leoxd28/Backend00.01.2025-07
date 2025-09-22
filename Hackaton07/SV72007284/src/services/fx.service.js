const axios = require("axios");
const BaseService = require("./base.service");

class FXService extends BaseService {
    constructor() {
        super("FX Service");
        this.api = axios.create({
            baseURL: "https://api.frankfurter.app"
        })
    }
    async usdPen() {
        return this.handleRequest(async () => {
            const response = await this.api.get("/latest?from=USD&to=PEN");
            return response.data;
        }, "Tipo de cambio obtenido correctamente")
    }
}
module.exports = new FXService();