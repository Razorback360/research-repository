/*
  Warnings:

  - You are about to drop the column `paperFilePath` on the `datasets` table. All the data in the column will be lost.
  - Added the required column `datasetFilePath` to the `datasets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "datasets" DROP COLUMN "paperFilePath",
ADD COLUMN     "datasetFilePath" TEXT NOT NULL;
