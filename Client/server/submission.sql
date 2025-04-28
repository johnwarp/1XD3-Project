-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 05:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zhaos118_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `email` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `timeslot` datetime NOT NULL,
  `insta` varchar(30) NOT NULL,
  `song_request` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`email`, `name`, `timeslot`, `insta`, `song_request`) VALUES
('1sankaraja@hdsb.ca', 'Ajay Sankar', '2025-05-02 17:00:00', 'ajay', 'song 3'),
('bro@bro.bro', 'bruh', '2025-04-29 17:00:00', 'bro', 'brorbro'),
('goblin@gmail.com', 'goblin', '2025-05-01 11:00:00', 'goblin', 'goblin'),
('idk@hotmail.ca', 'idk', '2025-04-30 14:00:00', 'idk', 'idk'),
('zhaos118@mcmaster.ca', 'Samuel Zhao', '2025-04-28 14:00:00', 'sam', 'song');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
