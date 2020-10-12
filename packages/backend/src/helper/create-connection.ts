import { createDatabase } from 'pg-god';
import { createConnection, Connection } from 'typeorm';
import { typeOrmConfig } from '../config';

let conn: Connection | undefined;

export async function superCreateConnection(): Promise<Connection> {
  if (conn) return conn;
  try {
    conn = await createConnection(typeOrmConfig);
    return conn;
  } catch (error) {
    if (error.code === '3D000') {
      // Database doesn't exist.
      // PG error code ref: https://docstore.mik.ua/manuals/sql/postgresql-8.2.6/errcodes-appendix.html
      await createDatabase(
        { databaseName: typeOrmConfig.database! },
        {
          user: typeOrmConfig.username,
          port: typeOrmConfig.port,
          host: typeOrmConfig.host,
          password:
            typeof typeOrmConfig.password === 'undefined'
              ? undefined
              : typeof typeOrmConfig.password === 'string'
              ? typeOrmConfig.password
              : await typeOrmConfig.password()
        }
      );
      return superCreateConnection();
    }
    throw error;
  }
}
