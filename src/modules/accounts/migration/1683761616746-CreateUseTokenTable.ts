import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateAccountTokenTable1683761616746 implements MigrationInterface {
    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS account_tokens (
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
          token VARCHAR(150) NOT NULL DEFAULT REPLACE(uuid_generate_v4()::TEXT, '-',''),
          account_id VARCHAR(150) NOT NULL,
          created_at DATE NOT NULL DEFAULT 'now()',
          updated_at DATE DEFAULT 'now()',
          CONSTRAINT account_token FOREIGN KEY (account_id) REFERENCES accounts(id) ON UPDATE NO ACTION ON DELETE CASCADE
        );
      `)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('account_tokens')
    }
}
