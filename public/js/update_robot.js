// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let updateRobotForm = document.getElementById('update-robot-form-ajax');

// Modify the objects we need
updateRobotForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRobotID = document.getElementById("mySelectRobot");
    let inputStatus = document.getElementById("update-isAvailable");
    let inputLocation = document.getElementById("update-currentLocation");

    // Get the values from the form fields
    let robotIDValue = inputRobotID.value;
    let statusValue = inputStatus.value;
    let currentLocationValue = inputLocation.value;

    // Check if the robot ID is valid (ensure it's selected)
    if (!robotIDValue || !statusValue || !currentLocationValue) {
        alert("Please fill in all the fields.");
        return;
    }

    // Create the data object to send in the request
    let data = {
        robotID: robotIDValue,
        status: statusValue,
        currentLocation: currentLocationValue
    };
    console.log(data);
    
    // Setup our AJAX request to update the robot
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-robot-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle the response when the update is successful
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the updated data to the table
            updateRow(xhttp.response, robotIDValue);

            // Clear the input fields for another transaction
            inputRobotID.value = '';
            inputStatus.value = '';
            inputLocation.value = '';
            showBrowse();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Status:", xhttp.status);
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Pre-filled update form fields when user chooses a robot from drop-down menu
const dropDownMenu = document.getElementById('mySelectRobot');

dropDownMenu.addEventListener("change", e => {
    e.preventDefault();

    let robotID = e.target.value;

    let tableRows = document.getElementById("robot-table").rows;

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === robotID;
    });

    let inputStatus = document.getElementById("update-isAvailable");
    let inputLocation = document.getElementById("update-currentLocation");

    // Populate the fields with the current data
    inputStatus.value = currentRow.cells[1].textContent
    inputLocation.value = currentRow.cells[2].textContent
});

// Function to update the row in the table with the new data
function updateRow(data, robotID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("robot-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == robotID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get the table cells
            let tdStatus = updateRowIndex.getElementsByTagName("td")[1]; 
            let tdLocation = updateRowIndex.getElementsByTagName("td")[2]; 

            // Reassign updated values to each td element
            tdStatus.innerHTML = parsedData.status;
            tdLocation.innerHTML = parsedData.currentLocation;
        }
    }
}

// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update');
cancelButton.addEventListener("click", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    const myform = document.getElementById('update-robot-form-ajax');
    myform.reset(); // Reset the form inputs
});
