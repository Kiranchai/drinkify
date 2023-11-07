-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';

-- AlterTable
ALTER TABLE "GiftCode" ADD COLUMN     "redeemed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';
