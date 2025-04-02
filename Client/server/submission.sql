-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2025 at 10:21 AM
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
  `timeslot` date NOT NULL,
  `insta` varchar(30) NOT NULL,
  `msg2` varchar(50) DEFAULT NULL,
  `msg3` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`email`, `name`, `timeslot`, `insta`, `msg2`, `msg3`) VALUES
('bro@gmail.com', 'adsflkj', '2025-04-10', 'sdf', 'df', 'sdfsdfds'),
('ldkdfj@lksjdf', 'sd', '2025-04-10', 'asdf', 'lkj', 'lkj'),
('llkj@lkj', 'asdf', '2025-04-11', 'lkj', 'lkj', 'lkj'),
('zhaos118@mcmaster.ca', 'Samuel Zhao', '2025-04-10', 'goblin', 'goblin', 'goblin');

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
