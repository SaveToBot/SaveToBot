import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('configs', table => {
    table.string('name').primary().unique().notNullable()
    table.string('value').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('configs')
}
