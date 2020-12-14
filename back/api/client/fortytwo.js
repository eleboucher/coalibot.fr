const axios = require("axios");
const pThrottle = require("p-throttle");
const ClientOAuth2 = require("client-oauth2");

const request = async (url, options) => axios.get(url, options);
const fetching = pThrottle(request, 2, 2000);

const forty2auth = new ClientOAuth2({
  clientId: process.env.FORTYTWO_APP_ID,
  clientSecret: process.env.FORTYTWO_APP_SECRET,
  accessTokenUri: "https://api.intra.42.fr/oauth/token",
});

const rq = async (path, options) => fetching(path, options);

const request42 = async (path, params) => {
  let url = "https://api.intra.42.fr/v2" + path;
  const token = await forty2auth.credentials.getToken();

  const options = {
    params,
    headers: { Authorization: `Bearer ${token.data.access_token}` },
  };
  try {
    return await rq(url, options);
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { request42 };
