// Admin login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('adminUsername');
    const storedPassword = localStorage.getItem('adminPassword');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful');
        window.location.href = 'admin_home.html'; // Redirect to Admin Home Page
    } else {
        alert('Incorrect username or password');
    }
});

// Change password
document.getElementById('changePasswordBtn').addEventListener('click', function () {
    const oldPassword = prompt('Enter old password:');
    const newPassword = prompt('Enter new password:');
    const confirmPassword = prompt('Confirm new password:');

    if (oldPassword === localStorage.getItem('adminPassword') && newPassword === confirmPassword) {
        localStorage.setItem('adminPassword', newPassword);
        alert('Password changed successfully');
    } else {
        alert('Password change failed');
    }
});

// Initial setup for testing
localStorage.setItem('adminUsername', 'admin');
localStorage.setItem('adminPassword', 'admin123');