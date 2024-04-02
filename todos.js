let add = document.getElementById("add");
let emptyMsg = document.getElementById("emptyMsg");
add.addEventListener("click", () => {
console.log("Updating list.....")
let title = document.getElementById("title").value.trim(); // Trim removes leading and trailing spaces
let desc = document.getElementById("description").value.trim();
// Check if both title and description are not empty
if (title !== "" && desc !== "") {
let itemJsonArray = [];
if (localStorage.getItem("itemsJson") !== null) {
    itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
}
itemJsonArray.push([title, desc]);
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
updateTable();
// Clear input fields
document.getElementById("title").value = "";
document.getElementById("description").value = "";
} else {
alert("Please fill out both title and description before adding.");
}
});


function updateTable() {
let tableBody = document.getElementById('tableBody');
let itemJsonArray = [];
if (localStorage.getItem("itemsJson") !== null) {
itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
}
let str = "";
if (itemJsonArray.length === 0) {
emptyMsg.style.display = "block";
} else {
emptyMsg.style.display = "none";
itemJsonArray.forEach((element, index) => {
    str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="edit(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button>
            </td>
        </tr>
    `;
});
}
tableBody.innerHTML = str; // Update the table body content
}


function edit(itemIndex) {
console.log("Edit", itemIndex);
let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
let editedTitle = prompt("Enter edited title", itemJsonArray[itemIndex][0]);
if (editedTitle !== null) {
let editedDescription = prompt("Enter edited description", itemJsonArray[itemIndex][1]);
if (editedDescription !== null) {
    itemJsonArray[itemIndex] = [editedTitle, editedDescription];
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    updateTable();
}
}
}

function deleted(itemIndex) {
console.log("Delete", itemIndex);
let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
itemJsonArray.splice(itemIndex, 1);
localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
updateTable(); // Update the table after deleting
}


updateTable();