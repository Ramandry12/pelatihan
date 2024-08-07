/*
  Warnings:

  - You are about to drop the `tbl_matkul` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` DROP FOREIGN KEY `tbl_jadwal_andryramadhanp_tbl_matkulId_fkey`;

-- AlterTable
ALTER TABLE `tbl_jadwal_andryramadhanp` ADD COLUMN `tbl_matkul_andryramadhanpId` INTEGER NULL;

-- DropTable
DROP TABLE `tbl_matkul`;

-- CreateTable
CREATE TABLE `tbl_matkul_andryramadhanp` (
    `id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `sks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` ADD CONSTRAINT `tbl_jadwal_andryramadhanp_tbl_matkul_andryramadhanpId_fkey` FOREIGN KEY (`tbl_matkul_andryramadhanpId`) REFERENCES `tbl_matkul_andryramadhanp`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
