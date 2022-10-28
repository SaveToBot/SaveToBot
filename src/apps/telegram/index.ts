import TelegramBot from 'node-telegram-bot-api'
import { TweetV1 } from 'twitter-api-v2'
import connection from '../../database/connection'
import messages from '../../utils/messages'
import bot from './telegramBot'

export function listenToCommands() {
  bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
    const payload = msg.text?.substring(6)
    const chatId = msg.chat.id
    if (payload?.length) {
      const token = Buffer.from(payload, 'base64').toString()
      const user = await connection('usersConnectedApps').where({ id: token }).first()
      if (!user) {
        bot.sendMessage(chatId, messages.invalidToken)
      } else {
        await connection('usersConnectedApps')
          .update({
            telegram_user_id: chatId,
          })
          .where({ id: token })

        bot.sendMessage(chatId, messages.connectedSuccessfully)
      }
    } else {
      bot.sendMessage(chatId, messages.startViaLink)
    }
  })
}

export function forwardTweet(tweet: TweetV1, telegramUserId: string) {
  bot.sendMessage(telegramUserId, tweet.full_text || 'noText')
}
