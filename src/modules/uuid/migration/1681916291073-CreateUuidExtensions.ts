import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class CreateUuidExtensions1681916291073 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
