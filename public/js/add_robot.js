// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let addRobotForm = document.getElementById('add-robot-ajax');
// Modify the objects we need
addRobotForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStatus = document.getElementById("input-isAvaliable");
    let inputLocation = document.getElementById("input-robot-location");


    // Get the values from the form fields
    let statusValue = inputStatus.value;
    let currentLocationValue = inputLocation.value;

    // Put our data we want to send in a javascript object
    let data = {
        status: statusValue,
        currentLocation: currentLocationValue,
    }
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-robot-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputStatus.value = '';
            inputLocation.value = '';
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
// Robots
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("robot-table");

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
    let statusCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.robotID;
    statusCell.innerText = newRow.status;
    locationCell.innerText = newRow.currentLocation;

    // added for delete, so each new row gets a working delete button
    deleteButton = document.createElement("button");

    deleteButton.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteRobot(newRow.robotID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(statusCell);
    row.appendChild(locationCell);
    deleteCell.appendChild(deleteButton)
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.robotID);

    // Add the row to the table
    currentTable.appendChild(row);

    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelectRobot"); 
    let option = document.createElement("option");
    option.text = newRow.robotID;
    option.value = newRow.robotID;
    selectMenu.add(option);
}


// Cancel button resets the form
const cancelBtn = document.getElementById('cancel-btn-add')
cancelBtn.addEventListener("click", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    const myform = document.getElementById('add-robot-ajax')
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

