import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateOrderTable1684994018158 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
          customer_id VARCHAR(150) NOT NULL,
          created_at DATE NOT NULL DEFAULT 'now()',
          updated_at DATE NOT NULL DEFAULT 'now()',
          CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE NO ACTION ON DELETE CASCADE
        );
      `)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders')
    }
}
