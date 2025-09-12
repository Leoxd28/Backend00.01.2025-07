class RickMortyAPI {
  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api';
  }

  async getCharacters() {
    const res = await fetch(`${this.baseUrl}/character`);
    if (!res.ok) throw new Error('Error al obtener personajes');
    return await res.json();
  }

  async getCharacterDetails(id) {
    const res = await fetch(`${this.baseUrl}/character/${id}`);
    if (!res.ok) throw new Error('Personaje no encontrado');
    return await res.json();
  }
}

module.exports = RickMortyAPI;
