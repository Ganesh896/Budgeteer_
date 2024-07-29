import { Knex } from "knex";

const TABLE_NAME = "expenses";

/**
 * Create table expenses.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.bigint("group_id").nullable().references("id").inTable("groups").onDelete("cascade");
    });
}

/**
 * Drop table expenses.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
      table.dropColumn("group_id");
    });
}
