const config = {
  environment: process.env.NODE_ENV,

  http: {
    virtualHost: process.env.VIRTUAL_HOST || 'localhost',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.VIRTUAL_PORT || 8080,
  },

  webpack: {
    dev: {
      port: process.env.WEBPACK_DEV_PORT || 8081,
    },
  },

  db: 'mongodb://@127.0.0.1:27017/saladhacker',
};


config.common = {
  poi: {
    url: process.env.POI_SERVICE_URL,
  },
};


module.exports = config;