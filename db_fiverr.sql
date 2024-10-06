-- Tạo cơ sở dữ liệu (nếu chưa tồn tại)
CREATE DATABASE IF NOT EXISTS db_fiverr;

-- Sử dụng cơ sở dữ liệu
USE db_fiverr;

-- Xóa các bảng nếu đã tồn tại (để tránh lỗi khi chạy lại script)
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS JobHires;
DROP TABLE IF EXISTS Jobs;
DROP TABLE IF EXISTS JobTypeDetails;
DROP TABLE IF EXISTS JobTypes;
DROP TABLE IF EXISTS Users;

-- Tạo bảng Users
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birth_day VARCHAR(20),
    gender ENUM('male', 'female', 'other') DEFAULT 'other',
    role ENUM('buyer', 'seller', 'admin', 'moderator') DEFAULT 'buyer',
    skill VARCHAR(255),
    certification VARCHAR(255)
);

-- Tạo bảng JobTypes
CREATE TABLE JobTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

-- Tạo bảng JobTypeDetails
CREATE TABLE JobTypeDetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    job_type_id INT,
    FOREIGN KEY (job_type_id) REFERENCES JobTypes(id) ON DELETE CASCADE
);

-- Tạo bảng Jobs
CREATE TABLE Jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    rating INT,
    price INT NOT NULL,
    image VARCHAR(255),
    description TEXT,
    short_description TEXT,
    stars INT,
    job_type_detail_id INT,
    creator_id INT,
    FOREIGN KEY (job_type_detail_id) REFERENCES JobTypeDetails(id) ON DELETE SET NULL,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Tạo bảng JobHires
CREATE TABLE JobHires (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    user_id INT,
    hire_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Tạo bảng Comments
CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT,
    user_id INT,
    comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    stars INT,
    FOREIGN KEY (job_id) REFERENCES Jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);