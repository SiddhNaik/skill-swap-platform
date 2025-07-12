from django.apps import AppConfig


class SwapConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'swap'

    def ready(self):
        import swap.models  # This ensures signals are connected
