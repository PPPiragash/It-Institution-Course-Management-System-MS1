// index.js

function loginForm() {
    clearContent();  // Clear previous content
    document.getElementById("login-form").innerHTML = `
        <h1>Welcome to the MIT Institute</h1>
        <p>Please choose your login type:</p>
        <div class="buttons">
            <a href="admin_login.html" class="btn">Admin Login</a>
            <a href="student_login.html" class="btn">Student Login</a>
        </div>`;
}

// Function to show About details
function showAbout() {
    clearContent();  // Clear previous content
    const contentDiv = document.getElementById("dynamic-content");
    contentDiv.innerHTML = `
        <h2>About Our MIT Institute</h2>
        <p>MIT Institute is a leading educational institution offering a variety of courses across disciplines...</p>
        <p>Our mission is to provide quality education to students globally, fostering both academic and personal growth...</p>
        <p>We strive for excellence in teaching, research, and service to the community.</p>`;
    contentDiv.style.display = "block";
}

// Function to show Contact details
function showContact() {
    clearContent();  // Clear previous content
    const contentDiv = document.getElementById("dynamic-content");
    contentDiv.innerHTML = `
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us via any of the following platforms:</p>
        <ul>
            <li><strong>Phone:</strong> +94 76 660 4550</li>
            <li><strong>Email:</strong> info@MIT Institute.com</li>
            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/MIT Institute" target="_blank">Visit our Facebook Page</a></li>
            <li><strong>WhatsApp:</strong> +94 76 660 4550</li>
            <li><strong>YouTube:</strong> <a href="https://www.youtube.com/MIT Institute" target="_blank">Visit our YouTube Channel</a></li>
        </ul>`;
    contentDiv.style.display = "block";
}

// Function to clear the previous content
function clearContent() {
    // Clear any previous dynamic content
    document.getElementById("dynamic-content").innerHTML = '';
    document.getElementById("login-form").innerHTML = '';  // Optional: Clear login form as well
}
