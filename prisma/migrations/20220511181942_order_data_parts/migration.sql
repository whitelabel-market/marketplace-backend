/*
  Warnings:

  - You are about to drop the column `orderDataId` on the `Part` table. All the data in the column will be lost.
  - Added the required column `isMakeFill` to the `OrderData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originFeesOrderDataId` to the `Part` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payoutsOrderDataId` to the `Part` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_orderDataId_fkey";

-- AlterTable
ALTER TABLE "OrderData" ADD COLUMN     "isMakeFill" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "orderDataId",
ADD COLUMN     "originFeesOrderDataId" TEXT NOT NULL,
ADD COLUMN     "payoutsOrderDataId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_payoutsOrderDataId_fkey" FOREIGN KEY ("payoutsOrderDataId") REFERENCES "OrderData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_originFeesOrderDataId_fkey" FOREIGN KEY ("originFeesOrderDataId") REFERENCES "OrderData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
