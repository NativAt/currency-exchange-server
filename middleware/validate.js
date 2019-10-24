const Joi = require('@hapi/joi');
const httpResponse = require('../util/httpResponse');

// validation schema
const vaidateRequest = (req, res, next) => {
  const { from_currency_code, amount, to_currency_code } = req.query;

  const schema = Joi.object({
    fromCurrencyCode: Joi.string().pattern(/^[A-Z]+$/).length(3).required(),
    toCurrencyCode: Joi.string().pattern(/^[A-Z]+$/).length(3).required(),
    amount: Joi.number().integer().required(),
  });

  const { error } = schema.validate({
    fromCurrencyCode: from_currency_code,
    toCurrencyCode: to_currency_code,
    amount,
  });

  if (!error) return next();

  return next(httpResponse.badRequest(error.message));
};

module.exports = vaidateRequest;
