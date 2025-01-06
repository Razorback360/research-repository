/*
  Warnings:

  - Added the required column `reportFilePath` to the `datasets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "datasets" ADD COLUMN     "reportFilePath" TEXT NOT NULL;
