-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';
