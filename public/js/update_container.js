// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let updateContainerForm = document.getElementById('update-container-form-ajax');

// Modify the objects we need
updateContainerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputContainerID = document.getElementById("mySelect");
    let inputIsFilled = document.getElementById("update-isFilled");
    let inputLocation = document.getElementById("update-location");

    // Get the values from the form fields
    let containerIDValue = inputContainerID.value;
    let isFilledValue = inputIsFilled.value; // This should be either '1' or '0'
    let locationValue = inputLocation.value;

    // Check if the container ID is valid (ensure it's selected)
    if (!containerIDValue || !isFilledValue || !locationValue) {
        alert("Please fill in all the fields.");
        return;
    }

    // Create the data object to send in the request
    let data = {
        containerID: containerIDValue,
        isFilled: isFilledValue,
        location: locationValue
    };
    console.log(data);
    
    // Setup our AJAX request to update the container
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-container-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Handle the response when the update is successful
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the updated data to the table
            updateRow(xhttp.response, containerIDValue);

            // Clear the input fields for another transaction
            inputContainerID.value = '';
            inputIsFilled.value = '';
            inputLocation.value = '';
            showBrowse();
            
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input. Status:", xhttp.status);
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Pre-filled update form fields when user chooses a container from drop-down menu
const dropDownMenu = document.getElementById('mySelect');

dropDownMenu.addEventListener("change", e => {
    e.preventDefault();

    let containerID = e.target.value;

    let tableRows = document.getElementById("shipment-container-table").rows;

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === containerID;
    });

    let inputIsFilled = document.getElementById("update-isFilled");
    let inputLocation = document.getElementById("update-location");

    console.log(currentRow.cells[1].textContent.trim());
    // Populate the fields with the current data
    inputIsFilled.value = currentRow.cells[1].textContent.trim() === 'Filled' ? '1' : '0'; // Ensure it matches '1' or '0'
    inputLocation.value = currentRow.cells[2].textContent.trim();
});

// Function to update the row in the table with the new data
function updateRow(data, containerID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("shipment-container-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == containerID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get the table cells
            let tdIsFilled = updateRowIndex.getElementsByTagName("td")[1]; 
            let tdLocation = updateRowIndex.getElementsByTagName("td")[2]; 

            // Reassign updated values to each td element
            tdIsFilled.innerHTML = parsedData.isFilled === 1 ? 'Filled' : 'Not Filled'; // Display '1' or '0' as per the database
            tdLocation.innerHTML = parsedData.location;
        }
    }
}

// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update');
cancelButton.addEventListener("click", function (e) {
    // Prevent the form from submitting
    e.preventDefault();
    const myform = document.getElementById('update-container-form-ajax');
    myform.reset(); // Reset the form inputs
});
