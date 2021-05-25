from typing import Dict

from fastapi.openapi.models import Info
from app.core.config import settings
import pprint


class Message:
    def Success(self, text: str):
        print(f'{settings.BG.GREEN}{text}{settings.ENDC}')

    def Error(self, text: str):
        print(f'{settings.BG.RED}{text}{settings.ENDC}')

    def Info(self, text: str):
        print(f'{settings.BG.BLUE}{text}{settings.ENDC}')

    def Json(self, dict: Dict, text: str = 'Not Given'):
        self.Info(text)
        pprint.pprint(dict)


message = Message()
