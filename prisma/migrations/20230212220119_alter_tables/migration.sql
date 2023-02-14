/*
  Warnings:

  - You are about to alter the column `name` on the `visitors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "visitors" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);
