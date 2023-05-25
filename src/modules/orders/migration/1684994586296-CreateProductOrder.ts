import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateProductOrder1684994586296 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
      return await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS product_orders (
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
          product_id VARCHAR(150) NOT NULL,
          quantity INT NOT NULL,
          price DECIMAL(7,2) NOT NULL,
          order_id VARCHAR(150) NOT NULL,
          CONSTRAINT fk_product_order FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE NO ACTION ON DELETE CASCADE,
          CONSTRAINT fk_order_order FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE NO ACTION ON DELETE CASCADE
        );
      `)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('product_orders')
    }
}
