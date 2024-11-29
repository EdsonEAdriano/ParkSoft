/*
  Warnings:

  - You are about to drop the column `position_x` on the `t_parking_location` table. All the data in the column will be lost.
  - You are about to drop the column `position_y` on the `t_parking_location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "t_parking_location" DROP COLUMN "position_x",
DROP COLUMN "position_y";
