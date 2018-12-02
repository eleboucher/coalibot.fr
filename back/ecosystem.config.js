module.exports = {
  apps: [
    {
      name: 'API',
      script: './bin/www',

      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
