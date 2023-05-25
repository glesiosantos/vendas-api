import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateCustomerTable1684414335531 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS customers (
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
          name VARCHAR(150) NOT NULL,
          whatsapp VARCHAR(15) NOT NULL UNIQUE,
          created_at DATE NOT NULL DEFAULT 'now()',
          updated_at DATE DEFAULT 'now()'
        );
    `)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.query('customers')
    }
}
