/*
  Warnings:

  - The primary key for the `visitors` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_visitor_id_fkey";

-- AlterTable
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_pkey",
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "visitors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "visits" ALTER COLUMN "visitor_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
