-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Feb 2021 pada 00.59
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
  `historyId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `productQty` int(11) NOT NULL,
  `size` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_history`
--

INSERT INTO `detail_history` (`detailHistoryId`, `historyId`, `productId`, `productQty`, `size`) VALUES
(17, 41, 4, 3, '300 gr'),
(22, 44, 2, 2, '300 gr'),
(23, 44, 3, 3, '250 gr'),
(24, 41, 1, 3, '300 gr'),
(25, 47, 1, 1, '250 gr'),
(30, 53, 2, 1, '250 gr'),
(31, 54, 2, 1, '250 gr');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `historyId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subTotal` int(12) NOT NULL,
  `tax` int(12) NOT NULL,
  `total` int(12) NOT NULL,
  `discount` int(12) NOT NULL,
  `paymentMethod` varchar(32) NOT NULL,
  `deliveryMethod` varchar(64) NOT NULL,
  `historyCreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history`
--

INSERT INTO `history` (`historyId`, `userId`, `subTotal`, `tax`, `total`, `discount`, `paymentMethod`, `deliveryMethod`, `historyCreatedAt`) VALUES
(41, 18, 69000, 6900, 75900, 0, 'Bank Account', 'Door Delivery', '2021-01-11 15:00:10'),
(44, 18, 170000, 17000, 187000, 0, 'Card', 'Dine in', '2021-02-15 08:34:12'),
(45, 18, 69000, 6900, 70900, 0, 'Bank Account', 'Door Delivery', '2021-02-02 03:42:17'),
(47, 18, 34000, 3400, 37400, 0, 'Bank Account', 'Door Delivery', '2021-02-16 04:08:33'),
(48, 18, 34000, 3400, 37400, 0, 'Bank Account', 'Door Delivery', '2021-06-16 04:08:33'),
(53, 18, 25000, 2500, 27500, 0, 'Card', 'Dine in', '2021-02-17 07:58:30'),
(54, 18, 25000, 2500, 27500, 2500, 'Bank Account', 'Dine in', '2021-02-17 09:50:07');

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
  `productCreatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
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

INSERT INTO `product` (`productId`, `productName`, `categoryId`, `productPrice`, `productStock`, `deliveryStartHour`, `deliveryEndHour`, `productCreatedAt`, `productDiscount`, `productSizeR250`, `productSizeL300`, `productSizeXL500`, `productDelivery`, `productDinein`, `productTakeAway`, `image`, `productDescription`) VALUES
(1, 'Veggie tomato mix', 3, 34000, 80, 10, 17, '2020-12-10 03:15:02', 35, 1, 1, 1, 1, 1, 1, '2021-02-15T00-28-48.958ZCanva-ClearDrinkingGlassFilledWithJuice.jpg', 'Vegetables are parts of plants that are consumed by humans or other animals as food. The original meaning is still commonly used and is applied to plants collectively to refer to all edible plant matter, including the flowers, fruits, stems, leaves, roots'),
(2, 'Hazelnut Latte', 2, 25000, 95, 10, 14, '2020-12-10 03:39:36', 10, 1, 1, 1, 1, 1, 1, '2021-01-07T23-45-01.680ZCanva - Latte In White Ceramic Cup.jpg', 'hazelnut'),
(3, 'ini tes juga', 2, 25000, 95, 10, 14, '2020-12-10 04:18:53', 0, 1, 1, 1, 1, 1, 1, '2021-01-08T02-29-56.309Zsoup.jpg', 'hazelnut'),
(4, 'Hazelnut Latte', 2, 25000, 95, 10, 14, '2020-12-10 04:31:46', 0, 1, 1, 1, 1, 1, 1, '2021-01-08T01-09-34.382Zimage 22.png', 'hazelnut'),
(5, 'Summer fried rice', 3, 55000, 95, 11, 16, '2020-12-10 17:46:12', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-08-02.041Zimage 23.png', 'Summer fried rice'),
(11, 'ini tes juga', 1, 23000, 34, 10, 16, '2020-12-13 09:38:39', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T02-12-41.218Zcake.jpg', 'ini cuman tes doang'),
(12, 'ini tes jugare', 1, 23000, 34, 10, 16, '2020-12-14 04:48:08', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-13-43.543ZCanva - Two Clear Glass Footed Mugs.jpg', 'ini cuman tes doang'),
(13, 'ini tes jugaygfyufyufyu', 3, 23000, 34, 10, 16, '2020-12-14 04:48:52', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-27-48.540ZCanva-CookedFoodWithToppings.jpg', 'ini cuman tes doang'),
(14, 'ini baru', 1, 23000, 34, 10, 16, '2020-12-14 06:49:33', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-28-39.877ZCanva-PancakewithBerries.jpg', 'ini cuman tes doang'),
(15, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 06:50:35', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-29-36.708ZCanva-ClearDrinkingGlass.jpg', 'ini cuman tes doang'),
(16, 'ini baru', 3, 23000, 34, 10, 16, '2020-12-14 06:50:52', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-30-10.269ZCanva-WhiteCeramicCup.jpg', 'ini cuman tes doang'),
(17, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 06:51:12', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T01-37-33.873ZCanva-PersonPouringDrinkfromCoconut.jpg', 'ini cuman tes doang'),
(18, 'ini baru', 3, 23000, 34, 10, 16, '2020-12-14 06:53:22', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T02-15-42.172Zimage2.png', 'ini cuman tes doang'),
(19, 'ini baru', 2, 23000, 34, 10, 16, '2020-12-14 06:55:53', 1, 1, 1, 1, 1, 1, 1, '2021-01-08T02-25-03.489Zavocado.jpg', 'ini cuman tes doang'),
(27, 'aabb', 1, 8, 1, 12, 10, '2020-12-21 04:04:27', 20, 0, 0, 1, 0, 1, 0, '2021-01-08T02-25-21.588Zfruits.jpg', 'aabb'),
(31, 'aa', 1, 1, 11, 11, 10, '2021-01-07 15:30:20', 10, 0, 0, 0, 0, 0, 0, '2021-01-07T15-30-20.533ZCanva - Clear Drinking Glass Filled With Juice.jpg', 'aa'),
(32, 'kelapa', 2, 30000, 2, 10, 10, '2021-01-07 16:05:03', 0, 0, 0, 0, 0, 0, 0, '2021-01-07T16-05-03.784ZCanva - Person Pouring Drink from Coconut.jpg', 'kelapa'),
(33, 'akhir', 3, 111111, 11, 10, 10, '2021-01-08 02:27:15', 20, 0, 0, 0, 0, 0, 0, '2021-01-08T02-27-15.384Zmangoes.jpg', 'akhir'),
(34, 'baik', 1, 11, 11, 10, 11, '2021-01-08 03:09:52', 10, 0, 0, 0, 0, 0, 0, '2021-01-08T03-10-12.144ZCanva-GreenSaladWithBread.jpg', 'baik'),
(37, 'pruduk sekarang', 1, 10000, 11, 11, 10, '2021-01-12 08:39:28', 10, 0, 0, 0, 0, 0, 0, '2021-01-12T08-39-28.823ZCanva-GreenPapayaSalad,SomtumThaiFoodStockPhoto.jpg', 'desc');

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
(1, 'special new year anka', 10, 70000, 25000, 'kjsdoiewo', '2020-12-11 04:10:44', 'Mon, 14 Dec 2020 04:52:35 GMT', 'special new year anka description', '2021-02-14T23-40-02.367Z6.jpg'),
(9, 'February', 15, 190000, 0, 'feb02', '2020-12-27 09:29:39', 'Sun, 27 Dec 2020 09:29:39 GMT', 'promo this month', ''),
(18, 'February', 20, 190000, 0, 'feb022021', '2020-12-27 09:29:39', 'Sun, 27 Dec 2020 09:29:39 GMT', 'promo this month', '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `userPassword` varchar(1000) NOT NULL,
  `userAddress` varchar(255) NOT NULL,
  `userStatus` int(1) NOT NULL,
  `userKeys` varchar(32) NOT NULL,
  `roleId` int(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `userPhone` int(15) NOT NULL,
  `userCreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `userEmail`, `userPassword`, `userAddress`, `userStatus`, `userKeys`, `roleId`, `image`, `userPhone`, `userCreatedAt`) VALUES
(1, 'satu', '', 'satu@yahu.com', '$2b$10$IWuPEaz32vKW6jrjr4MumeJXDYWQ/zxlav3PGKdhnKG7cAghkcoSW', 'kota satu dua', 1, '', 1, '2021-01-12T07-53-38.179ZCanva-FoodBeingCooked.jpg', 1, '2020-12-22 07:45:25'),
(2, '', '', 'dua@google.com', '$2b$10$nxFhDToaGOEOm2NpBs3aNObeWREh9IjFhAUTdn304lpybKlnyZ0DO', 'kota 2', 2, '', 2, '2020-12-30T04-36-41.784Z2.jpg', 2, '0000-00-00 00:00:00'),
(5, '', '', 'lima@google.com', '$2b$10$7hKBnfmp04PXIFM48otWHeuHBWrYMvrXqBQbT9bHuiOBZYHodokbO', '', 1, '', 0, '', 5555, '2021-01-07 06:16:40'),
(6, '', '', 'empat@gmail.com', '$2b$10$Ztx5jULmxkwOUx6H.s6jsujBxg1uy.H5FkjUvZ6GyuImshtjFPy0W', '', 0, '', 0, '', 444, '2021-01-07 06:17:30'),
(7, '', '', 'delapan@gmail.com', '$2b$10$KiEp5kEpIkTEhSc8gtU30O6p/XTDSJQxl3TzR2sCO5GMLWrMGHJJe', '', 1, '', 0, '', 8888, '2021-01-12 07:04:28'),
(9, '', '', 'baru@gmail.com', '$2b$10$MjQTPBbFDtVsuTRFsO1lJuX/tK0LG1uStWI6XAuDZxFk8auDOHLe6', '', 0, '', 0, '', 0, '2021-01-12 08:28:51'),
(10, '', '', '', '$2b$10$n1bPZy9YJt/NWtMW6ucZ1O0MFLZgRDIruVpURAfQKS1PhMSEhwCUO', '', 0, '', 0, '', 0, '2021-01-12 08:29:00'),
(11, 'budi', 'baba', 'a', '$2b$10$rYii1d3FfL/rXmb.wrlZ2.1hFJ7L6dOKklqN4Uc/xMm8rhLxOVSvq', 'jakarta', 1, '586261060', 0, '2021-01-12T08-36-21.192Zmeat.jpg', 111, '2021-01-12 08:29:47'),
(18, 'Anka', 'Abdullah', 'ankaabdullah.id@gmail.com', '$2b$10$LrDwUcNQo.GXz.WN1E.1dOYwr/ZRes0BB.yfZ0/FWmjWQ7hiqTtA.', 'kota bogor, kecamatan bogor barat', 1, '', 1, '2021-02-16T01-49-12.617ZCanva-GreenSaladWithBread.jpg', 2147483647, '2021-02-14 07:22:09');

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
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `detail_history`
--
ALTER TABLE `detail_history`
  MODIFY `detailHistoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `historyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `promo`
--
ALTER TABLE `promo`
  MODIFY `promoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
