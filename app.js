// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// App.js

/*
    SETUP
*/


//Handlebars setup from the nodejs starterapp Step 3
const { engine } = require('express-handlebars'); // Correct way to import the engine
var exphbs = require('express-handlebars');
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static('public'))

// Set up Handlebars as the view engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Register .hbs extension
app.set('view engine', '.hbs'); // Use .hbs as the default view engine// Tell express to use the handlebars engine whenever it encounters a *.hbs file.


PORT = 17025;                 // Set a port number at the top so it's easy to change in the future

var db = require('./database/db-connector')

app.use(express.static('public'));  // commented out, added the db above

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });  
/*
    -----------ROUTES for Customer Entity-----------
*/

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Customers;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let customers = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let address = rows;
            return res.render('customers', {data: customers, address: address});  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query
});


app.post('/add-customer-ajax', function(req, res) 
{
    //console.log(req.body);  // Log the request body to ensure it's correct
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);
  
    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email, address, phone) 
              VALUES ('${data.name}', '${data.email}', '${data.address}', '${data.phone}')`;
        db.pool.query(query1, function(error, rows, fields) {
            // Check for errors
            if (error) {
                console.log(error);
                // Send an error response using res.send
                res.status(400)
            } else {
                query2 = `SELECT * FROM Customers`;
                db.pool.query(query2, function(error, rows) {
                    if (error) {
                        console.log(error);
                        res.status(400);
                    } else {
                        // Send the newly added customer as the response
                        res.status(200).send(rows);
                    }
                });
            }
        });
    });


app.delete('/delete-customer-ajax/', function(req,res,next){
  let data = req.body;
  let customerID = parseInt(data.id);
  console.log('Received customerID:', data.id);
  let deleteCustomer= `DELETE FROM Customers WHERE customerID = ?`;

        // Run the second query
        db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {

            if (error) {
                console.log(error);
                res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
            })
        });


app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
    
    let address = data.address;
    let customer = parseInt(data.name);  // Assuming 'name' is customerID
    let email = data.email;
    let phone = data.phone;
    console.log(address);
    console.log(customer);
    
    let queryUpdateCustomer = `UPDATE Customers SET email = ?, address = ?, phone = ? WHERE customerID = ?`;
    //let selectAddress = `SELECT * FROM Customers WHERE customerID = ?`  // from starter app, where planets is a table, no need in customers for second query
    
        // Run the 1st query
        db.pool.query(queryUpdateCustomer, [email, address, phone, customer], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                // After updating, fetch the updated customer data
                let queryGetUpdatedCustomer = `SELECT * FROM Customers WHERE customerID = ?`;
                db.pool.query(queryGetUpdatedCustomer, [customer], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        // Send back the updated customer data, including the address
                        //res.send(rows);
                        res.json(rows[0]); // send the updated row as the response
                    }
                });
            }
        });
    });

/*
    -----------ROUTES for Products Entity-----------
*/

app.get('/products', function(req, res)
    {  
        let query1 = "SELECT * FROM Products;";               // Define our query

        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Products;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let products = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the products
            let address = rows;
            return res.render('products', {data: products});  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query
});

app.post('/add-product-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data); // Log the request body for debugging

    // Create the query to insert the product
    const query1 = `
        INSERT INTO Products (name, description, price, stockLevel, productLocation) 
        VALUES ('${data.name}', '${data.description}', ${data.priceID}, ${data.stockID}, '${data.productLocation}')`;

    // Execute the query to insert the product
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error); // Log any errors
            res.status(400).send(error); // Send an error response
        } else {
            // Query to fetch all products after insertion
            const query2 = `SELECT * FROM Products`;
            db.pool.query(query2, function (error, rows) {
                if (error) {
                    console.log(error); // Log any errors
                    res.status(400).send(error); // Send an error response
                } else {
                    // Send all products as the response
                    res.status(200).send(rows);
                }
            });
        }
    });
});

app.delete('/delete-product-ajax/', function(req,res,next){
    let data = req.body;
    let productID = parseInt(data.id);
    console.log('Received productID:', data.id);
    let deleteProduct= `DELETE FROM Products WHERE productID = ?`;
  
          // Run the second query
          db.pool.query(deleteProduct, [productID], function(error, rows, fields) {
  
              if (error) {
                  console.log(error);
                  res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
              })
          });

app.put('/put-product-ajax', function (req, res, next) {
    let data = req.body;
    

    // Extract data from the request body
    let productID = parseInt(data.productID);
    let name = data.name;
    let description = data.description;
    let price = data.price;
    let stockLevel = data.stockLevel;
    let productLocation = data.productLocation;

    console.log('Updating product:', productID, name, price, stockLevel, productLocation);

    // SQL query to update the product
    let queryUpdateProduct = `
        UPDATE Products 
        SET name = ?, description = ?, price = ?, stockLevel = ?, productLocation = ? 
        WHERE productID = ?`;

    db.pool.query(queryUpdateProduct, [name, description, price, stockLevel, productLocation, productID], function (error, rows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(400);
        } else {
            // Fetch the updated product data
            let queryGetUpdatedProduct = `SELECT * FROM Products WHERE productID = ?`;
            db.pool.query(queryGetUpdatedProduct, [productID], function (error, rows, fields) {
                if (error) {
                    console.error(error);
                    res.sendStatus(400);
                } else {
                    // Send the updated product data as the response
                    res.json(rows[0]); // Return the updated product as JSON
                }
            });
        }
    });
});

/*
    -----------ROUTES for Orders Entity-----------
*/
app.get('/orders', function(req, res)
{  // Define 1st query
    let query1 = "SELECT *, DATE_FORMAT(orderDate, '%Y-%m-%d') AS formatted_order_date FROM Orders;"; 
        

    // Query 2 for Customers drop-down menu
    let query2 = "SELECT * FROM Customers;";

    // Query 3 for Robots drop-down menu
    let query3 = "SELECT * FROM Robots WHERE status = 'available';";

    // Query 4 for ShipmentContainers drop-down men
    let query4 = "SELECT * FROM ShipmentContainers WHERE isFilled = 0;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
    
    // Save the people
    let orders = rows;
    
    // Run the second query
    db.pool.query(query2, (error, rows, fields) => {
        
        // Save the customers
        let customers = rows;

        db.pool.query(query3, (error, rows, fields) => {
        
            // Save the robots
            let robots = rows;
     
            db.pool.query(query4, (error, rows, fields) => {
        
                // Save the containers
                let shipmentContainers = rows;
         
                return res.render('orders', {data: orders, customers: customers, robots: robots, shipmentContainers: shipmentContainers});  
                })  
            })     
        })                                                    
    });                                                        
});

app.delete('/delete-order-ajax/', function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.id);
    let deleteOrder= `DELETE FROM Orders WHERE orderID = ?`;
  
          // Run the second query
          db.pool.query(deleteOrder, [orderID], function(error, rows, fields) {
  
              if (error) {
                  console.log(error);
                  res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
              })
          });

app.post('/add-order-ajax', function(req, res) {
    // Log the incoming request body to ensure it's correct
    console.log(req.body);  // Log the request body
        
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data.date);

    // Capture NULL values
    let robotID = parseInt(data.robotID)
    if(isNaN(robotID))
    {
        robotID = null;
    }

    // Use parameterized query to insert data
    const query1 = `
        INSERT INTO Orders (customerID, orderDate, robotID, containerID, shippingStatus) 
        VALUES (?, ?, ?, ?, ?)`;
    const query1Params = [data.customerID, data.orderDate, robotID, data.containerID, data.shippingStatus];

    // Execute the query
    db.pool.query(query1, query1Params, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.status(400).send(error);
        } else {
            // Fetch all orders after insertion
            const query2 = `SELECT * FROM Orders`;
            db.pool.query(query2, function (error, rows) {
                if (error) {
                    console.log(error);
                    res.status(400).send(error);
                } else {
                    res.status(200).send(rows);
                }
            });
        }
    });
});


app.put('/put-order-ajax', function (req, res, next) {
    let data = req.body;
    console.log(data);
    
    // Extract data from the request body
    let orderID = parseInt(data.orderID);
    let customerID = parseInt(data.customerID);
    let orderDate = data.orderDate;
    let robotID = parseInt(data.robotID); // Parse robotID to integer
    if (isNaN(robotID)) {
        robotID = null; // Set robotID to NULL if not a valid number
    }
    let containerID = parseInt(data.containerID);
    let shippingStatus = data.shippingStatus;
        
        console.log('Updating order:', orderID, customerID, orderDate, robotID, containerID, shippingStatus);
        
            // SQL query to update the order
        let queryUpdateOrder = `
            UPDATE Orders 
            SET customerID = ?, orderDate = ?, robotID = ?, containerID = ?, shippingStatus = ? 
            WHERE orderID = ?`;
    
        db.pool.query(queryUpdateOrder, [customerID, orderDate, robotID, containerID, shippingStatus, orderID], function (error, rows, fields) {
            if (error) {
                console.error(error);
                res.sendStatus(400);
            } else {
                    // Fetch the updated order data
                let queryGetUpdatedOrder = `SELECT * FROM Orders WHERE orderID = ?`;
                db.pool.query(queryGetUpdatedOrder, [orderID], function (error, rows, fields) {
                    if (error) {
                        console.error(error);
                        res.sendStatus(400);
                    } else {
                            // Send the updated order data as the response
                        res.json(rows[0]); // Return the updated order as JSON
                    }
                });
            }
        });
    });
    

/*
    -----------ROUTES for OrdersProducts Entity-----------
*/
app.get('/ordersProducts', function (req, res) {
    // Define the queries
    let query1 = "SELECT op.orderProductID, o.orderID, op.productID, p.name AS productName, op.quantity FROM Orders o JOIN OrdersProducts op ON o.orderID = op.orderID JOIN Products p ON op.productID = p.productID ORDER BY op.orderProductID;";
    // Query 2 for Orders drop-down menu
    let query2 = "SELECT * FROM Orders;";
    // Query 2 for Products drop-down menu
    let query3 = "SELECT * FROM Products;";

    // Run the first query
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Save the data from the first query
        let ordersProducts = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Save the data from the second query (optional, could use for related data)
            let orders = rows;

            // Run the 3rd query
            db.pool.query(query3, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                }

                // Save the data from the second query (optional, could use for related data)
                let products = rows;

                // Render the 'shipmentContainers' Handlebars file with the data
                return res.render('ordersProducts', { data: ordersProducts, orders:orders, products: products});
            });
        });
    });
});                                                        // received back from the query

app.post('/add-product-to-order-ajax', function(req, res) 
{
    //console.log(req.body);  // Log the request body to ensure it's correct
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);
      
    // Create the query and run it on the database
    query1 = `INSERT INTO OrdersProducts (orderID, productID, quantity) 
                VALUES ('${data.orderID}', '${data.productID}', '${data.quantity}')`;
        db.pool.query(query1, function(error, rows, fields) {
            // Check for errors
            if (error) {
                console.log(error);
                // Send an error response using res.send
                res.status(400)
            } else {
                let query2 = `
                SELECT op.orderProductID, op.orderID, op.productID, op.quantity, Products.name
                FROM OrdersProducts op
                JOIN Products ON op.productID = Products.productID
                WHERE op.orderID = '${data.orderID}'`;
                db.pool.query(query2, function(error, rows) {
                    if (error) {
                        console.log(error);
                        res.status(400);
                    } else {
                        // Send the newly added customer as the response
                        res.status(200).send(rows);
                    }
                });
            }
        });
    });

app.delete('/delete-product-from-order-ajax/', function(req, res, next) {
    let data = req.body;
    let orderProductID = parseInt(data.id);
    console.log('Received orderProductID:', data.id);
    
    // SQL query to delete a orderProduct by ID
    let deleteOrderProduct = `DELETE FROM OrdersProducts WHERE orderProductID = ?`;
    
    // Execute the delete query
    db.pool.query(deleteOrderProduct, [orderProductID], function(error, rows, fields) {
        if (error) {
            console.error("Error deleting orderProduct:", error);
            res.sendStatus(400); // Send error status if query fails
        } else {
            res.sendStatus(204); // Send 'No Content' status when successful
        }
    });
});

app.put('/put-order-product-ajax', function (req, res, next) {
    let data = req.body;
    //console.log(data)
    // Extract data from the request body
    let orderProductID = parseInt(data.orderProductID);
    let orderID = parseInt(data.orderID); // New: Extract orderID
    let productID = parseInt(data.productID); // New: Extract productID
    let quantity = parseInt(data.quantity);
    // order id to add
    // product id to add
    
    //console.log('Updating order product:', orderProductID, orderID, productID, quantity);
    
        // SQL query to update the quantity
        // change with orde and product id
    let queryUpdate = `
        UPDATE OrdersProducts 
        SET orderID = ?, productID = ?, quantity = ?
        WHERE orderProductID = ?`; // Identify row by orderProductID
    
        db.pool.query(queryUpdate, [orderID, productID, quantity, orderProductID], function (error, rows, fields) {
            if (error) {
                console.error(error);
                res.sendStatus(400);
            } else {
                // get updated data, including the product name
                let queryUpdated = `
                SELECT op.orderProductID, op.orderID, op.productID, op.quantity, Products.name
                FROM OrdersProducts op
                JOIN Products ON op.productID = Products.productID
                WHERE op.orderProductID = ?`;
                db.pool.query(queryUpdated, [orderProductID], function (error, rows, fields) {
                    if (error) {
                        console.error(error);
                        res.sendStatus(400);
                    } else {
                        // Send updated quantity data as response
                        res.json(rows[0]);
                    }
                });
            }
        });
    });

/*

/*
    -----------ROUTES for Robots Entity-----------
*/
app.get('/robots', function (req, res) {
    // Define the queries
    let query1 = "SELECT * FROM Robots;";
    let query2 = "SELECT * FROM Robots;";

    // Run the first query
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Save the data from the first query
        let robots = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Save the data from the second query (optional, could use for related data)
            let extraData = rows;

            // Render the 'shipmentContainers' Handlebars file with the data
            return res.render('robots', { data: robots });
        });
    });
});                                                        // received back from the query

app.post('/add-robot-ajax', function(req, res) 
{
    //console.log(req.body);  // Log the request body to ensure it's correct
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);
      
    // Create the query and run it on the database
    query1 = `INSERT INTO Robots (status, currentLocation) 
                VALUES ('${data.status}', '${data.currentLocation}')`;
        db.pool.query(query1, function(error, rows, fields) {
            // Check for errors
            if (error) {
                console.log(error);
                // Send an error response using res.send
                res.status(400)
            } else {
                query2 = `SELECT * FROM Robots`;
                db.pool.query(query2, function(error, rows) {
                    if (error) {
                        console.log(error);
                        res.status(400);
                    } else {
                        // Send the newly added customer as the response
                        res.status(200).send(rows);
                    }
                });
            }
        });
    });

    app.delete('/delete-robot-ajax/', function(req, res, next) {
        let data = req.body;
        let robotID = parseInt(data.id);
        console.log('Received robotID:', data.id);
    
        // SQL query to delete a robot by ID
        let deleteRobot = `DELETE FROM Robots WHERE robotID = ?`;
    
        // Execute the delete query
        db.pool.query(deleteRobot, [robotID], function(error, rows, fields) {
            if (error) {
                console.error("Error deleting robot:", error);
                res.sendStatus(400); // Send error status if query fails
            } else {
                res.sendStatus(204); // Send 'No Content' status when successful
            }
        });
    });

app.put('/put-robot-ajax', function (req, res, next) {
    let data = req.body;
    
    // Extract data from the request body
    let robotID = parseInt(data.robotID);
    let status = data.status;  // 'isFilled' field instead of 'status'
    let currentLocation = data.currentLocation;
    
    console.log('Updating robot:', robotID, status, currentLocation);
    
        // SQL query to update the robot
        let queryUpdateRobot = `
            UPDATE Robots 
            SET status = ?, currentLocation = ? 
            WHERE robotID = ?`;
    
        db.pool.query(queryUpdateRobot, [status, currentLocation, robotID], function (error, rows, fields) {
            if (error) {
                console.error(error);
                res.sendStatus(400);
            } else {
                // Fetch the updated robot data
                let queryGetUpdatedRobot = `SELECT * FROM Robots WHERE robotID = ?`;
                db.pool.query(queryGetUpdatedRobot, [robotID], function (error, rows, fields) {
                    if (error) {
                        console.error(error);
                        res.sendStatus(400);
                    } else {
                        // Send the updated robot data as the response
                        res.json(rows[0]); // Return the updated robot as JSON
                    }
                });
            }
        });
    });

    /*


/*
    -----------ROUTES for shipmentContainers Entity-----------
*/
app.get('/shipmentContainers', function (req, res) {
    // Define the queries
    let query1 = "SELECT * FROM ShipmentContainers;";
    let query2 = "SELECT * FROM ShipmentContainers;";

    // Run the first query
    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Save the data from the first query
        let containers = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Save the data from the second query (optional, could use for related data)
            let extraData = rows;

            // Render the 'shipmentContainers' Handlebars file with the data
            return res.render('shipmentContainers', { data: containers });
        });
    });
});

app.post('/add-container-ajax', function(req, res) {
    // Log the incoming request body to ensure it's correct
    console.log(req.body);  // Log the request body

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Create the query to insert a new container into the 'ShipmentContainers' table
    query1 = `INSERT INTO ShipmentContainers (isFilled, location) 
              VALUES ('${data.isFilled}', '${data.location}')`;

    // Run the query to insert the data
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            // Send an error response if something goes wrong with the insert
            res.status(400).send({ error: 'Error inserting container' });
        } else {
            // Once the container is inserted, fetch all containers from the database
            query2 = `SELECT * FROM ShipmentContainers`;
            db.pool.query(query2, function(error, rows) {
                if (error) {
                    console.log(error);
                    // Send an error response if something goes wrong with the select query
                    res.status(400).send({ error: 'Error fetching containers' });
                } else {
                    // Send the updated list of containers as the response
                    res.status(200).send(rows);
                }
            });
        }
    });
});

app.delete('/delete-container-ajax/', function(req, res, next) {
    let data = req.body;
    let containerID = parseInt(data.id);
    console.log('Received containerID:', data.id);

    // SQL query to delete a container by ID
    let deleteContainer = `DELETE FROM ShipmentContainers WHERE containerID = ?`;

    // Execute the delete query
    db.pool.query(deleteContainer, [containerID], function(error, rows, fields) {
        if (error) {
            console.error("Error deleting container:", error);
            res.sendStatus(400); // Send error status if query fails
        } else {
            res.sendStatus(204); // Send 'No Content' status when successful
        }
    });
});

app.put('/put-container-ajax', function (req, res, next) {
    let data = req.body;

    // Extract data from the request body
    let containerID = parseInt(data.containerID);
    let isFilled = data.isFilled;  // 'isFilled' field instead of 'status'
    let location = data.location;

    console.log('Updating container:', containerID, isFilled, location);

    // SQL query to update the container
    let queryUpdateContainer = `
        UPDATE ShipmentContainers 
        SET isFilled = ?, location = ? 
        WHERE containerID = ?`;

    db.pool.query(queryUpdateContainer, [isFilled, location, containerID], function (error, rows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(400);
        } else {
            // Fetch the updated container data
            let queryGetUpdatedContainer = `SELECT * FROM ShipmentContainers WHERE containerID = ?`;
            db.pool.query(queryGetUpdatedContainer, [containerID], function (error, rows, fields) {
                if (error) {
                    console.error(error);
                    res.sendStatus(400);
                } else {
                    // Send the updated container data as the response
                    res.json(rows[0]); // Return the updated container as JSON
                }
            });
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

