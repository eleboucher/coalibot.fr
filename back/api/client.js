const axios = require("axios");
const ClientOAuth2 = require("client-oauth2");
const rateLimit = require("axios-rate-limit");
const retry = require("axios-retry-after");

const client = axios.create({
  baseURL: "https://api.intra.42.fr/v2",
});

const http = rateLimit(client, {
  maxRequests: 2,
  perMilliseconds: 1000,
});

const forty2auth = new ClientOAuth2({
  clientId: process.env.FORTYTWO_APP_ID,
  clientSecret: process.env.FORTYTWO_APP_SECRET,
  accessTokenUri: "https://api.intra.42.fr/oauth/token",
});

// Add a request interceptor
http.interceptors.request.use(async function (config) {
  const token = await forty2auth.credentials.getToken();
  config.headers.Authorization = `Bearer ${token.data.access_token}`;

  return config;
});

http.interceptors.response.use(
  null,
  retry(http, {
    wait(error) {
      return new Promise(
        // Use retry-After rather than Retry-After
        (resolve) => setTimeout(resolve, error.response.headers["retry-after"])
      );
    },
  })
);

module.exports = client;
