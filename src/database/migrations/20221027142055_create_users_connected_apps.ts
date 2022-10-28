import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usersConnectedApps', table => {
    table.string('id').primary().unique().notNullable()
    table.string('twitter_user_id_str').primary().unique().notNullable()
    table.string('telegram_user_id').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('usersConnectedApps')
}
