/*
  Warnings:

  - The primary key for the `tbl_matkul_andryramadhanp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tbl_matkul_andryramadhanp` table. All the data in the column will be lost.
  - Added the required column `kd_matkul` to the `tbl_matkul_andryramadhanp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` DROP FOREIGN KEY `tbl_jadwal_andryramadhanp_tbl_matkul_andryramadhanpId_fkey`;

-- AlterTable
ALTER TABLE `tbl_matkul_andryramadhanp` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `kd_matkul` INTEGER NOT NULL,
    ADD PRIMARY KEY (`kd_matkul`);

-- AddForeignKey
ALTER TABLE `tbl_jadwal_andryramadhanp` ADD CONSTRAINT `tbl_jadwal_andryramadhanp_tbl_matkul_andryramadhanpId_fkey` FOREIGN KEY (`tbl_matkul_andryramadhanpId`) REFERENCES `tbl_matkul_andryramadhanp`(`kd_matkul`) ON DELETE SET NULL ON UPDATE CASCADE;
