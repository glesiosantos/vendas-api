import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateProductTable1681917416307 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        price DECIMAL(7,2) NOT NULL DEFAULT '0.0',
        quantity INT NOT NULL DEFAULT '0',
        created_at DATE NOT NULL DEFAULT 'now()',
        updated_at DATE NOT NULL DEFAULT 'now()'
      );
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
