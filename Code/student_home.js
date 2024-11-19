// Display the profile section with student data from localStorage
function showProfile() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const nic = localStorage.getItem('loggedInStudentNIC');
    const student = students.find(stu => stu.nic === nic);

    if (student) {
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('dob').value = student.dob;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address;
        document.getElementById('gender').value = student.gender;
        document.getElementById('email').value = student.email;
        document.getElementById('nic').value = student.nic;
        document.getElementById('password').value = student.password;

        document.getElementById('profileSection').style.display = 'block';
    } else {
        alert('No student found.');
    }
}

// Enable form fields for editing
function enableEditing() {  
    document.getElementById('firstName').disabled = false;
    document.getElementById('lastName').disabled = false;
    document.getElementById('dob').disabled = false;
    document.getElementById('phone').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('gender').disabled = false;
    document.getElementById('email').disabled = false;

    document.getElementById('editButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline-block';
}

// Save the edited profile data back to localStorage and update admin table
function saveProfile() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const nic = localStorage.getItem('loggedInStudentNIC');
    const studentIndex = students.findIndex(stu => stu.nic === nic);

    if (studentIndex === -1) {
        alert('Student not found.');
        return false;
    }

    // Update student data
    students[studentIndex].firstName = document.getElementById('firstName').value;
    students[studentIndex].lastName = document.getElementById('lastName').value;
    students[studentIndex].dob = document.getElementById('dob').value;
    students[studentIndex].phone = document.getElementById('phone').value;
    students[studentIndex].address = document.getElementById('address').value;
    students[studentIndex].gender = document.getElementById('gender').value;
    students[studentIndex].email = document.getElementById('email').value;

    // Save the updated student data back to localStorage
    localStorage.setItem('students', JSON.stringify(students));

    alert('Profile updated successfully.');

    // Hide the save button and lock the form fields again
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'none';

    // Disable fields after saving
    disableFormFields();

    return false;
}

// Disable all form fields after saving
function disableFormFields() {
    document.getElementById('firstName').disabled = true;
    document.getElementById('lastName').disabled = true;
    document.getElementById('dob').disabled = true;
    document.getElementById('phone').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById('gender').disabled = true;
    document.getElementById('email').disabled = true;
}








document.addEventListener('DOMContentLoaded', function () {
    const currentStudentNIC = localStorage.getItem('studentNIC');  // Get the logged-in student's NIC
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const studentCartKey = `studentCart_${currentStudentNIC}`;
    const studentDetailsKey = `studentDetails_${currentStudentNIC}`;
    let studentCart = JSON.parse(localStorage.getItem(studentCartKey)) || [];
    let studentDetails = JSON.parse(localStorage.getItem(studentDetailsKey)) || { payments: [] };
    const coursesList = document.getElementById('coursesList');
    const paymentModal = document.getElementById('paymentModal');
    const paymentCoursesList = document.getElementById('paymentCoursesList');
    const partialPaymentContainer = document.getElementById('partialPaymentContainer');
    const modalClose = document.querySelectorAll('.modal .close');
    let isPaymentNeeded = false; // Track if payment modal needs to be shown

    // Display initial home page content
    displayCart();
    showHomePage();

    // Handle navigation button clicks
    document.getElementById('home').addEventListener('click', function () {
        showHomePage();
        hidePaymentModal(); // Hide payment modal when going to home
    });
    document.getElementById('course').addEventListener('click', showCourses);
    document.getElementById('profile').addEventListener('click', showProfile);

    // Function to display the cart in the "Home" section
    function displayCart() {
        const cartList = document.getElementById('cart');
        cartList.innerHTML = '';

        studentCart = JSON.parse(localStorage.getItem(studentCartKey)) || [];  // Reload current student's cart

        studentCart.forEach((course, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div>
                <img src="${course.coursePhoto}" alt="Course Photo" width="50" height="50">
                ${course.courseName} (${course.category}) - $${course.fee}
                <button class="view" onclick="openCartModal(${index})">View</button>
                <button class="delete" onclick="removeFromCart(${index})">Delete</button>
            </div>`;
            cartList.appendChild(li);
        });

        // Show the payment button only if there are courses in the cart
        if (studentCart.length > 0) {
            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Proceed to Payment';
            checkoutButton.onclick = showPaymentModal;
            cartList.appendChild(checkoutButton);
            isPaymentNeeded = true;
        } else {
            isPaymentNeeded = false;
        }
    }

    // Function to show payment modal
    function showPaymentModal() {
        if (isPaymentNeeded) {
            paymentCoursesList.innerHTML = '';
            studentCart.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.classList.add('course');
                courseDiv.innerHTML = `
                    <div class="course-content">
                        <img src="${course.coursePhoto}" alt="Course Photo" width="100" height="100">
                        <p><strong>${course.courseName}</strong> (${course.category})</p>
                        <p>Fee: $${course.fee}</p>
                    </div>
                `;
                paymentCoursesList.appendChild(courseDiv);
            });

            paymentModal.style.display = 'block';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const paymentTypeSelect = document.getElementById('paymentType');
        const partialPaymentContainer = document.getElementById('partialPaymentContainer');
    
        // Function to toggle the visibility of the partial payment container
        function togglePartialPaymentContainer() {
            if (paymentTypeSelect.value === 'partial') {
                partialPaymentContainer.classList.remove('hidden');
            } else {
                partialPaymentContainer.classList.add('hidden');
            }
        }
    
        // Add event listener to the payment type select element
        paymentTypeSelect.addEventListener('change', togglePartialPaymentContainer);
    
        // Initial check to set the correct visibility on page load
        togglePartialPaymentContainer();
    });

    // Handle payment type change
    document.getElementById('paymentType').addEventListener('change', function () {
        const partialAmountInput = document.getElementById('partialAmount');
        if (this.value === 'partial') {
            partialPaymentContainer.classList.remove('hidden');
            partialAmountInput.required = true;  // Make partial amount field required
        } else {
            partialPaymentContainer.classList.add('hidden');
            partialAmountInput.required = false; // Remove requirement
            partialAmountInput.value = ''; // Clear partial amount field
        }
    });

    // Function to handle payment
    document.getElementById('payButton').onclick = function () {
        const paymentType = document.getElementById('paymentType').value;
        const partialAmount = parseFloat(document.getElementById('partialAmount').value) || 0;
        
        // Validate partial payment
        const course = studentCart[0]; // Assuming only one course per payment
        if (!course) {
            alert('No course selected for payment.');
            return;
        }
        if (paymentType === 'partial') {
            // Check if partial amount is empty or zero
            if (isNaN(partialAmount) || partialAmount <= 0) {
                alert('Partial amount must be greater than zero.');
                return;
            }
            // Check if partial amount exceeds course fee
            if (partialAmount > course.fee) {
                alert('Partial amount cannot exceed the course fee.');
                return;
            }
        }

        // Simulate payment processing
        alert('Payment successful!');
    
        
        // Update student details with payment information
        const paymentDetails = {
            courseId: course.courseId,
            amount: paymentType === 'full' ? course.fee : partialAmount,
            paymentType: paymentType,
            date: new Date().toISOString()
        };
        studentDetails.payments.push(paymentDetails);
        localStorage.setItem(studentDetailsKey, JSON.stringify(studentDetails));

        // Mark course as paid
        studentCart = studentCart.filter(c => c.courseId !== course.courseId);
        localStorage.setItem(studentCartKey, JSON.stringify(studentCart));
        displayCart();

        hidePaymentModal();
    };

    // Function to cancel payment
    document.getElementById('cancelPayment').onclick = function () {
        hidePaymentModal();
    };

    // Function to hide payment modal
    function hidePaymentModal() {
        paymentModal.style.display = 'none';
    }

    // Function to show home page content
    function showHomePage() {
        hideAllSections();
        document.querySelector('.welcome-message').style.display = 'block';
        document.querySelector('.Select-Course').style.display = 'block';
    }

    // Function to show the course list
    function showCourses() {
        hideAllSections();
        document.querySelector('.courses-container').style.display = 'block';
        displayCourses();
    }

    // Function to display the list of available courses
    function displayCourses() {
        coursesList.innerHTML = ''; // Clear any previous content

        courses.forEach((course, index) => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');

            courseDiv.innerHTML = `
                <div class="course-content">
                    <img src="${course.coursePhoto}" alt="Course Photo" width="100" height="100">
                    <p><strong>${course.courseName}</strong> (${course.category})</p>
                    <p>Fee: $${course.fee}</p>
                </div>
                
                <div>
                    <button class="view" onclick="openCourseModal(${index})">View</button>
                    <button class="add-to-cart" onclick="addToCart(${index})">Add</button>
                </div>
            `;

            coursesList.appendChild(courseDiv);
        });
    }

    // Function to hide all sections
    function hideAllSections() {
        document.querySelector('.welcome-message').style.display = 'none';
        document.querySelector('.courses-container').style.display = 'none';
        document.querySelector('.Select-Course').style.display = 'none';
        document.getElementById('profileSection').style.display = 'none';
    }

    // Function to show the profile section
    window.showProfile = function () {
        hideAllSections();
        document.getElementById('profileSection').style.display = 'block';
    };

    // Function to open modal with course details from courses section
    window.openCourseModal = function (index) {
        const course = courses[index];

        document.getElementById('modalCourseName').textContent = course.courseName;
        document.getElementById('modalCategory').textContent = course.category;
        document.getElementById('modalDuration').textContent = course.duration;
        document.getElementById('modalFee').textContent = course.fee;
        document.getElementById('modalLecturer').textContent = course.lecturer;
        document.getElementById('modalDescription').textContent = course.description;

        // Show the modal
        const modal = document.getElementById('courseModal');
        modal.style.display = "block";

        // Add course to cart on button click
        const addToCartButton = document.getElementById('addToCartButton');
        addToCartButton.onclick = function () {
            const studentCart = JSON.parse(localStorage.getItem(studentCartKey)) || [];
            if (!studentCart.some(c => c.courseId === course.courseId) && !studentDetails.payments.some(p => p.courseId === course.courseId)) {
                studentCart.push(course);
                localStorage.setItem(studentCartKey, JSON.stringify(studentCart));  // Store for the specific student
                displayCart();
                alert('Course added to cart!');
                showPaymentModal(); // Show payment section after adding to cart
            } else {
                alert('Course is already in the cart or has already been paid for!');
            }
        };
    };

    // Function to open modal with course details from cart
    window.openCartModal = function (index) {
        const course = studentCart[index];

        document.getElementById('modalCourseName').textContent = course.courseName;
        document.getElementById('modalCategory').textContent = course.category;
        document.getElementById('modalDuration').textContent = course.duration;
        document.getElementById('modalFee').textContent = course.fee;
        document.getElementById('modalLecturer').textContent = course.lecturer;
        document.getElementById('modalDescription').textContent = course.description;

        // Show the modal
        const modal = document.getElementById('courseModal');
        modal.style.display = "block";

        // Hide the "Add to Cart" button
        document.getElementById('addToCartButton').style.display = 'none';
    };

    // Function to add course to cart from courses section
    window.addToCart = function (index) {
        const course = courses[index];
        const studentCart = JSON.parse(localStorage.getItem(studentCartKey)) || [];
        if (!studentCart.some(c => c.courseId === course.courseId) && !studentDetails.payments.some(p => p.courseId === course.courseId)) {
            studentCart.push(course);
            localStorage.setItem(studentCartKey, JSON.stringify(studentCart));  // Store for the specific student
            displayCart();
            alert('Course added to cart!');
            showPaymentModal(); // Show payment section after adding to cart
        } else {
            alert('Course is already in the cart or has already been paid for!');
        }
    };

    // Function to remove a course from the cart
    window.removeFromCart = function (index) {
        studentCart.splice(index, 1);
        localStorage.setItem(studentCartKey, JSON.stringify(studentCart));  // Store for the specific student
        displayCart();
    };

    // Close modals when 'x' is clicked
    modalClose.forEach(element => {
        element.onclick = function () {
            document.getElementById('courseModal').style.display = 'none';
            hidePaymentModal();
        };
    });

    // Close modals when clicking outside the modal
    window.onclick = function (event) {
        const courseModal = document.getElementById('courseModal');
        if (event.target === courseModal) {
            courseModal.style.display = 'none';
        }
        if (event.target === paymentModal) {
            hidePaymentModal();
        }
    };
});























