import { Knex } from "knex";

const TABLE_NAME = "groups";

/**
 * Delete existing entries and seed values for table groups.
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
                    group_name: "Family",
                },
                {
                    group_name: "Roommates",
                },
            ]);
        });
}
