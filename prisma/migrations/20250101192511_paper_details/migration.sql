/*
  Warnings:

  - Added the required column `journal` to the `papers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDate` to the `papers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "papers" ADD COLUMN     "endPage" TEXT,
ADD COLUMN     "issue" TEXT,
ADD COLUMN     "journal" TEXT NOT NULL,
ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startPage" TEXT,
ADD COLUMN     "volume" TEXT;
