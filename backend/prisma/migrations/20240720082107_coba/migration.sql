/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `tbl_jadwal_andryramadhanp_tbl_matkulId_fkey` ON `tbl_jadwal_andryramadhanp`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User_andryramadhanp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_andryramadhanp_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
