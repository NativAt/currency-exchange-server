const redis = require('redis');

const client = redis.createClient();

const { promisify } = require('util');

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('error', (err) => {
  throw Error(`Error ${err}`);
});

module.exports = {
  setAsync,
  getAsync,
};
