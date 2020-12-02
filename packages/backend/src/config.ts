import convict from 'convict';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Preferences from './models/Preferences';
import SleepDatum from './models/SleepDatum';
import { User } from './models/User';

interface Config {
  environment: 'production' | 'development';
  port: number;
  db: {
    url: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    access: { secret: string; duration: string };
    refresh: { secret: string; duration: string };
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
    url: {
      sensitive: true,
      doc: 'The database url',
      format: String,
      default: 'false',
      env: 'DATABASE_URL'
    },
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
  },
  jwt: {
    refresh: {
      secret: {
        doc: 'The secret for the jwt tokens.',
        format: String,
        default: 'refresh-secret',
        sensitive: true,
        env: 'REFRESH_JWT_SECRET'
      },
      duration: {
        doc: 'How long the access token lasts for.',
        format: String,
        default: '7d',
        env: 'REFRESH_JWT_DURATION'
      }
    },
    access: {
      secret: {
        doc: 'The secret for the jwt tokens.',
        format: String,
        default: 'access-secret',
        sensitive: true,
        env: 'ACCESS_JWT_SECRET'
      },
      duration: {
        doc: 'How long the access token lasts for.',
        format: String,
        default: '15m',
        env: 'ACCESS_JWT_DURATION'
      }
    }
  }
});

const base = {
  type: 'postgres' as const,

  synchronize: true,
  logging: false,
  entities: [User, Preferences, SleepDatum]
};

export const typeOrmConfig: PostgresConnectionOptions =
  config.get('db.url') !== 'false'
    ? {
        ...base,
        url: config.get('db.url')
      }
    : {
        ...base,
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.username') as string,
        password: config.get('db.password') as string,
        database: config.get('db.database') as string
      };
