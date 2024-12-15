// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let updateOrderProductForm = document.getElementById('update-product-quantity-form-ajax');

// Modify the objects we need
updateOrderProductForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderProductID = document.getElementById("mySelectProductOrderUpdate");
    let inputOrderID = document.getElementById("mySelectOrderIDUpdate");
    let inputProductID = document.getElementById("mySelectProductIDUpdate");
    let inputQuantity = document.getElementById("update-quantity");


    // Get the values from the form fields
    let orderProductIDValue = inputOrderProductID.value;
    let orderIDValue = inputOrderID.value;
    let productIDValue = inputProductID.value;
    let quantityValue = inputQuantity.value;

    // Create the data object to send in the request
    let data = {
        orderProductID: orderProductIDValue,
        orderID: orderIDValue,
        productID: productIDValue,
        quantity: quantityValue,
    };
    console.log("dAta to send:", data);
    
    // Setup our AJAX request to update the quantity
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle the response when the update is successful
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the updated data to the table
            updateRow(xhttp.response, orderProductIDValue);

            // Clear the input fields for another transaction
            inputOrderProductID.value = '';
            inputOrderID.value = '';
            inputProductID.value = '';
            inputQuantity.value = '';
            showBrowse();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Status:", xhttp.status);
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Pre-filled update form fields when user chooses a robot from drop-down menu
const dropDownMenu = document.getElementById('mySelectProductOrderUpdate');

dropDownMenu.addEventListener("change", e => {
    e.preventDefault();

    let orderProductID = e.target.value;

    let tableRows = document.getElementById("order-product-table").rows;

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === orderProductID;
    });

    let inputOrderID = document.getElementById("mySelectOrderIDUpdate");
    let inputProductID = document.getElementById("mySelectProductIDUpdate");
    let inputQuantity = document.getElementById("update-quantity");


    // Populate the fields with the current data
    inputOrderID.value = currentRow.cells[1].textContent
    let productID = currentRow.cells[2].textContent.split(' - ')[0]; // Get only the productID from the text content
    inputProductID.value = productID;
    inputQuantity.value = currentRow.cells[3].textContent

});

// Function to update the row in the table with the new data
function updateRow(data, orderProductID) {
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let table = document.getElementById("order-product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == orderProductID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get the table cells
            let tdOrderID = updateRowIndex.getElementsByTagName("td")[1]; 
            let tdProductID = updateRowIndex.getElementsByTagName("td")[2]; 
            let tdQuantity = updateRowIndex.getElementsByTagName("td")[3]; 


            // Reassign updated values to each td element
            tdOrderID.innerHTML = parsedData.orderID;
            tdProductID.innerHTML = `${parsedData.productID} - ${parsedData.name}`;
            tdQuantity.innerHTML = parsedData.quantity; 
        }
    }
}

// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update');
cancelButton.addEventListener("click", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    const myform = document.getElementById('update-product-quantity-form-ajax');
    myform.reset(); // Reset the form inputs
});
