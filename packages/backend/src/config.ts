import convict from 'convict';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import SleepDatum from './models/SleepDatum';
import { User } from './models/User';

interface Config {
  environment: 'production' | 'development';
  port: number;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}

export const config = convict<Config>({
  environment: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to run the server on.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  db: {
    host: {
      sensitive: true,
      doc: 'The database host.',
      format: String,
      default: 'localhost',
      env: 'POSTGRESQL_HOST'
    },
    port: {
      doc: 'The port that the postgres server is running on.',
      format: 'port',
      default: 5432,
      env: 'POSTGRESQL_PORT'
    },
    username: {
      sensitive: true,
      doc: 'The database username.',
      format: String,
      default: 'rick',
      env: 'POSTGRESQL_USERNAME'
    },
    password: {
      sensitive: true,
      doc: 'The database user password.',
      format: String,
      default: 'morty',
      env: 'POSTGRESQL_PASSWORD'
    },
    database: {
      doc: 'The database name.',
      format: String,
      default: 'glootie',
      env: 'POSTGRESQL_DATABASE'
    }
  }
});

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: true,
  logging: false,
  entities: [User, SleepDatum]
};
