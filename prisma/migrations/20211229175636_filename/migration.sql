/*
  Warnings:

  - You are about to drop the column `location` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "location",
ADD COLUMN     "fileName" TEXT;
