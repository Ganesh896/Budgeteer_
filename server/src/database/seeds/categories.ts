import { Knex } from "knex";

const TABLE_NAME = "categories";

/**
 * Delete existing entries and seed values for table categories.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
    return knex(TABLE_NAME)
        .del()
        .then(() => {
            return knex(TABLE_NAME).insert([
                {
                    category_name: "Food & Groceries",
                },
                {
                    category_name: "Health & Beauty",
                },
                {
                    category_name: "Travelling & Transport",
                },
                {
                    category_name: "Entertainment",
                },
            ]);
        });
}
