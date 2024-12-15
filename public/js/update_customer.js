// All code is based on the CS 340 starter code:
// Date: 11/19/2024
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let inputAddress = document.getElementById("input-address-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhone = document.getElementById("input-phone-update");

    console.log(inputAddress);

    // Get the values from the form fields
    let nameValue = inputName.value;
    let addressValue = inputAddress.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    console.log(addressValue);

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        address: addressValue,
        email: emailValue,
        phone: phoneValue,
    }
    console.log(data)
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, nameValue);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            inputPhone.value = '';
            showBrowse();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// pre-filled update form fields when user chose customer from drop-down menu
const dropDownMenu = document.getElementById('mySelect');

dropDownMenu.addEventListener("change", e=>{
    e.preventDefault()
    // console.log(e.target.value)
    let customer_id = e.target.value

    let tableRows = document.getElementById("customer-table").rows

    let currentRow = Array.from(tableRows).find(row => {
        return row.cells[0].textContent === customer_id
    })
    
    let inputAddress = document.getElementById("input-address-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhone = document.getElementById("input-phone-update");

 
    inputAddress.value =  currentRow.cells[3].textContent
    inputEmail.value = currentRow.cells[2].textContent
    inputPhone.value = currentRow.cells[4].textContent
})
// ------

function updateRow(data, name){
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    
    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == name) {

            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of address value
            let tdName = updateRowIndex.getElementsByTagName("td")[1]; // 'Name' is in the first column
            let tdEmail = updateRowIndex.getElementsByTagName("td")[2]; 
            let tdAddress = updateRowIndex.getElementsByTagName("td")[3]; 
            let tdPhone = updateRowIndex.getElementsByTagName("td")[4]; 

            console.log("Found row:", updateRowIndex);
            console.log("Name cell:", tdName);
            console.log("Email cell:", tdEmail);
            console.log("Address cell:", tdAddress);
            console.log("Phone cell:", tdPhone);

            // Reassign updated values to each td element
            tdName.innerHTML = parsedData.name;
            tdAddress.innerHTML = parsedData.address;
            tdEmail.innerHTML = parsedData.email;
            tdPhone.innerHTML = parsedData.phone;
       }
    }
}

// Cancel button resets the form
const cancelButton = document.getElementById('cancel-btn-update')
cancelButton.addEventListener("click", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();
    const myform2 = document.getElementById('update-customer-form-ajax')
    myform2.reset() 
})