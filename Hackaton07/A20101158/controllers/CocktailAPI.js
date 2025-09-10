class CocktailAPI {
  constructor() {
    this.baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
  }

  async getTopDrinks() {
    const res = await fetch(`${this.baseUrl}/popular.php`);
    if (!res.ok) throw new Error('Error al obtener bebidas');
    return await res.json();
  }
}

module.exports = CocktailAPI;
