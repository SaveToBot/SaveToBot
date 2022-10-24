import dotenv from 'dotenv'

const result = dotenv.config()

if (result.error) {
  throw result.error
}

export default {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || 'TELEGRAM_BOT_TOKEN',
}
