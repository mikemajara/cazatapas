-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "dishId" INTEGER;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "dishId" INTEGER;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
