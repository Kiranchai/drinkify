-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('NHIE', 'TOD', 'TB');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "GameType";
