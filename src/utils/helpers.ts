/* eslint-disable import/prefer-default-export */
import configs from '../configs'

export function generateLinkToTelegramBot(token: string) {
  const base64Token = btoa(token)
  return `https://t.me/${configs.TELEGRAM_BOT_ID}?start=${base64Token}`
}
