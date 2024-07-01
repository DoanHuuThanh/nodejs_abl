// db/knex.ts
import knex, { Knex } from 'knex';
import knexConfig from '../../knexfile';

const environment: string = process.env.NODE_ENV || 'development';
const connectionConfig: Knex.Config = knexConfig[environment];

const db: Knex = knex(connectionConfig);

export default db;
