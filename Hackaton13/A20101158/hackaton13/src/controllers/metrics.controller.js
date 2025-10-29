const { client } = require('../utils/metrics');

exports.getMetrics = async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
};
