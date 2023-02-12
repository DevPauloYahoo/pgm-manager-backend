/*
  Warnings:

  - The primary key for the `visitors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `visitor_id` column on the `visits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `visitors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_visitor_id_fkey";

-- AlterTable
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "visitors_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "visits" DROP COLUMN "visitor_id",
ADD COLUMN     "visitor_id" UUID;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
