// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get ]objects ]to modify
let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects]
updateOrderForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields to get data from
    let inputOrderID = document.getElementById("mySelectOrder");
    let inputCustomerID = document.getElementById("mySelectCustomerUpdate");
    let inputDate = document.getElementById("input-date-update");
    let inputRobotID = document.getElementById("mySelectRobotUpdate");
    let inputContainerID = document.getElementById("mySelectContainerUpdate");
    let inputShippingStatus = document.getElementById("input-shipping-status-update");


    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let customerIDValue = inputCustomerID.value;
    let dateValue = inputDate.value;
    let robotIDValue = inputRobotID.value;
    let containerIDValue = inputContainerID.value;
    let shippingStatusValue = inputShippingStatus.value;

    // Put data to send in a JavaScript object
    let data = {
        orderID: orderIDValue,
        customerID: customerIDValue,
        orderDate: dateValue,
        robotID: robotIDValue,
        containerID: containerIDValue,
        shippingStatus: shippingStatusValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, orderIDValue);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputCustomerID.value = '';
            inputDate.value = '';
            inputRobotID.value = '';
            inputContainerID.value = '';
            inputShippingStatus.value = '';
            showBrowse();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Pre-filled update form fields when user chooses a robot from drop-down menu
const dropDownMenu = document.getElementById('mySelectOrder');

dropDownMenu.addEventListener("change", e => {
    e.preventDefault();

    let orderID = e.target.value;

    let tableRows = document.getElementById("order-table").rows;

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === orderID;
    });

    let inputCustomerID = document.getElementById("mySelectCustomerUpdate");
    let inputDate = document.getElementById("input-date-update");
    let inputRobotID = document.getElementById("mySelectRobotUpdate");
    let inputContainerID = document.getElementById("mySelectContainerUpdate");
    let inputShippingStatus = document.getElementById("input-shipping-status-update");

    // Populate the fields with the current data
    inputCustomerID.value = currentRow.cells[1].textContent
    inputDate.value = currentRow.cells[2].textContent
    inputRobotID.value = currentRow.cells[3].textContent
    inputContainerID.value = currentRow.cells[4].textContent
    inputShippingStatus.value = currentRow.cells[5].textContent

});



function updateRow(data, orderID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("order-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Find the row matching the order ID
        if (table.rows[i].getAttribute("data-value") == orderID) {
            // Get the location of the row where we found the matching order ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td elements
            let tdCustomerID = updateRowIndex.getElementsByTagName("td")[1]; // Name column
            let tdDate = updateRowIndex.getElementsByTagName("td")[2]; // Description column
            let tdRobotID = updateRowIndex.getElementsByTagName("td")[3];
            let tdContainerID = updateRowIndex.getElementsByTagName("td")[4];
            let tdShippingStatus = updateRowIndex.getElementsByTagName("td")[5];          

            // Reassign updated values to each td element
            tdCustomerID.innerHTML = parsedData.customerID;
            tdDate.innerHTML = parsedData.orderDate;

            // console.log("parsed date: ", parsedData.orderDate)
            let newDate = parsedData.orderDate.split('T')[0];
            // console.log("orderdate: ",newDate);
            tdDate.innerHTML = newDate;


            tdRobotID.innerHTML = parsedData.robotID;
            tdContainerID.innerHTML = parsedData.containerID;
            tdShippingStatus.innerHTML = parsedData.shippingStatus;
        }
    }
}


// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update')
cancelButton.addEventListener("click", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    const myform3 = document.getElementById('update-order-form-ajax')
    myform3.reset() 
})