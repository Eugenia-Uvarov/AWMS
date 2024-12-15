-- All code is based on the CS 340 starter code:
-- Date: 11/30/2024
-- Source URL: https://canvas.oregonstate.edu/courses/1976520/assignments/9783695?module_item_id=24719067

-- SELECT Queries --

-- get all customers and their personal data for the browse Customers page
SELECT * FROM Customers;

-- get personal data of customer with selected ID
SELECT * FROM Customers WHERE customerID =  :customerID_selected_from_customers_page;

--get all products for the browse Products page
SELECT * FROM Products;

--get all data of product with selected ID
SELECT * FROM Products WHERE productID =  :productID_selected_from_products_page;

--get all orders for the browse Orders page
SELECT * FROM Orders

-- get a date in correct format for Orders table
SELECT *, DATE_FORMAT(orderDate, '%Y-%m-%d') AS formatted_order_date FROM Orders;

-- get all robots to populate a dropdown for assigning to an order
SELECT * FROM Robots;

-- get robots with status 'availiable' for drop-down menu
SELECT * FROM Robots WHERE status = 'available';

-- get robot with certain ID
SELECT * FROM Robots WHERE robotID = :robotID_selected_from_robots_page;

-- get all shipment containers to populate a dropdown for associating with an order
SELECT * FROM ShipmentContainers;

-- get containers with status 'Not Filled' for drop-down menu
SELECT * FROM ShipmentContainers WHERE isFilled = 0;

--get shipment container with selected ID
SELECT * FROM ShipmentContainers WHERE containerID = :containerID_selected_from_containers_page;

--get orders, products name and quantity to populate orders/products page
SELECT op.orderProductID, o.orderID, op.productID, p.name AS productName, op.quantity
FROM Orders o 
JOIN OrdersProducts op ON o.orderID = op.orderID 
JOIN Products p ON op.productID = p.productID;
ORDER BY op.orderProductID;

--get the specific order
SELECT op.orderProductID, op.orderID, op.productID, op.quantity, Products.name
FROM OrdersProducts op
JOIN Products ON op.productID = Products.productID
WHERE op.orderID =  :orderProductID_selected_from_products_in_order;

-- INSERT Queries --

-- add a new customer
--********IMPORTANT
-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Customers (name, email, address, phone) VALUES 
(:nameInput, :emailInput, :addressInput, :phoneInput);

-- add a new product
INSERT INTO Products (name, description, price, stockLevel, productLocation) VALUES 
(:nameInput, :descriptionInput, :priceInput, :stockLevelInput, :productLocationInput);

-- create a new order
INSERT INTO Orders (customerID, orderDate, robotID, containerID, shippingStatus) VALUES 
(:customerIDInput, :orderDateInput, :robotIDInput, :containerIDInput, :shippingStatusInput);

-- add a new robot
INSERT INTO Robots (status, currentLocation) VALUES 
(:statusInput, :currentLocationInput)

-- add a new shipment container
INSERT INTO ShipmentContainers (isFilled, location) VALUES 
(:isFilledInput, :locationInput)

-- add a new shipment container
INSERT INTO OrdersProducts (orderID, productID, quantity) VALUES 
(:orderIDinput, :productID, :quantityInput);

-- UPDATE Queries --

-- update customer
UPDATE Customers SET email = :emailInput, address = :addressInput, phone = :phoneInput 
WHERE customerID = :customerID_selected_from_customers_page;

-- Update an existing product's details based on submission of the Update Product form 
UPDATE Products SET name = :nameInput, description = :descriptionInput, price = :priceInput, 
stockLevel = :stockLevelInput, productLocation = :productLocationInput 
WHERE productID = :productID_selected_from_products_page;

-- Update an existing order
UPDATE Orders SET customerID = :customerIDInput, orderDate = :orderDateInput, robotID = :robotIDInput, containerID = :containerIDInput, shippingStatus = :shippingStatusInput
WHERE orderID = :orderID_selected_from_orders_page;

-- Update a robot
UPDATE Robots SET status = :statusInput, currentLocation = :currentLocationInput 
WHERE robotID = :robotID_selected_from_robots_page;

-- Update a shipment container
UPDATE ShipmentContainers SET isFilled = :isFilledInput, location = :locationInput 
WHERE containerID = :containerID_selected_from_containers_page;

-- for updating the intersection table
UPDATE OrdersProducts SET orderID = :newOrderID, productID = :newProdutID, quantity = :newQuantityInput
WHERE orderProductID = :orderProductIDInput;


-- DELETE Queries --

-- delete customer and all their associated orders
DELETE FROM Customers WHERE customerID = :customerID_selected_from_customers_page;

-- delete product
DELETE FROM Products WHERE productID = :productID_selected_from_products_page;

-- delete an order
DELETE FROM Orders WHERE orderID = :orderID_selected_from_orders_page;

-- delete a robot
DELETE FROM Robots WHERE robotID = :robotID_selected_from_robots_page;

-- delete a shipmentContainer
DELETE FROM ShipmentContainers WHERE containerID = :containerID_selected_from_containers_page;

-- delete an OrdersProducts
DELETE FROM OrdersProducts WHERE orderProductID = :orderProductID_selected_from_products_in_order;




