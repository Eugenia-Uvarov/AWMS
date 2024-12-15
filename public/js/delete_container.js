// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 


// Function to delete a container by sending a DELETE request
function deleteContainer(containerID) {
    let link = '/delete-container-ajax/';
    let data = {
        id: containerID
    };

    // Send the DELETE request using jQuery's ajax method
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // If the delete request is successful, remove the row from the table and dropdown
            deleteRow(containerID);
            deleteDropDownMenu(containerID);
        },
        error: function(err) {
            console.log('Error deleting container:', err);
        }
    });
}

// Function to delete the container's row from the table
function deleteRow(containerID) {
    let table = document.getElementById("shipment-container-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Find the row with the matching containerID and remove it
        if (table.rows[i].getAttribute("data-value") == containerID) {
            table.deleteRow(i);
            break;
        }
    }
}

// Function to delete the container from the dropdown menu
function deleteDropDownMenu(containerID) {
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++) {
        // Find the option with the matching containerID and remove it
        if (Number(selectMenu.options[i].value) === Number(containerID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
