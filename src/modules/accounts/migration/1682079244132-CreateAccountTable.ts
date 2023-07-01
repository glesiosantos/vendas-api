import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateAccountTable1682079244132 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
        avatar VARCHAR(150) NOT NULL DEFAULT 'default.png',
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(150) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT 'false',
        created_at DATE NOT NULL DEFAULT 'now()',
        updated_at DATE DEFAULT 'now()'
      );
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts')
  }
}
