const { get } = require('axios');

const baseUrl = 'https://api.exchangeratesapi.io';

const getExchangeRateByBaseCurrency = async (baseCurrencyCode) => {
  const { data } = await get(`${baseUrl}/latest?base=${baseCurrencyCode}`);
  return data;
};

module.exports = {
  getExchangeRateByBaseCurrency,
};
