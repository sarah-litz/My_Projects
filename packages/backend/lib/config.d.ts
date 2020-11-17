import convict from 'convict';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
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
    jwt: {
        access: {
            secret: string;
            duration: string;
        };
        refresh: {
            secret: string;
            duration: string;
        };
    };
}
export declare const config: convict.Config<Config>;
export declare const typeOrmConfig: PostgresConnectionOptions;
export {};
