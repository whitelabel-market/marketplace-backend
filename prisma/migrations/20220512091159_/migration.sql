/*
  Warnings:

  - You are about to drop the column `orderMakeId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `orderTakeId` on the `Asset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[makeOrderId]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[takeOrderId]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `makeOrderId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takeOrderId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_orderMakeId_fkey";

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_orderTakeId_fkey";

-- DropIndex
DROP INDEX "Asset_orderMakeId_key";

-- DropIndex
DROP INDEX "Asset_orderTakeId_key";

-- AlterTable
ALTER TABLE "Asset" DROP COLUMN "orderMakeId",
DROP COLUMN "orderTakeId",
ADD COLUMN     "makeOrderId" TEXT NOT NULL,
ADD COLUMN     "takeOrderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_makeOrderId_key" ON "Asset"("makeOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_takeOrderId_key" ON "Asset"("takeOrderId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_makeOrderId_fkey" FOREIGN KEY ("makeOrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_takeOrderId_fkey" FOREIGN KEY ("takeOrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
