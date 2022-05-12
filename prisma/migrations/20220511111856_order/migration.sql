/*
  Warnings:

  - You are about to drop the column `authorId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderDataId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `end` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maker` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDataId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `takeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_authorId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "maker" TEXT NOT NULL,
ADD COLUMN     "orderDataId" TEXT NOT NULL,
ADD COLUMN     "salt" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "takeId" TEXT NOT NULL,
ADD COLUMN     "taker" TEXT;

-- CreateTable
CREATE TABLE "AssetType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "nft" BOOLEAN NOT NULL,

    CONSTRAINT "AssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "typeId" TEXT NOT NULL,
    "orderMakeId" TEXT NOT NULL,
    "orderTakeId" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "account" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "orderDataId" TEXT NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_typeId_key" ON "Asset"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_orderMakeId_key" ON "Asset"("orderMakeId");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_orderTakeId_key" ON "Asset"("orderTakeId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderDataId_key" ON "Order"("orderDataId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AssetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_orderMakeId_fkey" FOREIGN KEY ("orderMakeId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_orderTakeId_fkey" FOREIGN KEY ("orderTakeId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_orderDataId_fkey" FOREIGN KEY ("orderDataId") REFERENCES "OrderData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderDataId_fkey" FOREIGN KEY ("orderDataId") REFERENCES "OrderData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
