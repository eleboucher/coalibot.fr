from oauthlib.oauth2 import BackendApplicationClient, TokenExpiredError
from requests_oauthlib import OAuth2Session
from django.conf import settings

TOKEN_URL = "https://api.intra.42.fr/oauth/token"

BASE_URL = "https://api.intra.42.fr/v2"


class FortyTwoClient:
    def __init__(self):
        client = BackendApplicationClient(client_id=settings.SOCIAL_AUTH_FORTYTWO_KEY)
        self.client = OAuth2Session(client=client, auto_refresh_url=TOKEN_URL)
        self.token = self._fetch_token()

    def _fetch_token(self):
        return self.client.fetch_token(
            token_url=TOKEN_URL,
            client_id=settings.SOCIAL_AUTH_FORTYTWO_KEY,
            client_secret=settings.SOCIAL_AUTH_FORTYTWO_SECRET,
        )

    def get(self, url):
        try:
            return self.client.get(BASE_URL + url, verify=False)
        except TokenExpiredError:
            self.token = self._fetch_token()
            return self.client.get(BASE_URL + url, verify=False)

    def post(self, url, body):
        try:
            return self.client.post(BASE_URL + url, body, verify=False)
        except TokenExpiredError:
            self.token = self._fetch_token()
            return self.client.post(BASE_URL + url, body, verify=False)
