const axios = require("axios");
const ClientOAuth2 = require("client-oauth2");
const rateLimit = require("axios-rate-limit");

const http = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 1000,
  maxRPS: 2,
});

const forty2auth = new ClientOAuth2({
  clientId: process.env.FORTYTWO_APP_ID,
  clientSecret: process.env.FORTYTWO_APP_SECRET,
  accessTokenUri: "https://api.intra.42.fr/oauth/token",
});

const request42 = async (path, params) => {
  let url = "https://api.intra.42.fr/v2" + path;
  const token = await forty2auth.credentials.getToken();

  const options = {
    params,
    headers: { Authorization: `Bearer ${token.data.access_token}` },
  };
  try {
    return await http.get(url, options);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { request42 };
