import { ETwitterStreamEvent } from 'twitter-api-v2'
import initTelegram from './apps/telegram'
import { getMentions, handleUnregistredUserMention } from './apps/twiiter'
import client from './apps/twiiter/twitterClient'
import { TwitterLatestRepliedMention } from './database/configTableKeys'
import connection from './database/connection'

async function handleTwitterMentions() {
  const twitterLatestRepliedMentionId = await connection('configs').where({ name: TwitterLatestRepliedMention }).first()
  const mentions = await getMentions(twitterLatestRepliedMentionId.value)
  if (mentions.length) {
    for (const mention of mentions) {
      const { id_str } = mention.user
      const user = await connection('usersConnectedApps')
        .where({
          twitter_user_id_str: id_str,
        })
        .first()
      if (!user || !user.telegram_user_id) {
        await handleUnregistredUserMention(mention)
      } else {
        //  forward the tweet in telegram
      }
    }
    await connection('configs').where({ name: TwitterLatestRepliedMention }).update({
      value: mentions[0].id_str,
    })
  }
}

async function App() {
  // initTelegram()
  return
  handleTwitterMentions()
}
App()
