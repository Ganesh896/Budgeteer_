import { Knex } from "knex";
import config from "./config";

// base configuration for Knex
export const baseKnexConfig: Knex.Config = {
    client: config.database.client,
    connection: {
        host: config.database.host,
        password: config.database.password,
        database: config.database.name,
        user: config.database.user,
        port: +config.database.port,
    },
};

// extended Knex configuration including migrations and seeds settings
const knexConfig: Knex.Config = {
    ...baseKnexConfig,
    migrations: {
        directory: "./database/migrations",
        tableName: "migrations",
        extension: "ts",
        stub: "./stubs/migration.stub",
    },

    seeds: {
        directory: "./database/seeds",
        extension: "ts",
        stub: "./stubs/seed.stub",
    },
};

export default knexConfig;
