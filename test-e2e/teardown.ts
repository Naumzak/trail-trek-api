import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../test.env' });

import { Client } from 'pg';
import { EnvKeys } from '../src/config/enum/envKeys';
import { ConfigService } from '@nestjs/config';

export default async function () {
  const configService = new ConfigService();

  const config = {
    host: configService.get(EnvKeys.POSTGRES_HOST),
    port: +configService.get(EnvKeys.POSTGRES_PORT),
    user: configService.get(EnvKeys.POSTGRES_USERNAME),
    password: configService.get(EnvKeys.POSTGRES_PASSWORD),
    database: configService.get(EnvKeys.POSTGRES_DATABASE),
  };

  const client = new Client(config);

  try {
    await client.connect();

    // Получение списка всех таблиц
    const tables = await client.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public';
    `);

    // Отключение внешних ключей для безопасного удаления
    await client.query(`SET session_replication_role = 'replica';`);

    for (const row of tables.rows) {
      const tableName = row.tablename;
      console.log(`Truncating table: ${tableName}`);
      await client.query(
        `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
      );
    }

    // Включение внешних ключей обратно
    await client.query(`SET session_replication_role = 'origin';`);

    console.log('Database cleaned successfully!');
  } catch (err) {
    console.error('Error during teardown:', err);
  } finally {
    await client.end();
  }
}
