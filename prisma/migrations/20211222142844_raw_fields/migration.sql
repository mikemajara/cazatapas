/*
  Warnings:

  - Added the required column `raw_discount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raw_name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raw_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "raw_discount" TEXT NOT NULL,
ADD COLUMN     "raw_name" TEXT NOT NULL,
ADD COLUMN     "raw_price" TEXT NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
