from datetime import date, datetime
from typing import Any, Dict, List

from models.webhookEvent import WebhookEvent

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class WebhookEventsService(metaclass=Singleton):

    def __init__(self):
        self.__events: Dict[str, WebhookEvent] = dict()
    
    def try_add_event(self, id: str, type: str, data: Any):
     
        if self.__events.get(id):
            return False

        obj = WebhookEvent(id=id, type=type, timestamp=datetime.now(), data=data)

        self.__events[id] = obj

        return True
    
    def get_all_events(self):

        return list(self.__events.values())
        