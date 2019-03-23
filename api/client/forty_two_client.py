from oauthlib.oauth2 import BackendApplicationClient, TokenExpiredError
from requests_oauthlib import OAuth2Session
from django.conf import settings

TOKEN_URL = "https://api.intra.42.fr/oauth/token"


class FortyTwoClient:
    def __init__(self):
        client = BackendApplicationClient(client_id=settings.SOCIAL_AUTH_FORTYTWO_KEY)
        self.client = OAuth2Session(client=client, auto_refresh_url=TOKEN_URL)
        self.token = self.client.fetch_token(
            token_url=TOKEN_URL,
            client_id=settings.SOCIAL_AUTH_FORTYTWO_KEY,
            client_secret=settings.SOCIAL_AUTH_FORTYTWO_SECRET,
        )

    def get(self, url):
        try:
            return self.client.get(url)
        except TokenExpiredError:
            self.token = self.client.refresh_token()
            return self.client.get(url)

    def post(self, url, body):
        return self.client.post(url, body)
