const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.connect().catch(console.error);

const cache = async (req, res, next) => {
  const key = req.originalUrl;
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    res.sendResponse = res.json;
    res.json = (body) => {
      client.set(key, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = cache;
