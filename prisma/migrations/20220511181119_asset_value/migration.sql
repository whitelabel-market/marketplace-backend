/*
  Warnings:

  - Added the required column `value` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "value" TEXT NOT NULL;
