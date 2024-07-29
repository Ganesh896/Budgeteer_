import { Knex } from "knex";

const TABLE_NAME = "expenses";

/**
 * Create table expenses.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.string("id", 100).notNullable().unique();

        table.string("user_id", 100).notNullable().references("id").inTable("users").onDelete("cascade");

        table.bigInteger("category_id").notNullable().references("id").inTable("categories").onDelete("cascade");

        table.string("title", 100).notNullable();

        table.string("description", 200).nullable();
        table.bigInteger("amount").notNullable();
        table.string("payment_method", 100).notNullable();

        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

        table.string("created_by", 100).nullable().references("id").inTable(TABLE_NAME);

        table.timestamp("updated_at").nullable();

        table.string("updated_by", 100).references("id").inTable(TABLE_NAME).nullable();
    });
}

/**
 * Drop table expenses.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(TABLE_NAME);
}
