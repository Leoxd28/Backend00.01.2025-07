class PokemonAPI {
  constructor() {
    this.baseUrl = 'https://pokeapi.co/api/v2';
  }

  async listPokemons(limit = 20) {
    const res = await fetch(`${this.baseUrl}/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error('Error al listar pokemones');
    return await res.json();
  }

  async getPokemonDetails(name) {
    const res = await fetch(`${this.baseUrl}/pokemon/${name}`);
    if (!res.ok) throw new Error('Pokemon no encontrado');
    return await res.json();
  }
}

module.exports = PokemonAPI;
