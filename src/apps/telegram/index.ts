import TelegramBot from 'node-telegram-bot-api'
import config from '../../config'
import { TelegramMessageParams } from './types'

const bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: true })

export default function initTelegram() {
  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    const payload = msg.text?.substring(6)
    const chatId = msg.chat.id
    if (payload?.length) {
      const url = Buffer.from(payload, 'base64').toString()
      const params: TelegramMessageParams = Object.fromEntries(new URLSearchParams(url).entries())
      bot.sendMessage(chatId, `hello there! token:${params?.token}`)
    } else {
      bot.sendMessage(chatId, 'You should start the bot using the link that you received from twitter bot :)')
    }
  })
}
