class CurrencyAPI {
  constructor() {
    this.baseUrl = 'https://api.frankfurter.app/latest';
  }

  async getDollarToPEN() {
    const url = `${this.baseUrl}?from=USD&to=PEN`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al consultar tipo de cambio');
    return await res.json();
  }
}

module.exports = CurrencyAPI;
