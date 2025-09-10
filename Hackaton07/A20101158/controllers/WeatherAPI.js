class WeatherAPI {
  constructor() {
    this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
  }

  async getWeather(lat, lon) {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al consultar el clima');
    return await res.json();
  }
}

module.exports = WeatherAPI;
