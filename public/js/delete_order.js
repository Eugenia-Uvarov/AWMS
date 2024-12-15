// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Function to delete an Order by sending a DELETE request
function deleteOrder(orderID) {
    let link = '/delete-order-ajax/';
    let data = {
      id: orderID
    };

    // Send the DELETE request using jQuery's ajax method
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        // If the delete request is successful, remove the row from the table and dropdown
        deleteRow(orderID);
        deleteDropDownMenu(orderID);
      }
    });
  }
  
// Function to delete the order's row from the table
function deleteRow(orderID){
  let table = document.getElementById("order-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    // Find the row with the matching orderID and remove it
    if (table.rows[i].getAttribute("data-value") == orderID) {
      table.deleteRow(i);
      break;
    }
   }
  }

// Function to delete the order's row from the table
function deleteDropDownMenu(orderID){
    let selectMenu = document.getElementById("mySelectOrder");
    for (let i = 0; i < selectMenu.length; i++){
          // Find the row with the matching orderID and remove it
        if (Number(selectMenu.options[i].value) === Number(orderID)){
            selectMenu[i].remove();
            break;
        } 
    }
}