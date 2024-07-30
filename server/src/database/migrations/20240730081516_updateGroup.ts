import { Knex } from "knex";

const TABLE_NAME = "groups";

/**
 * Create table groups.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string("user_id", 100).notNullable().references("id").inTable("users").onDelete("cascade");
    });
}

/**
 * Drop table groups.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn("user_id");
    });
}
