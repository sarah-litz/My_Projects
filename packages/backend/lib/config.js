"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = exports.config = void 0;
const convict_1 = __importDefault(require("convict"));
const Preferences_1 = __importDefault(require("./models/Preferences"));
const SleepDatum_1 = __importDefault(require("./models/SleepDatum"));
const User_1 = require("./models/User");
exports.config = convict_1.default({
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
exports.typeOrmConfig = {
    type: 'postgres',
    host: exports.config.get('db.host'),
    port: exports.config.get('db.port'),
    username: exports.config.get('db.username'),
    password: exports.config.get('db.password'),
    database: exports.config.get('db.database'),
    synchronize: true,
    logging: false,
    entities: [User_1.User, Preferences_1.default, SleepDatum_1.default]
};
