-- -------------------------------------------------------------
-- TablePlus 6.1.2(568)
--
-- https://tableplus.com/
--
-- Database: db_fiverr
-- Generation Time: 2024-10-07 14:59:41.2960
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  `stars` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `jobDetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_type_detail_id` int DEFAULT NULL,
  `detail_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_type_detail_id` (`job_type_detail_id`),
  KEY `detail_id` (`detail_id`),
  CONSTRAINT `jobDetail_ibfk_1` FOREIGN KEY (`job_type_detail_id`) REFERENCES `JobTypeDetails` (`id`) ON DELETE CASCADE,
  CONSTRAINT `jobDetail_ibfk_2` FOREIGN KEY (`detail_id`) REFERENCES `detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobHires` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `hire_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `JobHires_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `JobHires_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` int DEFAULT NULL,
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `short_description` text,
  `stars` int DEFAULT NULL,
  `job_type_detail_id` int DEFAULT NULL,
  `creator_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_type_detail_id` (`job_type_detail_id`),
  KEY `creator_id` (`creator_id`),
  CONSTRAINT `Jobs_ibfk_1` FOREIGN KEY (`job_type_detail_id`) REFERENCES `JobTypeDetails` (`id`) ON DELETE SET NULL,
  CONSTRAINT `Jobs_ibfk_2` FOREIGN KEY (`creator_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobTypeDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_type_id` (`job_type_id`),
  CONSTRAINT `JobTypeDetails_ibfk_1` FOREIGN KEY (`job_type_id`) REFERENCES `JobTypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT 'other',
  `role` enum('buyer','seller','admin','moderator') DEFAULT 'buyer',
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Comments` (`id`, `job_id`, `user_id`, `comment_date`, `content`, `stars`) VALUES
(2, 2, 4, '2024-10-05 18:51:40', 'test comment 2', 5),
(3, 2, 4, '2024-10-05 18:55:01', 'test comment 2', 5),
(4, 2, 4, '2024-10-05 21:53:52', 'string', 0),
(5, 2, 5, '2024-10-06 15:06:42', 'great job!!!', 5);

INSERT INTO `detail` (`id`, `detail_name`) VALUES
(1, 'Detail 1'),
(2, 'Detail 2'),
(3, 'Detail 3'),
(4, 'Detail 1'),
(5, 'Detail 2'),
(6, 'Detail 3'),
(7, 'New Detail'),
(9, 'Detail 11'),
(10, 'new Detail'),
(11, 'new Detail'),
(12, 'new Detail'),
(13, 'new Detail'),
(14, 'other Detail'),
(15, 'Detail 1');

INSERT INTO `jobDetail` (`id`, `job_type_detail_id`, `detail_id`) VALUES
(2, 13, 2),
(3, 15, 1),
(4, 16, 3),
(6, 27, 9),
(10, 34, 13),
(11, 34, 14),
(12, 35, 15);

INSERT INTO `Jobs` (`id`, `name`, `rating`, `price`, `image`, `description`, `short_description`, `stars`, `job_type_detail_id`, `creator_id`) VALUES
(2, 'fiverr', 4, 123, 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728116698/uploads/r36tesbhonj9dplhxc3x.jpg', 'du án fiverr', 'du án fiverr', NULL, 27, 4);

INSERT INTO `JobTypeDetails` (`id`, `name`, `image`, `job_type_id`) VALUES
(13, 'Logo Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv1.jpg', 4),
(14, 'Brand Style Guides', 'https://fiverrnew.cybersoft.edu.vn/images/lcv2.jpg', 4),
(15, 'Website Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv3.jpg', 5),
(16, 'Landing Page Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv4.jpg', 5),
(17, 'Business Card Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv5.jpg', 6),
(18, 'Brochure Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv6.jpg', 6),
(19, 'Logo Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv1.jpg', 4),
(20, 'Brand Style Guides', 'https://fiverrnew.cybersoft.edu.vn/images/lcv2.jpg', 4),
(21, 'Website Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv3.jpg', 5),
(22, 'Landing Page Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv4.jpg', 5),
(23, 'Business Card Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv5.jpg', 6),
(24, 'Brochure Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv6.jpg', 6),
(26, 'Logo Design', NULL, NULL),
(27, 'Logo Design 2', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728109322/uploads/kpo0wmljxzs32q0go4tj.jpg', 4),
(28, 'Logo Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv1.jpg', 7),
(29, 'Brand Style Guides', 'https://fiverrnew.cybersoft.edu.vn/images/lcv2.jpg', 4),
(30, 'Website Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv3.jpg', 5),
(31, 'Landing Page Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv4.jpg', 5),
(32, 'Business Card Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv5.jpg', 6),
(33, 'Brochure Design', 'https://fiverrnew.cybersoft.edu.vn/images/lcv6.jpg', 6),
(34, 'Front end Design', NULL, NULL),
(35, 'Logo Design for coffee', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728228885/uploads/my9qkrm8m396iiss0rzk.jpg', 5);

INSERT INTO `JobTypes` (`id`, `name`) VALUES
(3, 'Figma'),
(4, 'Logo & Brand Identity'),
(5, 'Web Development'),
(6, 'Graphic Design'),
(7, 'Logo & Brand Identity'),
(8, 'Web Development'),
(9, 'Graphic Design'),
(10, 'web developer');

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `avatar`) VALUES
(1, 'John Smith', 'john.smith@example.com', 'hashed_password_1', '+1234567890', '1990-05-15', 'male', 'buyer', 'English,Communication,Project Management', 'IELTS Certificate,PMP', NULL),
(2, 'Emma Johnson', 'emma.johnson@example.com', 'hashed_password_2', '+1987654321', '1988-09-22', 'female', 'seller', 'Graphic Design,Illustrator,Photoshop', 'Adobe Certified Expert,Bachelor of Fine Arts', NULL),
(3, 'Michael Brown', 'michael.brown@example.com', 'hashed_password_3', '+1369852147', '1985-12-03', 'male', 'admin', 'System Administration,Network Security,Data Analysis', 'CISSP,CCNA,Master of IT', NULL),
(4, 'vinh bui', 'vinh@gmail.com', '$2b$10$lYb5.IaGik6TCjVS0ds65uEWoL25hu95BFt7vJEdBEspqoXC3xeXq', '123456789', '07-09-1997', 'male', 'buyer', 'a,b,c', 'd,e', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728165736/uploads/t5vtek3aldikspr0oq3r.jpg'),
(5, 'bui quang vinh', 'vinh123@gmail.com', '$2b$10$3TJRzACPEOssmth78iBi6eDxOnJ0mD1ZDC0JqQOmigkN9jyL5A3SG', '0101010100', '09-07-1999', 'male', 'buyer', 'react,nextjs,nestjs', 'aws, ielts', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728225491/uploads/umvdf3chwyqjq3qryuca.jpg'),
(6, 'Vinh Bui', 'vinhbui@gmail.com', '$2b$10$RoOv6AmDALbN8Q7Monn0bemEN1ycQl0R7m8kaENWs5MZiG4J6LEH.', '0101010101', '07-09-1999', 'male', 'buyer', 'html,css,js', 'cybersoft, ielts', 'https://res.cloudinary.com/dx8xdfn9d/image/upload/v1728228422/uploads/ljbkribfyxutpzkiyfrs.jpg');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;