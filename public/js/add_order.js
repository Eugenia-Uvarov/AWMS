// All code is based on the CS 340 starter code:
// Date: 11/25/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-ajax');
// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelectCustomer");
    let inputDate = document.getElementById("input-date");
    let inputRobot = document.getElementById("mySelectRobot");
    let inputContainer = document.getElementById("mySelectContainer");
    let inputShipingStatus = document.getElementById("input-shipping-status");

    
    
    // Get the values from the form fields
    let nameValue = inputName.value;
    let dateValue = inputDate.value;
    let robotValue = inputRobot.value;
    let containerValue = inputContainer.value;
    let shippingValue = inputShipingStatus.value;
    // Put our data we want to send in a javascript object
    let data = {
        customerID: nameValue,
        orderDate: dateValue,
        robotID: robotValue,
        containerID: containerValue,
        shippingStatus: shippingValue
    }
    
    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputDate.value = '';
            inputRobot.value = '';
            inputContainer.value = '';
            inputShipingStatus.value = '';
            showBrowse();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("order-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]
    console.log(newRow);
    console.log(parsedData);  // Log the parsed data to see if 'name' is included

    
    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let dateCell = document.createElement("TD");
    let robotCell = document.createElement("TD");
    let containerCell = document.createElement("TD");
    let shippingCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");
    


    // Fill the cells with correct data
    idCell.innerText = newRow.orderID;
    nameCell.innerText = newRow.customerID;
    // dateCell.innerText = newRow.orderDate;
    robotCell.innerText = newRow.robotID;
    containerCell.innerText = newRow.containerID;
    shippingCell.innerText = newRow.shippingStatus;

    // format the new added date
    let newDate = newRow.orderDate.split('T')[0];
    // console.log("orderdate: ",newDate);
    dateCell.innerText = newDate;
    // added for delete, so each new row gets a working delete button
    deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.orderID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(robotCell);
    row.appendChild(containerCell);
    row.appendChild(shippingCell);
    deleteCell.appendChild(deleteButton)
    row.appendChild(deleteCell);
    console.log(nameCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.orderID);

    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelectOrder");
    let option = document.createElement("option");
    option.text = newRow.orderID;
    option.value = newRow.orderID;
    selectMenu.add(option);
}

// Cancel button resets the form
const cancelBtn = document.getElementById('cancel-btn-add')
cancelBtn.addEventListener("click", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    const myform = document.getElementById('add-order-ajax')
    myform.reset() 
})

// Show/Hide Div Functions
function showBrowse() {
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none';
    document.getElementById('update').style.display = 'none';

  }

  function showInsert() {
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'block';
    document.getElementById('update').style.display = 'none';
  }

  function showUpdate() {
    document.getElementById('browse').style.display = 'block';
    document.getElementById('insert').style.display = 'none';
    document.getElementById('update').style.display = 'block';

  }