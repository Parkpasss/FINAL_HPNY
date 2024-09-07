/*
  Warnings:

  - Added the required column `address` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "lng" TEXT NOT NULL;
