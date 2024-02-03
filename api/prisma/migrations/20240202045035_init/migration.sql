/*
  Warnings:

  - You are about to drop the column `socialId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_socialId_key";

-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "userPossession" DROP NOT NULL,
ALTER COLUMN "userXG" DROP NOT NULL,
ALTER COLUMN "userShots" DROP NOT NULL,
ALTER COLUMN "userPenalties" DROP NOT NULL,
ALTER COLUMN "opponentScore" DROP NOT NULL,
ALTER COLUMN "opponentXG" DROP NOT NULL,
ALTER COLUMN "opponentShots" DROP NOT NULL,
ALTER COLUMN "opponentPenalties" DROP NOT NULL,
ALTER COLUMN "userYellows" DROP NOT NULL,
ALTER COLUMN "userReds" DROP NOT NULL,
ALTER COLUMN "minutes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "socialId",
ALTER COLUMN "username" DROP NOT NULL;
