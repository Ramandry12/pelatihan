-- CreateTable
CREATE TABLE `Kasir` (
    `ID_Kasir` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `namaKasir` VARCHAR(30) NOT NULL,
    `alamat` VARCHAR(100) NOT NULL,
    `nomorHp` CHAR(15) NOT NULL,
    `nomorKtp` CHAR(15) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kasir_username_key`(`username`),
    PRIMARY KEY (`ID_Kasir`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_barang` (
    `ID_Barang` INTEGER NOT NULL AUTO_INCREMENT,
    `namaBarang` VARCHAR(30) NOT NULL,
    `satuan` CHAR(20) NOT NULL,
    `hargaSatuan` DOUBLE NOT NULL,

    PRIMARY KEY (`ID_Barang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_penjualan` (
    `ID_Penjualan` INTEGER NOT NULL AUTO_INCREMENT,
    `waktuTransaksi` DATETIME(3) NOT NULL,
    `total` DOUBLE NOT NULL,
    `ID_Shift` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Penjualan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_shift` (
    `ID_Shift` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Kasir` INTEGER NOT NULL,
    `waktuBuka` DATETIME(3) NOT NULL,
    `saldoAwal` BIGINT NOT NULL,
    `jumlahPenjualan` BIGINT NOT NULL,
    `saldoAkhir` BIGINT NOT NULL,
    `waktuTutup` DATETIME(3) NOT NULL,
    `status` CHAR(5) NOT NULL,

    PRIMARY KEY (`ID_Shift`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_detail_penjualan` (
    `ID_Penjualan` INTEGER NOT NULL AUTO_INCREMENT,
    `ID_Barang` INTEGER NOT NULL,
    `kuantitas` SMALLINT NOT NULL,
    `hargaSatuan` DOUBLE NOT NULL,
    `sub_total` DOUBLE NOT NULL,

    PRIMARY KEY (`ID_Penjualan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_penjualan` ADD CONSTRAINT `tbl_penjualan_ID_Shift_fkey` FOREIGN KEY (`ID_Shift`) REFERENCES `tbl_shift`(`ID_Shift`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_shift` ADD CONSTRAINT `tbl_shift_ID_Kasir_fkey` FOREIGN KEY (`ID_Kasir`) REFERENCES `Kasir`(`ID_Kasir`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_detail_penjualan` ADD CONSTRAINT `tbl_detail_penjualan_ID_Penjualan_fkey` FOREIGN KEY (`ID_Penjualan`) REFERENCES `tbl_penjualan`(`ID_Penjualan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_detail_penjualan` ADD CONSTRAINT `tbl_detail_penjualan_ID_Barang_fkey` FOREIGN KEY (`ID_Barang`) REFERENCES `tbl_barang`(`ID_Barang`) ON DELETE RESTRICT ON UPDATE CASCADE;
