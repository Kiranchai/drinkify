-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "forbiddenWords" TEXT[];

-- AlterTable
ALTER TABLE "DemoCard" ADD COLUMN     "forbiddenWords" TEXT[];

-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';
