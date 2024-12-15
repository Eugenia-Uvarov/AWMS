// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Function to delete a robot by sending a DELETE request
function deleteRobot(robotID) {
    let link = '/delete-robot-ajax/';
    let data = {
        id: robotID
    };

    // Send the DELETE request using jQuery's ajax method
    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // If the delete request is successful, remove the row from the table and dropdown
            deleteRow(robotID);
            deleteDropDownMenu(robotID);
        },
        error: function(err) {
            console.log('Error deleting robot:', err);
        }
    });
}

// Function to delete the robot's row from the table
function deleteRow(robotID) {
    let table = document.getElementById("robot-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        // Find the row with the matching robotID and remove it
        if (table.rows[i].getAttribute("data-value") == robotID) {
            table.deleteRow(i);
            break;
        }
    }
}

// Function to delete the robot from the dropdown menu
function deleteDropDownMenu(robotID) {
    let selectMenu = document.getElementById("mySelectRobot");
    for (let i = 0; i < selectMenu.length; i++) {
        // Find the option with the matching robotID and remove it
        if (Number(selectMenu.options[i].value) === Number(robotID)) {
            selectMenu[i].remove();
            break;
        }
    }
}
