// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Function to delete a orderProduct by sending a DELETE request
function deleteOrderProduct(orderProductID) {
  let link = '/delete-product-from-order-ajax/';
  let data = {
      id: orderProductID
  };

  // Send the DELETE request using jQuery's ajax method
  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
          // If the delete request is successful, remove the row from the table and dropdown
          deleteRow(orderProductID);
          deleteDropDownMenu(orderProductID);
      },
      error: function(err) {
          console.log('Error deleting product from order:', err);
      }
  });
}

// Function to delete the orderProduct's row from the table
function deleteRow(orderProductID) {
  let table = document.getElementById("order-product-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
      // Find the row with the matching orderProductID and remove it
      if (table.rows[i].getAttribute("data-value") == orderProductID) {
          table.deleteRow(i);
          break;
      }
  }
}

// Function to delete the orderProductID from the dropdown menu
function deleteDropDownMenu(orderProductID) {
  let selectMenu = document.getElementById("mySelectProductOrderUpdate");
  for (let i = 0; i < selectMenu.length; i++) {
      // Find the option with the matching orderProductID and remove it
      if (Number(selectMenu.options[i].value) === Number(orderProductID)) {
          selectMenu[i].remove();
          break;
      }
  }
}