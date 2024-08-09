document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let studentName = document.getElementById('studentName').value;
    let studentID = document.getElementById('studentID').value;
    let email = document.getElementById('email').value;
    let contactNo = document.getElementById('contactNo').value;

    if (studentName && studentID && email && contactNo) {
        // Check if we are editing an existing record
        if (editingRow) {
            updateStudent(editingRow, studentName, studentID, email, contactNo);
        } else {
            addStudent(studentName, studentID, email, contactNo);
        }
        clearForm();
    }
});

let editingRow = null;

function addStudent(name, id, email, contact) {
    let studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    let newRow = studentTable.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

    storeData();
}

function editStudent(button) {
    // Keep a reference to the row being edited
    editingRow = button.parentNode.parentNode;
    document.getElementById('studentName').value = editingRow.cells[0].innerText;
    document.getElementById('studentID').value = editingRow.cells[1].innerText;
    document.getElementById('email').value = editingRow.cells[2].innerText;
    document.getElementById('contactNo').value = editingRow.cells[3].innerText;

    // Make sure that original row is not removed until the user submits the form
}

function updateStudent(row, name, id, email, contact) {
    row.cells[0].innerText = name;
    row.cells[1].innerText = id;
    row.cells[2].innerText = email;
    row.cells[3].innerText = contact;

    // It resets the editing row reference after updating
    editingRow = null;

    storeData();
}

function deleteStudent(button) {
    let row = button.parentNode.parentNode;
    row.remove();
    storeData();
}

function storeData() {
    let studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    localStorage.setItem('students', studentTable.innerHTML);
}

function loadData() {
    let storedData = localStorage.getItem('students');
    if (storedData) {
        document.getElementById('studentTable').getElementsByTagName('tbody')[0].innerHTML = storedData;
    }
}

function clearForm() {
    document.getElementById('studentForm').reset();
    editingRow = null; // It resets the editing row when the form is cleared
}

window.onload = loadData;
