class RandomUserAPI {
  constructor() {
    this.baseUrl = 'https://randomuser.me/api/';
  }

  async getUser() {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Error al obtener usuario');
    return await res.json();
  }
}

module.exports = RandomUserAPI;
