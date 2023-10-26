-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "dare" TEXT,
ADD COLUMN     "truth" TEXT;

-- AlterTable
ALTER TABLE "DemoCard" ADD COLUMN     "dare" TEXT,
ADD COLUMN     "truth" TEXT;

-- AlterTable
ALTER TABLE "EmailVerificationToken" ALTER COLUMN "expireAt" SET DEFAULT now() + interval '30 minutes';
