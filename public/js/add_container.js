// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let addContainerForm = document.getElementById('add-container-ajax');

// Modify the objects we need
addContainerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIsFilled = document.getElementById("input-isFilled");
    let inputLocation = document.getElementById("input-location");

    // Get the values from the form fields
    let isFilledValue = inputIsFilled.value; // Use 1 for true, 0 for false
    let locationValue = inputLocation.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        isFilled: isFilledValue,
        location: locationValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-container-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputIsFilled.value = "";
            inputLocation.value = "";
            showBrowse();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from ShipmentContainers
function addRowToTable(data) {
    // Get a reference to the current table on the page
    let currentTable = document.getElementById("shipment-container-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let isFilledCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.containerID;
    //isFilledCell.innerText = newRow.isFilled; // Directly display 1 or 0
    isFilledCell.innerText = newRow.isFilled === 1 ? 'Filled' : 'Not Filled';
    locationCell.innerText = newRow.location;

    // Add a delete button for the new row
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
        deleteContainer(newRow.containerID);
    };

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(isFilledCell);
    row.appendChild(locationCell);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find the newly added row
    row.setAttribute("data-value", newRow.containerID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Get the dropdown menu element
    let selectMenu = document.getElementById("mySelect");

    // Create a new option element for the dropdown
    let option = document.createElement("option");
    option.text = newRow.containerID;
    option.value = newRow.containerID;

    // Add the new option to the dropdown
    selectMenu.add(option);
}


// Cancel button resets the form
const cancelBtn = document.getElementById('cancel-btn-add');
cancelBtn.addEventListener("click", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    const myForm = document.getElementById('add-container-ajax');
    myForm.reset();
});

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
