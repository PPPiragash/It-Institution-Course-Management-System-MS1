// Load and display students from local storage
document.addEventListener('DOMContentLoaded', function () {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.querySelector('#studentsTable tbody');

    students.forEach((student, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.nic}</td>
            <td>${student.dob}</td>
            <td>${student.phone}</td>
            <td>${student.address}</td>
            <td>${student.gender}</td>
            <td>${student.email}</td>
            <td>
                <button class="view" onclick="viewStudent(${index})">View</button>
                <button class="edit" onclick="editStudent(${index})">Edit</button>
                <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
});

// View student details
function viewStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];
    alert(`
        Name: ${student.firstName} ${student.lastName}
        NIC: ${student.nic}
        Date of Birth: ${student.dob}
        Phone: ${student.phone}
        Address: ${student.address}
        Gender: ${student.gender}
        Email: ${student.email}
    `);
}

// Edit student details
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    const newFirstName = prompt('First Name:', student.firstName);
    const newLastName = prompt('Last Name:', student.lastName);
    const newNIC = prompt('NIC Number:', student.nic);
    const newDOB = prompt('Date of Birth:', student.dob);
    const newPhone = prompt('Phone Number:', student.phone);
    const newAddress = prompt('Address:', student.address);
    const newGender = prompt('Gender:', student.gender);
    const newEmail = prompt('Email:', student.email);

    students[index] = {
        firstName: newFirstName,
        lastName: newLastName,
        nic: newNIC,
        dob: newDOB,
        phone: newPhone,
        address: newAddress,
        gender: newGender,
        email: newEmail,
        password: student.password // Keep the password unchanged
    };

    localStorage.setItem('students', JSON.stringify(students));
    location.reload(); // Reload the page to see the updates
}

// Delete student
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        location.reload(); // Reload the page to see the updates
    }
}



