-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 05:25 AM
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
-- Table structure for table `band_availability`
--

CREATE TABLE `band_availability` (
  `date` date DEFAULT NULL,
  `timeslot_id` int(11) DEFAULT NULL,
  `member_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `band_availability`
--

INSERT INTO `band_availability` (`date`, `timeslot_id`, `member_id`) VALUES
('2025-04-28', 0, 2),
('2025-04-28', 1, 1),
('2025-04-28', 1, 2),
('2025-04-28', 1, 3),
('2025-04-28', 1, 4),
('2025-04-28', 2, 2),
('2025-04-28', 2, 4),
('2025-04-29', 0, 2),
('2025-04-29', 1, 3),
('2025-04-29', 2, 1),
('2025-04-29', 2, 2),
('2025-04-29', 2, 3),
('2025-04-30', 1, 2),
('2025-04-30', 1, 3),
('2025-05-01', 0, 2),
('2025-05-01', 1, 2),
('2025-05-02', 2, 2),
('2025-05-02', 0, 0),
('2025-05-02', 1, 0),
('2025-05-02', 2, 0),
('2025-04-28', 0, 0),
('2025-04-28', 1, 0),
('2025-04-28', 2, 0),
('2025-04-29', 0, 0),
('2025-04-29', 1, 0),
('2025-04-29', 2, 0),
('2025-04-28', 2, 1),
('2025-04-30', 1, 1),
('2025-04-30', 2, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
