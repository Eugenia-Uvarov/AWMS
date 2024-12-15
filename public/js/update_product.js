// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get ]objects ]to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects]
updateProductForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields] to get data from
    let inputProductID = document.getElementById("mySelectProduct");
    let inputName = document.getElementById("input-name-update");
    let inputDescription = document.getElementById("input-description-update");
    let inputPrice = document.getElementById("input-price-update");
    let inputStockLevel = document.getElementById("input-stockLevel-update");
    let inputLocation = document.getElementById("input-location-update");

    // Get the values from the form fields
    let productIDValue = inputProductID.value;
    let nameValue = inputName.value;
    let descriptionValue = inputDescription.value;
    let priceValue = parseFloat(inputPrice.value);
    let stockLevelValue = parseInt(inputStockLevel.value);
    let locationValue = inputLocation.value;

    // Put data to send in a JavaScript object
    let data = {
        productID: productIDValue,
        name: nameValue,
        description: descriptionValue,
        price: priceValue,
        stockLevel: stockLevelValue,
        productLocation: locationValue,
    };

    // Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, productIDValue);

            // Clear the input fields for another transaction
            inputProductID.value = '';
            inputName.value = '';
            inputDescription.value = '';
            inputPrice.value = '';
            inputStockLevel.value = '';
            inputLocation.value = '';
            showBrowse();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// pre-filled update form fields when user chose customer from drop-down menu
const dropDownMenu = document.getElementById('mySelectProduct');

dropDownMenu.addEventListener("change", e=>{
    e.preventDefault()
    // console.log(e.target.value)
    let product_id = e.target.value

    let tableRows = document.getElementById("product-table").rows

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === product_id
    })
    
    let inputName = document.getElementById("input-name-update");
    let inputDescription = document.getElementById("input-description-update");
    let inputPrice = document.getElementById("input-price-update");
    let inputStockLevel = document.getElementById("input-stockLevel-update");
    let inputLocation = document.getElementById("input-location-update");
 
    inputName.value =  currentRow.cells[1].textContent
    inputDescription.value =  currentRow.cells[2].textContent
    inputPrice.value = currentRow.cells[3].textContent
    inputStockLevel.value = currentRow.cells[4].textContent
    inputLocation.value = currentRow.cells[5].textContent
})


function updateRow(data, productID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Find the row matching the product ID
        if (table.rows[i].getAttribute("data-value") == productID) {
            // Get the location of the row where we found the matching product ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td elements
            let tdName = updateRowIndex.getElementsByTagName("td")[1]; // Name column
            let tdDescription = updateRowIndex.getElementsByTagName("td")[2]; // Description column
            let tdPrice = updateRowIndex.getElementsByTagName("td")[3];
            let tdStockLevel = updateRowIndex.getElementsByTagName("td")[4];
            let tdLocation = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign updated values to each td element
            tdName.innerHTML = parsedData.name;
            tdDescription.innerHTML = parsedData.description;
            tdPrice.innerHTML = parsedData.price.toFixed(2);
            tdStockLevel.innerHTML = parsedData.stockLevel;
            tdLocation.innerHTML = parsedData.productLocation;
        }
    }
}// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update')
cancelButton.addEventListener("click", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    const myform2 = document.getElementById('update-product-form-ajax')
    myform2.reset() 
})