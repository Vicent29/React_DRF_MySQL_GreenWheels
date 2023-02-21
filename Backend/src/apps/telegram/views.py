import logging
from django.http import HttpResponse
from rest_framework import status, viewsets
from telegram.ext import Updater, CommandHandler, MessageHandler
from telegram.ext import Filters
from .telegram_bot import handle_message
import os
from dotenv import load_dotenv
load_dotenv()

logger = logging.getLogger(__name__)


def start_bot():
    if __name__ == '__main__':
        updater = Updater(os.getenv('TOKEN_TEL'), use_context=True)
        dispatcher = updater.dispatcher
        message_handler = MessageHandler(Filters.text, handle_message)
        dispatcher.add_handler(message_handler)
        updater.start_polling()
    return HttpResponse('Bot started.')
