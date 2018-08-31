module.exports = {
  apps: [
    {
      name: "Web",
      script: "./bin/www",
      watch: "./*",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
