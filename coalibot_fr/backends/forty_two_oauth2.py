from social_core.backends.oauth import BaseOAuth2


class FortyTwoOAuth2(BaseOAuth2):
    """42 OAuth authentication backend"""

    name = "fortytwo"
    AUTHORIZATION_URL = "https://api.intra.42.fr/oauth/authorize"
    ACCESS_TOKEN_URL = "https://api.intra.42.fr/oauth/token"
    ACCESS_TOKEN_METHOD = "POST"
    REDIRECT_STATE = False
    STATE_PARAMETER = False
    EXTRA_DATA = [
        ("refresh_token", "refresh_token", True),
        ("expires_in", "expires_in"),
    ]

    def auth_params(self, state=None):
        client_id, client_secret = self.get_key_and_secret()
        print(client_id, client_secret)
        params = {"client_id": client_id, "redirect_uri": self.get_redirect_uri(state)}
        if self.STATE_PARAMETER and state:
            params["state"] = state
        if self.RESPONSE_TYPE:
            params["response_type"] = self.RESPONSE_TYPE
        return params

    def get_user_details(self, response):
        response["username"] = response.get("login")
        return response

    def user_data(self, token, *args, **kwargs):
        """Loads user data from service"""
        url = "https://api.intra.42.fr/v2/me"
        auth_header = {"Authorization": "Bearer %s" % token}
        try:
            return self.get_json(url, headers=auth_header)
        except ValueError:
            return None
