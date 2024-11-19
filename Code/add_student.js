// Add new student
document.getElementById('addStudentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const nic = document.getElementById('nic').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const student = {
        firstName,
        lastName,
        nic,
        dob,
        phone,
        address,
        gender,
        email,
        password: btoa(password) // Encrypting the password \
    };

    // Store student details in local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    

    alert('Student registered successfully');
    document.getElementById('addStudentForm').reset();
});