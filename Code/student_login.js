// Student Login
document.getElementById("studentLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nic = document.getElementById("nic").value;
    const password = btoa(document.getElementById("stu-password").value);

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students.find(s => s.nic === nic && s.password === password);

    if (student) {
        localStorage.setItem('loggedInStudentNIC', student.nic);
        alert('Login successful');
        window.location.href = 'student_home.html';
       
    } 
    else {
        alert("Incorrect NIC number or password!");
    }
});


// Change password
document.getElementById('stu-changePasswordBtn').addEventListener('click', function () {
    const stu_oldPassword = prompt('Enter old password:');
    const stu_newPassword = prompt('Enter new password:');
    const stu_confirmPassword = prompt('Confirm new password:');

    if (stu_oldPassword === localStorage.getItem('stu-password') && stu_newPassword === stu_confirmPassword) {
        localStorage.setItem('stu-password', stu_newPassword);
        alert('Password changed successfully');
    } else {
        alert('Password change failed');
    }
});


