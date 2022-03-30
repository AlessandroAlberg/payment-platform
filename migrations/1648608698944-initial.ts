import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1648608698944 implements MigrationInterface {
    name = 'initial1648608698944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('CREATED', 'APPROVED', 'SCHEDULED', 'REJECTED')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "external_id" character varying NOT NULL, "status" "public"."payment_status_enum" NOT NULL, "amount" numeric, "expected_on" date, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fcaec7df5adf9cac408c686b2a" ON "payment" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6765c894a5ccf625b7b0a4ac9e" ON "payment" ("updated_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_2216ad74f64b73c04d5fb3c361" ON "payment" ("created_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2216ad74f64b73c04d5fb3c361"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6765c894a5ccf625b7b0a4ac9e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcaec7df5adf9cac408c686b2a"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    }

}
