/*
  Warnings:

  - You are about to drop the column `ownerId` on the `GiftCode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GiftCode" DROP CONSTRAINT "GiftCode_ownerId_fkey";

-- DropIndex
DROP INDEX "GiftCode_ownerId_key";

-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';

-- AlterTable
ALTER TABLE "GiftCode" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';

-- AddForeignKey
ALTER TABLE "GiftCode" ADD CONSTRAINT "GiftCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
