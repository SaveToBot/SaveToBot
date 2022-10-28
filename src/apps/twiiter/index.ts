import { TweetV1 } from 'twitter-api-v2'
import { uuid } from 'uuidv4'
import client from './twitterClient'
import messages from '../../utils/messages'
import { generateLinkToTelegramBot } from '../../utils/helpers'
import connection from '../../database/connection'
import { forwardTweet } from '../telegram'
import { TwitterLatestRepliedMention } from '../../database/configTableKeys'

export async function getMentions(sinceId: string | null) {
  const mentionTimeline = await client.v1.mentionTimeline({ trim_user: true, since_id: sinceId || undefined })
  while (!mentionTimeline.done) {
    await mentionTimeline.fetchNext()
  }
  return mentionTimeline.tweets
}

export async function handleUnregistredUserMention(mention: TweetV1) {
  const twitterUserId = mention.user.id_str
  const friendships = await client.v1.friendships({ user_id: twitterUserId })
  let followedBot = false
  for (const friendship of friendships) {
    if (friendship.connections.includes('followed_by')) {
      followedBot = true
      break
    }
  }

  let message = messages.youHaventFollowedUsAndWeCantSendYouDM
  if (followedBot) {
    const id = uuid()
    const newUser = {
      id,
      twitter_user_id_str: twitterUserId,
    }
    await connection('usersConnectedApps').insert(newUser)
    const linkToTelegramBot = generateLinkToTelegramBot(id)
    await client.v1.sendDm({
      recipient_id: twitterUserId,
      text: linkToTelegramBot,
    })
    message = messages.weSentYouTelegramLink
  }
  await client.v1.reply(message, mention.id_str)
}

export async function getSingleTweet(id: string) {
  return client.v1.singleTweet(id)
}

export function respondToInvalidMention(id: string) {
  client.v1.reply(messages.invalidMention, id)
}

export async function handleNewMentions() {
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
      } else if (!mention.in_reply_to_status_id_str) {
        respondToInvalidMention(mention.id_str)
      } else {
        const inReplyToTweet = await getSingleTweet(mention.in_reply_to_status_id_str)
        forwardTweet(inReplyToTweet, user.telegram_user_id)
      }
    }
    await connection('configs').where({ name: TwitterLatestRepliedMention }).update({
      value: mentions[0].id_str,
    })
  }
}
