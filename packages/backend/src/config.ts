import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import SleepDatum from './models/SleepDatum';

import User from './models/User';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'rick',
  password: 'morty',
  database: 'glootie',
  synchronize: true,
  logging: false,
  entities: [User, SleepDatum]
};

export { typeOrmConfig };
