const httpResponse = require('../util/httpResponse');
const cache = require('../dbs/redis');
const apis = require('../apis');

// get currenecy quote
const getQuote = async (req, res, next) => {
  try {
    let exchangeRatesResponse;

    const { from_currency_code, amount, to_currency_code } = req.query;

    const cachedCurrency = await cache.getAsync(from_currency_code);

    if (cachedCurrency) {
      // get data from cache
      exchangeRatesResponse = JSON.parse(cachedCurrency);
    } else {
      exchangeRatesResponse = await
      apis.openrates.getExchangeRateByBaseCurrency(from_currency_code);

      const { rates } = exchangeRatesResponse;

      // cache the request for 10 sec
      await cache.setAsync(from_currency_code, JSON.stringify({ rates }), 'EX', 10);
    }

    const { rates: { [to_currency_code]: exchangeRate } } = exchangeRatesResponse;
    const exchangeRateAmount = exchangeRate * amount;

    const response = {
      exchange_rate: exchangeRate,
      currency_code: to_currency_code,
      amount: exchangeRateAmount,
    };

    return res.send(response);
  } catch (err) {
    return next(next(httpResponse.InternalError()));
  }
};

module.exports = {
  getQuote,
};
