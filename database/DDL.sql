-- All code is based on the CS 340 starter code:
-- Date: 11/30/2024

-- Project Step 2 Draft Group 17 Christian Buckheit and Eugenia Uvarov
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist to avoid conflicts during import/creating tables
DROP TABLE IF EXISTS OrdersProducts;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS ShipmentContainers;
DROP TABLE IF EXISTS Robots;
DROP TABLE IF EXISTS Customers;

-- Create Customer table
CREATE TABLE Customers (
    customerID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    address VARCHAR(255),
    phone VARCHAR(15)
);

-- Create Products table
CREATE TABLE Products (
    productID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stockLevel INT NOT NULL,
    productLocation VARCHAR(20)
);

-- Create Orders table with foreign keys to customerID, robotID, and containerID
CREATE TABLE Orders (
    orderID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    customerID INT,
    orderDate DATE NOT NULL,
    robotID INT,
    containerID INT,
    shippingStatus ENUM('pending', 'in_transit', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE,
    FOREIGN KEY (robotID) REFERENCES Robots(robotID) ON DELETE CASCADE,
    FOREIGN KEY (containerID) REFERENCES ShipmentContainers(containerID) ON DELETE CASCADE
);

-- Create OrdersProducts table for many-to-many relationship between Orders and Products
CREATE TABLE OrdersProducts (
    orderProductID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT NOT NULL,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE
);

-- Create Robots table
CREATE TABLE Robots (
    robotID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    status ENUM('available', 'unavailable') DEFAULT 'available',
    currentLocation VARCHAR(20)
);

-- Create ShipmentContainers table
CREATE TABLE ShipmentContainers (
    containerID INT AUTO_INCREMENT UNIQUE NOT NULL PRIMARY KEY,
    isFilled BOOLEAN DEFAULT FALSE,
    location VARCHAR(20)
);

-- Insert sample data (auto increment will now handle PK vals)
INSERT INTO Customers (name, email, address, phone) VALUES 
('Alice Future', 'alice.future@example.com', '123 Robo Street, Pittsburgh, PA', '123-555-1234'), 
('Rob Osmith', 'rob.osmith@example.com', '456 Drone Avenue, Boston, MA', '123-555-5678'), 
('Kyle Techno', 'kyle.techno@example.com', '789 Auto Road, San Francisco, CA', '123-555-8765'),
('Mary Jones', 'mary.jones@example.com', '1011 Tech Drive, Philadelphia, PA', '555-555-4321');

INSERT INTO Products (name, description, price, stockLevel, productLocation) VALUES 
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver.', 29.99, 100, '10, 20'),
('Mechanical Keyboard', 'RGB backlit mechanical keyboard.', 79.99, 50, '15, 25'), 
('HDMI Cable', 'High-speed HDMI cable, 6 feet long.', 15.99, 200, '5, 30'), 
('Webcam', '1080p HD webcam with built-in microphone.', 49.99, 75, '12, 18');

INSERT INTO Orders (customerID, orderDate, robotID, containerID, shippingStatus) VALUES 
(1, CURRENT_DATE, 1, 1, 'pending'), 
(2, CURRENT_DATE, 1, 2, 'in_transit'), 
(3, CURRENT_DATE, 2, 1, 'delivered'),
(1, CURRENT_DATE, NULL, 3, 'pending');

INSERT INTO OrdersProducts (orderID, productID, quantity) VALUES 
(1, 1, 2), -- 2 Wireless Mice in Order 1 
(1, 2, 1), -- 1 Mechanical Keyboard in Order 1 
(1, 3, 3), -- 3 HDMI Cables in Order 1 
(2, 1, 1), -- 1 Wireless Mouse in Order 2 
(3, 2, 1); -- 1 Mechanical Keyboard in Order 3

INSERT INTO Robots (status, currentLocation) VALUES 
('available', '14, 5'), 
('unavailable', '8, 12'),
('available', '10, 20');

INSERT INTO ShipmentContainers (isFilled, location) VALUES 
(TRUE, '1, 3'), 
(FALSE, '2, 7'),
(FALSE, '4, 8');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
