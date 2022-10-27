import { TwitterApi } from 'twitter-api-v2'
import config from '../../config'

const { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET } = config

export default class TwitterApiClient {
  private static instance: {
    client: TwitterApi
  }

  client: TwitterApi

  constructor() {
    if (TwitterApiClient.instance) {
      throw new Error('Error - use TwitterApiClient.getInstance()')
    }

    this.client = new TwitterApi({
      appKey: TWITTER_API_KEY,
      appSecret: TWITTER_API_SECRET,
      accessToken: TWITTER_ACCESS_TOKEN,
      accessSecret: TWITTER_ACCESS_SECRET,
    })
  }

  static getInstance(): TwitterApiClient {
    TwitterApiClient.instance = TwitterApiClient.instance || new TwitterApiClient()
    return TwitterApiClient.instance
  }
}
