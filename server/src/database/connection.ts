import knex from 'knex';
import path from 'path';
import { DATABASE_FILE_NAME } from './shared/constants';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, DATABASE_FILE_NAME),
    },
    useNullAsDefault: true,
});

export default connection;
