import requests
from time import sleep
from django.conf import settings

TOKEN_URL = "https://api.intra.42.fr/oauth/token"

BASE_URL = "https://api.intra.42.fr/v2"


class FortyTwoClient:
    def __init__(self):
        self.client = settings.SOCIAL_AUTH_FORTYTWO_KEY
        self.secret = settings.SOCIAL_AUTH_FORTYTWO_SECRET
        self.token = self._fetch_token()

    def _fetch_token(self):
        payload = {
            "grant_type": "client_credentials",
            "client_id": self.client,
            "client_secret": self.secret,
        }
        response = requests.post(TOKEN_URL, data=payload)
        return response.json()["access_token"]

    def get(self, url):
        header = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(BASE_URL + url, headers=header)
        if response.status_code == 401:
            self.token = self._fetch_token()
            return self.get(url)
        elif response.status_code == 403:
            sleep(int(response.headers["Retry-After"]))
            return self.get(url)
        return response

    def post(self, url, body):
        header = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(BASE_URL + url, data=body, headers=header)
        if response.status_code == 401:
            self.token = self._fetch_token()
            return self.post(url)
        elif response.status_code == 403:
            sleep(int(response.headers["Retry-After"]))
            return self.post(url)
        return response

