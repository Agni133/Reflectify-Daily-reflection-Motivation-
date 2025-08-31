/*
  Warnings:

  - Added the required column `mood` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "mood" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Saved_quotes" (
    "id" SERIAL NOT NULL,
    "quote" TEXT,
    "character" TEXT,
    "anime" TEXT,
    "userId" INTEGER NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Saved_quotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Saved_quotes" ADD CONSTRAINT "Saved_quotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
