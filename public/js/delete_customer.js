// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Function to delete a customer by sending a DELETE request
function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax/';
    let data = {
      id: customerID
    };

     // Send the DELETE request using jQuery's ajax method
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        // If the delete request is successful, remove the row from the table and dropdown
        deleteRow(customerID);
        deleteDropDownMenu(customerID);
      }
    });
  }

// Function to delete the customer's row from the table
function deleteRow(customerID){
  let table = document.getElementById("customer-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
    // Find the row with the matching customerID and remove it
    if (table.rows[i].getAttribute("data-value") == customerID) {
      table.deleteRow(i);
      break;
    }
   }
  }

  // Function to delete the customer from the dropdown menu
function deleteDropDownMenu(customerID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      // Find the option with the matching customerID and remove it
        if (Number(selectMenu.options[i].value) === Number(customerID)){
            selectMenu[i].remove();
            break;
        } 
    }
}