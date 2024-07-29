import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Create table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string("id", 200).notNullable().unique();
        table.string("first_name", 100).notNullable();
        table.string("last_name", 100).notNullable();
        table.string("profile", 200).notNullable();
        table.string("email", 100).notNullable().unique();
        table.string("password", 200).notNullable();
        table.string("phone", 20).notNullable();
        table.string("address", 200).notNullable();

        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

        table.string("created_by", 200).unsigned().nullable().references("id").inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table.string("updated_by", 200).unsigned().references("id").inTable(TABLE_NAME).nullable();
    });
}

/**
 * Drop table users.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}
