-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 31 Des 2020 pada 03.36
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coffeeshop`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, 'coffee-9jUsQS1'),
(2, 'noncoffee-J95yQgd'),
(3, 'food-Z6RTUvh');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_history`
--

CREATE TABLE `detail_history` (
  `detailHistoryId` int(11) NOT NULL,
  `HistoryUserId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productQty` int(11) NOT NULL,
  `size` varchar(30) NOT NULL,
  `delivery` varchar(30) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_history`
--

INSERT INTO `detail_history` (`detailHistoryId`, `HistoryUserId`, `productId`, `productQty`, `size`, `delivery`, `createdAt`) VALUES
(1, 1, 1, 3, '0', '0', '0000-00-00 00:00:00'),
(2, 1, 2, 2, '0', '0', '0000-00-00 00:00:00'),
(3, 2, 4, 10, '0', '0', '0000-00-00 00:00:00'),
(4, 2, 4, 10, '0', '0', '0000-00-00 00:00:00'),
(6, 3, 3, 2, '250', 'home', '2020-12-30 02:02:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `historyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subTotal` int(11) NOT NULL,
  `discount` int(12) NOT NULL,
  `paymentMethod` varchar(32) NOT NULL,
  `historyCreatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`historyId`, `userId`, `subTotal`, `discount`, `paymentMethod`, `historyCreatedAt`) VALUES
(1, 1, 50000, 0, '', '2020-12-27 00:00:00'),
(2, 1, 70000, 0, '', '2020-11-25 00:00:00'),
(3, 1, 75000, 0, '', '2020-11-25 00:00:00'),
(4, 1, 75000, 1, 'cod', '2019-12-27 00:00:00'),
(5, 1, 75000, 1, 'cod', '2020-12-27 00:00:00'),
(6, 1, 75000, 1, 'cod', '2020-12-28 00:00:00'),
(7, 2, 75000, 1, 'cod', '2020-12-28 00:00:00'),
(8, 2, 75000, 1, 'cod', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `categoryId` int(1) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `productStock` int(11) NOT NULL,
  `deliveryStartHour` int(2) NOT NULL,
  `deliveryEndHour` int(2) NOT NULL,
  `productCreatedAt` varchar(50) NOT NULL,
  `productUpdatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `productDiscount` int(3) NOT NULL,
  `productSizeR250` int(1) NOT NULL,
  `productSizeL300` int(1) NOT NULL,
  `productSizeXL500` int(1) NOT NULL,
  `productDelivery` int(1) NOT NULL,
  `productDinein` int(1) NOT NULL,
  `productTakeAway` int(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `productDescription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`productId`, `productName`, `categoryId`, `productPrice`, `productStock`, `deliveryStartHour`, `deliveryEndHour`, `productCreatedAt`, `productUpdatedAt`, `productDiscount`, `productSizeR250`, `productSizeL300`, `productSizeXL500`, `productDelivery`, `productDinein`, `productTakeAway`, `image`, `productDescription`) VALUES
(1, 'Veggie tomato mix', 3, 34000, 80, 10, 17, '2020-12-10 10:15:02', '0000-00-00 00:00:00', 35, 1, 1, 1, 1, 1, 1, '', 'Vegetables are parts of plants that are consumed by humans or other animals as food. The original meaning is still commonly used and is applied to plants collectively to refer to all edible plant matter, including the flowers, fruits, stems, leaves, roots'),
(2, 'Hazelnut Latte', 2, 25000, 95, 10, 14, '2020-12-10 10:39:36', '0000-00-00 00:00:00', 10, 1, 1, 1, 1, 1, 1, '', 'hazelnut'),
(3, 'ini tes juga', 2, 25000, 95, 10, 14, '2020-12-10 11:18:53', '0000-00-00 00:00:00', 0, 1, 1, 1, 1, 1, 1, '', 'hazelnut'),
(4, 'Hazelnut Latte', 2, 25000, 95, 10, 14, '2020-12-10 11:31:46', '0000-00-00 00:00:00', 0, 1, 1, 1, 1, 1, 1, '', 'hazelnut'),
(5, 'Summer fried rice', 3, 55000, 95, 11, 16, '2020-12-11 00:46:12', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'Summer fried rice'),
(7, 'ini tes juga arkademy', 1, 23000, 34, 10, 16, '2020-12-11 05:18:56', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(11, 'ini tes juga', 1, 23000, 34, 10, 16, '2020-12-13 16:38:39', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(12, 'ini tes jugare', 1, 23000, 34, 10, 16, '2020-12-14 11:48:08', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(13, 'ini tes jugaygfyufyufyu', 3, 23000, 34, 10, 16, '2020-12-14 11:48:52', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(14, 'ini baru', 1, 23000, 34, 10, 16, '2020-12-14 13:49:33', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(15, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 13:50:35', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(16, 'ini baru', 3, 23000, 34, 10, 16, '2020-12-14 13:50:52', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(17, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 13:51:12', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(18, 'ini baru', 3, 23000, 34, 10, 16, '2020-12-14 13:53:22', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(19, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 13:55:53', '0000-00-00 00:00:00', 1, 1, 1, 1, 1, 1, 1, '', 'ini cuman tes doang'),
(25, 'ini tes juga ya', 1, 23000, 34, 10, 16, '2020-12-19 22:28:14', '0000-00-00 00:00:00', 0, 1, 0, 1, 1, 1, 1, '2020-12-24T10-14-39.294Zcors.jpg', 'ini cuman tes doang'),
(27, 'aabb', 1, 8, 1, 12, 10, '2020-12-21 11:04:27', '0000-00-00 00:00:00', 20, 0, 0, 1, 0, 1, 0, '', 'aabb'),
(28, 'pecel', 3, 11000, 33, 12, 10, '2020-12-21 11:40:57', '0000-00-00 00:00:00', 10, 1, 1, 0, 1, 1, 0, 'image.jpg', 'pecel'),
(29, 'a', 1, 1, 1, 1, 1, 'Wed, 30 Dec 2020 04:31:18 GMT', '2020-12-30 04:31:18', 1, 1, 1, 1, 1, 1, 1, '2020-12-30T04-31-18.390Za.jpg', '1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo`
--

CREATE TABLE `promo` (
  `promoId` int(11) NOT NULL,
  `promoName` varchar(100) NOT NULL,
  `promoPercent` int(2) NOT NULL,
  `promoMinPurchase` int(11) NOT NULL,
  `promoMaxLimit` int(11) NOT NULL,
  `promoCode` varchar(15) NOT NULL,
  `promoCreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `promoUpdatedAt` varchar(30) NOT NULL,
  `promoDescription` varchar(151) NOT NULL,
  `image` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `promo`
--

INSERT INTO `promo` (`promoId`, `promoName`, `promoPercent`, `promoMinPurchase`, `promoMaxLimit`, `promoCode`, `promoCreatedAt`, `promoUpdatedAt`, `promoDescription`, `image`) VALUES
(1, 'mother day ibu', 10, 70000, 25000, 'mthrdy15', '2020-12-11 04:10:44', 'Mon, 14 Dec 2020 04:52:35 GMT', 'mother day promo', ''),
(5, 'mother day 2\\56ioa', 15, 120000, 25000, 'mthrdy15266', '2020-12-21 01:10:02', 'Mon, 21 Dec 2020 01:10:02 GMT', 'mother day promo', ''),
(8, 'bgbg-arka', 10, 29000, 20000, 'bgbg', '2020-12-21 04:42:16', 'Mon, 21 Dec 2020 04:42:16 GMT', 'bbg', ''),
(9, 'special new year', 10, 7000, 25000, 'NWYR2021', '2020-12-27 09:29:39', 'Sun, 27 Dec 2020 09:29:39 GMT', 'special new year', ''),
(11, 'special new year arkademi', 10, 7000, 25000, 'NWYR2021ark', '2020-12-27 14:22:28', 'Sun, 27 Dec 2020 14:22:28 GMT', 'special new year', '2020-12-27T14-22-28.826Zcount vue your cart.png');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `userPassword` varchar(1000) NOT NULL,
  `userAddress` varchar(255) NOT NULL,
  `userStatus` int(1) NOT NULL,
  `roleId` int(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `userPhone` int(15) NOT NULL,
  `userCreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`userId`, `userName`, `userEmail`, `userPassword`, `userAddress`, `userStatus`, `roleId`, `image`, `userPhone`, `userCreatedAt`) VALUES
(1, 'satu', 'satu@yahu.com', '$2b$10$IWuPEaz32vKW6jrjr4MumeJXDYWQ/zxlav3PGKdhnKG7cAghkcoSW', 'kota satu', 1, 1, '', 1, '2020-12-22 07:45:25'),
(2, 'dua', 'dua@google.com', '$2b$10$nxFhDToaGOEOm2NpBs3aNObeWREh9IjFhAUTdn304lpybKlnyZ0DO', 'kota 2', 2, 2, '2020-12-30T04-36-41.784Z2.jpg', 2, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indeks untuk tabel `detail_history`
--
ALTER TABLE `detail_history`
  ADD PRIMARY KEY (`detailHistoryId`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`historyId`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`);

--
-- Indeks untuk tabel `promo`
--
ALTER TABLE `promo`
  ADD PRIMARY KEY (`promoId`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `detail_history`
--
ALTER TABLE `detail_history`
  MODIFY `detailHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `historyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `promo`
--
ALTER TABLE `promo`
  MODIFY `promoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
