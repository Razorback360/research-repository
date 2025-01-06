/*
  Warnings:

  - Added the required column `apaCitation` to the `papers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chicagoCitation` to the `papers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "papers" ADD COLUMN     "apaCitation" TEXT NOT NULL,
ADD COLUMN     "chicagoCitation" TEXT NOT NULL;
