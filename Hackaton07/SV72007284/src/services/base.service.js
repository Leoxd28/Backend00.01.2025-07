const ApiResponse = require("../models/ApiResponse");

class BaseService {
    constructor(name) {
        this.name = name;
    }
    async handleRequest(promiseFn, successMsg, errorMsg) {
        try {
            const data = await promiseFn();
            return new ApiResponse(200, data, successMsg || `${this.name} datos obtenidos con exito`);
        } catch (error) {
            return new ApiResponse(500, null, errorMsg || `Error al obtener los datos: ${error.message} de ${this.name}`)    
        }
    }
}
module.exports = BaseService;