import { Knex } from 'knex'
import { TwitterLatestRepliedDM, TwitterLatestRepliedMention } from '../configTableKeys'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('configs').del()

  // Inserts seed entries
  await knex('configs').insert([{ name: TwitterLatestRepliedMention }, { name: TwitterLatestRepliedDM }])
}
