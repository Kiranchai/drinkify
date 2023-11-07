-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';

-- AlterTable
ALTER TABLE "PasswordResetToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';
