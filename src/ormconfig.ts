/* eslint-disable @typescript-eslint/no-var-requires */

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
const config: MysqlConnectionOptions = {
  host: process.env.DB_HOST,
  port: 3306,
  logging: process.env.TYPEORM_LOGGING === 'true',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  type: 'mysql',
  database: process.env.DB_DATABASE || '',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  charset: 'utf8mb4',
  // migrations: [
  //   "src/database/migrations/*.ts",
  //   "dist/database/migrations/*{.ts,.js}",
  // ],
  namingStrategy: new SnakeNamingStrategy(),
};

export default config;
