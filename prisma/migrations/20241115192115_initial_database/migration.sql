-- CreateEnum
CREATE TYPE "StatusTypes" AS ENUM ('REQUEST_FOR_EDIT', 'DENIED', 'APPROVED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "expires_in" INTEGER,
    "ext_expires_in" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "bannedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "ADMIN_READ" BOOLEAN NOT NULL DEFAULT false,
    "ADMIN_WRITE" BOOLEAN NOT NULL DEFAULT false,
    "ADMIN_BAN" BOOLEAN NOT NULL DEFAULT false,
    "ADMIN_MODERATE" BOOLEAN NOT NULL DEFAULT false,
    "ADMIN_DELETE_USER" BOOLEAN NOT NULL DEFAULT false,
    "ADMIN_EDIT_USER" BOOLEAN NOT NULL DEFAULT false,
    "READ" BOOLEAN NOT NULL DEFAULT true,
    "WRITE" BOOLEAN NOT NULL DEFAULT true,
    "EDIT" BOOLEAN NOT NULL DEFAULT true,
    "DOWNLOAD" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "papers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "paperFilePath" TEXT NOT NULL,
    "keywords" TEXT[],
    "doiLink" TEXT,
    "statusId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "papers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datasets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paperFilePath" TEXT NOT NULL,
    "keywords" TEXT[],
    "statusId" INTEGER NOT NULL,
    "paperId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "datasets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variables" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "datasetId" TEXT NOT NULL,

    CONSTRAINT "variables_pkey" PRIMARY KEY ("datasetId")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" SERIAL NOT NULL,
    "type" "StatusTypes" NOT NULL,
    "comment" TEXT,

    CONSTRAINT "statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "papers_statusId_key" ON "papers"("statusId");

-- CreateIndex
CREATE UNIQUE INDEX "datasets_statusId_key" ON "datasets"("statusId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "papers" ADD CONSTRAINT "papers_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "papers" ADD CONSTRAINT "papers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "papers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variables" ADD CONSTRAINT "variables_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "datasets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
