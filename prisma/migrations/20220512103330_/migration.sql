/*
  Warnings:

  - You are about to drop the column `makeOrderId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `takeOrderId` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[makeId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[takeId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `makeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_makeOrderId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_takeOrderId_fkey";

-- DropIndex
DROP INDEX "Asset_makeOrderId_key";

-- DropIndex
DROP INDEX "Asset_takeOrderId_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "makeOrderId",
DROP COLUMN "takeOrderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "makeId" TEXT NOT NULL,
ADD COLUMN     "takeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_makeId_key" ON "Order"("makeId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_takeId_key" ON "Order"("takeId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_takeId_fkey" FOREIGN KEY ("takeId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
