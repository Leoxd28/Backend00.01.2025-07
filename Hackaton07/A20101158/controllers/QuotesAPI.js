class QuotesAPI {
  constructor() {
    this.baseUrl = 'https://quotes.rest/qod';
  }

  async getQuote() {
    const res = await fetch(this.baseUrl);
    if (!res.ok) throw new Error('Error al obtener cita');
    return await res.json();
  }
}

module.exports = QuotesAPI;
