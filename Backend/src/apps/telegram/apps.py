from django.apps import AppConfig
from django.core.signals import request_started

class telegramConfig(AppConfig):
    name = 'telegram'

    def ready(self):
        # if __name__ == '__main__':
        # Import the start_bot function and call it
            from .views import start_bot
            start_bot()
