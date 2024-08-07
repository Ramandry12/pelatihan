/*
  Warnings:

  - You are about to drop the `tbl_dosen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_jadwal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_krs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_mahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_semester` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_jadwal` DROP FOREIGN KEY `tbl_jadwal_kd_dosen_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_jadwal` DROP FOREIGN KEY `tbl_jadwal_kd_matkul_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_krs` DROP FOREIGN KEY `tbl_krs_id_jadwal_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_krs` DROP FOREIGN KEY `tbl_krs_kd_semester_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_krs` DROP FOREIGN KEY `tbl_krs_nim_fkey`;

-- AlterTable
ALTER TABLE `tbl_matkul` MODIFY `id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `tbl_dosen`;

-- DropTable
DROP TABLE `tbl_jadwal`;

-- DropTable
DROP TABLE `tbl_krs`;

-- DropTable
DROP TABLE `tbl_mahasiswa`;

-- DropTable
DROP TABLE `tbl_semester`;

-- CreateTable
CREATE TABLE `tbl_jadwal_andryramadhanp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kd_dosen` INTEGER NOT NULL,
    `kd_matkul` INTEGER NOT NULL,
    `waktu` VARCHAR(191) NOT NULL,
    `ruang` VARCHAR(191) NOT NULL,
    `tbl_matkulId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_krs_andryramadhanp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` INTEGER NOT NULL,
    `id_jadwal` INTEGER NOT NULL,
    `kd_semester` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_mahasiswa_andryramadhanp` (
    `nim` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_semester_andryramadhanp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_dosen_andryramadhanp` (
    `kd_dosen` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kd_dosen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` ADD CONSTRAINT `tbl_jadwal_andryramadhanp_kd_dosen_fkey` FOREIGN KEY (`kd_dosen`) REFERENCES `tbl_dosen_andryramadhanp`(`kd_dosen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` ADD CONSTRAINT `tbl_jadwal_andryramadhanp_tbl_matkulId_fkey` FOREIGN KEY (`tbl_matkulId`) REFERENCES `tbl_matkul`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs_andryramadhanp` ADD CONSTRAINT `tbl_krs_andryramadhanp_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tbl_mahasiswa_andryramadhanp`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs_andryramadhanp` ADD CONSTRAINT `tbl_krs_andryramadhanp_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `tbl_jadwal_andryramadhanp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs_andryramadhanp` ADD CONSTRAINT `tbl_krs_andryramadhanp_kd_semester_fkey` FOREIGN KEY (`kd_semester`) REFERENCES `tbl_semester_andryramadhanp`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
