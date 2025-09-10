class UnsplashAPI {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com/search/photos';
    this.accessKey = 'TU_CLAVE_DE_UNSPLASH';
  }

  async searchPhotos(query, size = 'small') {
    const res = await fetch(`${this.baseUrl}?query=${query}&client_id=${this.accessKey}`);
    if (!res.ok) throw new Error('Error al buscar fotos');
    const data = await res.json();
    return data.results.map(photo => photo.urls[size]);
  }
}

module.exports = UnsplashAPI;
