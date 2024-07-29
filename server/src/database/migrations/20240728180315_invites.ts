import { Knex } from "knex";

const TABLE_NAME = "invites";

/**
 * Create table invites.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.bigIncrements();

        table.string("sender_id", 100).notNullable().references("id").inTable("users").onDelete("cascade");

        table.string("receiver_id", 100).notNullable().references("id").inTable("users").onDelete("cascade");

        table.bigInteger("group_id").notNullable().references("id").inTable("groups").onDelete("cascade");

        table.boolean("is_accepted").notNullable();

        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

        table.bigInteger("created_by").unsigned().nullable().references("id").inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table.bigInteger("updated_by").unsigned().references("id").inTable(TABLE_NAME).nullable();
    });
}

/**
 * Drop table invites.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}
