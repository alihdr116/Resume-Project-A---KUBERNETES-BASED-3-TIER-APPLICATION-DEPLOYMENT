-- Create database
CREATE DATABASE IF NOT EXISTS resume_project;

-- Use database
USE resume_project;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

-- Insert some demo data
INSERT INTO users (name, email) VALUES
('Ali Haider', 'ali@example.com'),
('John Doe', 'john@example.com');
