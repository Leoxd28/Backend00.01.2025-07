const axios = require("axios");
const BaseService = require("./base.service");

class WeatherService extends BaseService {
    constructor(){
        super("Weather");
        // Dos instancias de Axios, una para cada URL base.
        this.geoApi = axios.create({
            baseURL: "https://geocoding-api.open-meteo.com/v1"
        });
        this.weatherApi = axios.create({
            baseURL: "https://api.open-meteo.com/v1"
        });
    }
    async byCity(city) {
        return this.handleRequest(async () => {
            if (!city) throw new Error("Ciudad es requerido");

            // Buscar ciudad utilizando la instancia geoApi
            const geoResponse = await this.geoApi.get(`/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`);
            
            // Accede a los datos de la respuesta a través de la propiedad `.data`
            if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
                throw new Error("Ciudad no encontrada");
            }
            
            const {latitude, longitude, name, country} = geoResponse.data.results[0];

            // Obtener el pronóstico utilizando la instancia weatherApi
            const weatherResponse = await this.weatherApi.get(`/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`);
            
            return {
                location: {name, country, latitude, longitude},
                // Accede a los datos del pronóstico a través de `.data`
                forecast: weatherResponse.data.current
            };
        }, "Clima obtenido correctamente", "Error al consultar clima");
    }
}
module.exports = new WeatherService();