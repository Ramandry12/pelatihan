-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_jadwal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kd_dosen` INTEGER NOT NULL,
    `kd_matkul` INTEGER NOT NULL,
    `waktu` VARCHAR(191) NOT NULL,
    `ruang` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_krs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` INTEGER NOT NULL,
    `id_jadwal` INTEGER NOT NULL,
    `kd_semester` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_mahasiswa` (
    `nim` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_semester` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_dosen` (
    `kd_dosen` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`kd_dosen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_matkul` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `sks` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_jadwal` ADD CONSTRAINT `tbl_jadwal_kd_dosen_fkey` FOREIGN KEY (`kd_dosen`) REFERENCES `tbl_dosen`(`kd_dosen`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_jadwal` ADD CONSTRAINT `tbl_jadwal_kd_matkul_fkey` FOREIGN KEY (`kd_matkul`) REFERENCES `tbl_matkul`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs` ADD CONSTRAINT `tbl_krs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tbl_mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs` ADD CONSTRAINT `tbl_krs_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `tbl_jadwal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_krs` ADD CONSTRAINT `tbl_krs_kd_semester_fkey` FOREIGN KEY (`kd_semester`) REFERENCES `tbl_semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
