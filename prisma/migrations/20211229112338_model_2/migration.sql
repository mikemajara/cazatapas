/*
  Warnings:

  - You are about to drop the column `Location` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "Location",
ADD COLUMN     "location" TEXT;
