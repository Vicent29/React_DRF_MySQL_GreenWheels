from django.apps import AppConfig


class SlotConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.apps.slot'

    def ready(self):
        import src.apps.slot.signals
