/*
  Warnings:

  - You are about to drop the `variables` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mappingFilePath` to the `datasets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sampleFilePath` to the `datasets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "variables" DROP CONSTRAINT "variables_datasetId_fkey";

-- AlterTable
ALTER TABLE "datasets" ADD COLUMN     "mappingFilePath" TEXT NOT NULL,
ADD COLUMN     "sampleFilePath" TEXT NOT NULL;

-- DropTable
DROP TABLE "variables";
