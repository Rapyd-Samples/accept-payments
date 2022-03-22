import os
from dotenv import load_dotenv
from functools import lru_cache


class Config:
    @lru_cache
    def __init__(self):
        load_dotenv()
        self.rapyd_access_key = os.environ.get("RAPYD_ACCESS_KEY", "")
        self.rapyd_secret_key = os.environ.get("RAPYD_SECRET_KEY", "")
        self.base_rapid_api_url = os.environ.get("BASERAPYDAPIURL", "")
        self.port = int(os.environ.get("PORT", "5000"))


appConfig = Config()
