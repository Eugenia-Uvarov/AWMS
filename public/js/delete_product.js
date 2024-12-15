// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Function to delete a product by sending a DELETE request
function deleteProduct(productID) {
  let link = '/delete-product-ajax/';
  let data = {
    id: productID
  };

  // Send the DELETE request using jQuery's ajax method
  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      // If the delete request is successful, remove the row from the table and dropdown
      deleteRow(productID);
      deleteDropDownMenu(productID);
    }
  });
}

// Function to delete the product's row from the table
function deleteRow(productID){
    let table = document.getElementById("product-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
      // Find the row with the matching productID and remove it
       if (table.rows[i].getAttribute("data-value") == productID) {
            table.deleteRow(i);
            break;
       }
    }
}

// Function to delete the productID from the dropdown menu
  function deleteDropDownMenu(productID){
      let selectMenu = document.getElementById("mySelectProduct");
      for (let i = 0; i < selectMenu.length; i++){
      // Find the option with the matching productID and remove it
      if (Number(selectMenu.options[i].value) === Number(productID)){
          selectMenu[i].remove();
          break;
      } 
  }
}