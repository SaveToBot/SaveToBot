import { TweetV1 } from 'twitter-api-v2'
import client from './twitterClient'
import messages from '../../utils/messages'

export async function getMentions(sinceId: string | null) {
  const mentionTimeline = await client.v1.mentionTimeline({ trim_user: true, since_id: sinceId || undefined })

  while (!mentionTimeline.done) {
    await mentionTimeline.fetchNext()
  }

  return mentionTimeline.tweets
}

export async function handleUnregistredUserMention(mention: TweetV1) {
  const friendships = await client.v1.friendships({ user_id: mention.user.id_str })
  let followedYou = false
  for (const friendship of friendships) {
    if (friendship.connections.includes('followed_by')) {
      followedYou = true
      break
    }
  }

  let message = messages.youHaventFollowedUsAndWeCantSendYouDM
  if (followedYou) {
    // generate link and send via telegram
    message = messages.weSentYouTelegramLink
  }
  await client.v1.reply(message, mention.id_str)
}
