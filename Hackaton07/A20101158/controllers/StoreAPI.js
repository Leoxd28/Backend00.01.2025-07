class StoreAPI {
  constructor() {
    this.baseUrl = 'https://fakestoreapi.com/products';
  }

  async listProducts() {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Error al obtener productos');
    return await res.json();
  }
}

module.exports = StoreAPI;
