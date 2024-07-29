import knex, { Knex } from "knex";
import toSnakeCase from "to-snake-case";
import camelize from "camelize";
import { baseKnexConfig } from "../knexfile";

const knexConfig: Knex.Config = {
    ...baseKnexConfig,

    wrapIdentifier: (value, originalImpl) => {
        if (value === "*") {
            return originalImpl(value);
        }

        return originalImpl(toSnakeCase(value));
    },

    postProcessResponse: (result) => {
        return camelize(result);
    },
};

export default knex(knexConfig);
