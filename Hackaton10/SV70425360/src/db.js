import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const {
  DB_DIALECT = 'mysql',
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_NAME = 'learning',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_SYNC = 'alter',
  NODE_ENV = 'development'
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT,
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: false,
    freezeTableName: true,
    timestamps: true
  }
});

export async function ensureConnection() {
  await sequelize.authenticate();
}

export async function syncSchema() {
  if (DB_SYNC === 'none') return;
  await sequelize.sync({ force: DB_SYNC === 'force', alter: DB_SYNC === 'alter' });
}
