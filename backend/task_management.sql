-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2024 at 05:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
    `category_id` int(11) NOT NULL,
    `category_name` varchar(50) NOT NULL,
    `user_id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO
    `categories` (
        `category_id`,
        `category_name`,
        `user_id`
    )
VALUES (5, 'Work', 2),
    (6, 'Personal', 2),
    (7, 'Ako na gud ni', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
    `task_id` int(11) NOT NULL,
    `title` varchar(100) NOT NULL,
    `description` text DEFAULT NULL,
    `due_date` date DEFAULT NULL,
    `category_id` int(11) NOT NULL,
    `status` enum(
        'To Do',
        'In Progress',
        'Done',
        'Cancelled'
    ) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO
    `tasks` (
        `task_id`,
        `title`,
        `description`,
        `due_date`,
        `category_id`,
        `status`,
        `created_at`
    )
VALUES (
        1,
        'Manglaba',
        '1232131',
        '2024-05-09',
        5,
        'To Do',
        '2024-05-06 12:53:51'
    ),
    (
        2,
        'Gwapo ko',
        'dasdasdas',
        '2024-05-16',
        7,
        'Cancelled',
        '2024-05-06 12:55:41'
    );

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
    `user_id` int(11) NOT NULL,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO
    `user` (
        `user_id`,
        `username`,
        `password`
    )
VALUES (
        2,
        'jm',
        '$2b$10$DCxQ7vSknsVrYq8EBMjmL.Ts6vWq5W8Dc64DAcg2MFwJ25MY7Lblq'
    ),
    (
        4,
        'jm123',
        '$2b$10$gV7Ctm7DJQK7YhPcRxM6xOAL7g7j/ou4Lp5urQ4K6jLcLRpYJCaVK'
    ),
    (
        5,
        'maxuser',
        '$2b$10$2X8bN0eTA2Ya5DPQOF9vpOl/eY0.0Ra69AHzqCGrFHg93FRn64vTS'
    );

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
ADD PRIMARY KEY (`category_id`),
ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
ADD PRIMARY KEY (`task_id`),
ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user` ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 9;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;