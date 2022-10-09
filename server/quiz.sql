-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2022 at 12:14 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(110) DEFAULT NULL,
  `email` varchar(225) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(10, 'admin', 'admin@admin.com', '0e7517141fb53f21ee439b355b5a1d0a', '2022-09-18 16:24:07');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `option_first` text NOT NULL,
  `option_second` text NOT NULL,
  `option_third` text NOT NULL,
  `option_fourth` text NOT NULL,
  `q_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `option_first`, `option_second`, `option_third`, `option_fourth`, `q_id`, `created_at`) VALUES
(1, 'Stem', 'Leaves', 'Poppy', 'Stem joints', 1, '2022-09-19 17:37:46'),
(2, ' 10 pairs', '12 pairs', '14 pairs', '16 pairs', 2, '2022-09-19 17:37:46'),
(3, 'Charaka', 'Sushruta', 'Nagarjuna', 'Vagbhatta', 3, '2022-09-19 17:37:47'),
(4, ' Fish', 'Crab ', 'Prawn ', 'Snail', 4, '2022-09-19 17:37:47'),
(5, ' Iron', ' Magnesium', 'Cobalt', 'Copper', 5, '2022-09-19 17:37:47'),
(6, ' Cell plasma', ' Cell membrane', 'Cell walls', ' None of the above', 6, '2022-09-19 17:37:47'),
(7, ' Shrink and collapse', 'Stick together', ' increase in volume and burst', 'Remains same', 7, '2022-09-19 17:37:47'),
(8, 'Radiotherapy', 'Chemotherapy', 'Surgery', 'None of them,', 8, '2022-09-19 17:37:47'),
(9, 'Solanaceae', 'Fabaceae', 'Cruciferae', ' None of these', 9, '2022-09-19 17:37:47'),
(10, 'Petals', 'Root hairs', 'Stomata', 'Mitochondria', 10, '2022-09-19 17:37:48'),
(11, '180Â°', ' 240Â°', '360Â°', 'none of the above', 11, '2022-09-19 17:42:00'),
(12, 'James Gosling', 'Charles Babbage', 'Dennis Ritchie', 'Bjarne Stroustrup', 12, '2022-09-24 07:05:18'),
(13, 'Commonly Occupied Machines Used in Technical and Educational Research', 'Commonly Operated Machines Used in Technical and Environmental Research', 'Commonly Oriented Machines Used in Technical and Educational Research', 'Commonly Operated Machines Used in Technical and Educational Research', 13, '2022-09-24 07:05:19'),
(14, 'Computer is a machine or device that can be programmed to perform arithmetical or logic operation sequences automatically', ' Computer understands only binary language which is written in the form of 0s & 1s', 'Computer is a programmable electronic device that stores, retrieves, and processes the data', 'All of the mentioned', 14, '2022-09-24 07:05:19'),
(15, 'Computer Processing Unit', 'Computer Principle Unit', 'Central Processing Unit', 'Control Processing Unit', 15, '2022-09-24 07:05:19'),
(16, 'Computer understands only C Language', 'Computer understands only Assembly Language', ' Computer understands only Binary Language', 'Computer understands only BASIC', 16, '2022-09-24 07:05:19'),
(17, 'pascal', 'machine language', 'C', 'C#', 17, '2022-09-24 07:05:19'),
(18, 'Central Processing Unit', ' Memory', 'Arithmetic and Logic unit', 'Control unit', 18, '2022-09-24 07:05:19'),
(19, 'Versatility', 'Accuracy', 'Diligence', 'I.Q.', 19, '2022-09-24 07:05:19'),
(20, 'Bit', 'KB', 'Nibble', 'Byte', 20, '2022-09-24 07:05:20'),
(21, 'Output Unit', 'Input Unit', 'Memory Unit', 'Arithmetic & Logic Unit', 21, '2022-09-24 07:05:20');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` int(11) NOT NULL,
  `q_type` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `answer`, `q_type`, `topic_id`, `created_at`) VALUES
(1, 'Opium is obtained from the dry latex from which part of the Papaver somniferum Plant?', 3, 1, 1, '2022-09-19 17:37:46'),
(2, 'How many pairs of ribs are there in a human body?', 2, 1, 1, '2022-09-19 17:37:46'),
(3, 'Which ancient Indian physician is known as the â€˜Father of Surgeryâ€™?', 2, 1, 1, '2022-09-19 17:37:47'),
(4, 'Which among the following is different from other three?', 1, 1, 1, '2022-09-19 17:37:47'),
(5, 'The elements which are found in Haemoglobin, Chlorophyll, Chalcopyrite & Vitamin B12 are respectively as follows__________?', 2, 2, 1, '2022-09-19 17:37:47'),
(6, 'Which among the following function as locus of biochemical reactions?', 2, 2, 1, '2022-09-19 17:37:47'),
(7, 'If Red blood cells in kept in distilled water what will happen?', 3, 2, 1, '2022-09-19 17:37:47'),
(8, 'Brachytherapy is commonly used as an effective treatment for cervical, prostate, breast, and skin cancer in many parts of the world. Why Brachytherapy is an offshoot of which among the following forms of Cancer Treatment?', 1, 3, 1, '2022-09-19 17:37:47'),
(9, 'To which family do brown mustard and broccoli belong?', 3, 3, 1, '2022-09-19 17:37:47'),
(10, 'Carbon Dioxide from the air is trapped by which of the following parts of the plant?', 3, 3, 1, '2022-09-19 17:37:47'),
(11, 'An angle whose value is ____, is called complete angle.', 3, 1, 2, '2022-09-19 17:42:00'),
(12, 'Who is the father of Computers?', 2, 1, 3, '2022-09-24 07:05:18'),
(13, 'Which of the following is the correct abbreviation of COMPUTER?', 4, 1, 3, '2022-09-24 07:05:18'),
(14, ' Which of the following is the correct definition of Computer?', 4, 1, 3, '2022-09-24 07:05:19'),
(15, 'What is the full form of CPU?', 3, 1, 3, '2022-09-24 07:05:19'),
(16, ' Which of the following language does the computer understand?', 3, 2, 3, '2022-09-24 07:05:19'),
(17, ' Which of the following computer language is written in binary codes only?', 2, 2, 3, '2022-09-24 07:05:19'),
(18, 'Which of the following is the brain of the computer?', 1, 2, 3, '2022-09-24 07:05:19'),
(19, 'Which of the following is not a characteristic of a computer?', 4, 3, 3, '2022-09-24 07:05:19'),
(20, 'Which of the following is the smallest unit of data in a computer?', 1, 3, 3, '2022-09-24 07:05:20'),
(21, 'Which of the following unit is responsible for converting the data received from the user into a computer understandable format?', 2, 3, 3, '2022-09-24 07:05:20');

-- --------------------------------------------------------

--
-- Table structure for table `questions_type`
--

CREATE TABLE `questions_type` (
  `id` int(11) NOT NULL,
  `type` varchar(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions_type`
--

INSERT INTO `questions_type` (`id`, `type`, `created_at`) VALUES
(1, 'Beginner Le', '2022-09-23 17:09:13'),
(2, 'Intermediat', '2022-09-23 17:09:13'),
(3, 'Professiona', '2022-09-23 17:09:32');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `name`, `created_at`) VALUES
(1, 'science', '2022-09-19 17:37:46'),
(2, 'Math', '2022-09-19 17:42:00'),
(3, 'Computer', '2022-09-24 07:05:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions_type`
--
ALTER TABLE `questions_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `questions_type`
--
ALTER TABLE `questions_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
