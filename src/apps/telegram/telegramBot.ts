import TelegramBot from 'node-telegram-bot-api'
import configs from '../../configs'

const bot = new TelegramBot(configs.TELEGRAM_BOT_TOKEN, { polling: true })

export default bot
