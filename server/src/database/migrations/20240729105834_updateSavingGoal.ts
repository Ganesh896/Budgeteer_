import { Knex } from "knex";

const TABLE_NAME = "saving_goals";

/**
 * Create table saving_goals.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string("goal_name", 200).notNullable().alter();
    });
}

/**
 * Drop table saving_goals.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.bigint("goal_name").notNullable().alter();
    });
}
