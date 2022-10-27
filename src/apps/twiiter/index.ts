import { TweetV1, TweetV1TimelineResult } from 'twitter-api-v2'
import connection from '../../database/connection'
import TwitterApiClient from './TwitterApiClient'
import messages from '../../utils/messages'

const { client } = TwitterApiClient.getInstance()

export async function getMentions(sinceId: string | null) {
  const mentionTimeline = await client.v1.mentionTimeline({ trim_user: true, since_id: sinceId || undefined })

  while (!mentionTimeline.done) {
    await mentionTimeline.fetchNext()
  }

  return mentionTimeline.tweets
}

export async function replyToUnregistredUserMention(mention: TweetV1) {
  return
  try {
    await client.v1.reply(messages.replyToUnregiteredUserMention, mention.id_str)
  } catch (error) {
    console.log(error)
  }
}

export async function respondToMentions(mentions: TweetV1TimelineResult) {
  for (const mention of mentions) {
    const { id_str } = mention.user
    const user = await connection('usersConnectedApps')
      .where({
        twitter_user_id_str: id_str,
      })
      .first()
    if (!user || !user.telegram_user_id) {
      replyToUnregistredUserMention(mention)
    } else {
      //  forward the tweet in telegram
    }
  }
}
