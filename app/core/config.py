import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, EmailStr, HttpUrl, PostgresDsn, validator

class ColorSettings(BaseSettings):
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    RESET = '\033[0m'
    DISABLE = '\033[02m'
    UNDERLINE = '\033[04m'
    REVERSE = '\033[07m'
    STRIKE = '\033[09m'
    INVISIBLE = '\033[08m'
    class FG:
        BLACK = '\033[30m'
        RED = '\033[31m'
        GREEN = '\033[32m'
        ORANGE = '\033[33m'
        BLUE = '\033[34m'
        PURPLE = '\033[35m'
        CYAN = '\033[36m'
        LT_GREY = '\033[37m'
        DA_GREY = '\033[90m'
        LT_RED = '\033[91m'
        LT_GREEN = '\033[92m'
        YELLOW = '\033[93m'
        LT_BLUE = '\033[94m'
        PINK = '\033[95m'
        LT_CYAN ='\033[96m'
    class BG:
        BLACK = '\033[40m'
        RED = '\033[41m'
        GREEN = '\033[42m'
        ORANGE = '\033[43m'
        BLUE = '\033[44m'
        PURPLE = '\033[45m'
        CYAN = '\033[46m'
        LT_GREY = '\033[47m'

class DatabaseSettings(BaseSettings):
    DB_URL : str

class ServerSettings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SERVER_NAME: str
    SERVER_HOST: AnyHttpUrl
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl]

    PROJECT_NAME: str

    EMAIL_RESET_TOKEN_EXPIRE_HOURS: int = 48
    EMAIL_TEMPLATES_DIR: str = "/app/email-templates/build/"
    EMAILS_ENABLED: bool = False


    EMAIL_TEST_USER: EmailStr = "test@example.com" 
    FIRST_SUPERUSER: EmailStr
    FIRST_SUPERUSER_PASSWORD: str
    USERS_OPEN_REGISTRATION: bool = False

class SecuritySettings(BaseSettings):
    SECRET_KEY:str
    HASH_ALGO :str 
    ACCESS_TOKEN_EXPIRE_MINUTES : int 

class Settings(ServerSettings,DatabaseSettings,SecuritySettings,ColorSettings):
    class Config:
        case_sensitive = True
        env_file = '.env'

settings = Settings()
