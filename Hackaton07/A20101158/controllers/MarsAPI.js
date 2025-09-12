class MarsAPI {
  constructor() {
    this.baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
    this.apiKey = 'TU_API_KEY';
  }

  async getMarsPhotos(sol = 1000) {
    const res = await fetch(`${this.baseUrl}?sol=${sol}&api_key=${this.apiKey}`);
    if (!res.ok) throw new Error('Error al obtener fotos de Marte');
    return await res.json();
  }
}

module.exports = MarsAPI;
