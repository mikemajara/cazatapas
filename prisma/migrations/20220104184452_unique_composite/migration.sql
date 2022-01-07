/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,dishId]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,dishId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey";

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Comment_userId_dishId_key" ON "Comment"("userId", "dishId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_dishId_key" ON "Rating"("userId", "dishId");
