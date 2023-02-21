import logging
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
from src.apps.user.views import checkChatIDpy
import telegram
import os
from dotenv import load_dotenv
load_dotenv()

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)


def handle_message(update, context):
    message = update.message
    print(f"{message.chat.id} {message.text}")
    rtn = checkChatIDpy(message.chat.id, message.text)
    bot = telegram.Bot(token=os.getenv('TOKEN_TEL'))
    bot.send_message(chat_id=message.chat.id, text=rtn)
