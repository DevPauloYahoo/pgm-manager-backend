/*
  Warnings:

  - Made the column `visitor_id` on table `visits` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "visits" ALTER COLUMN "visitor_id" SET NOT NULL;
