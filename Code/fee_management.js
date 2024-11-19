document.addEventListener('DOMContentLoaded', function() {
    // Fetch payment details from localStorage
    const students = JSON.parse(localStorage.getItem('students')) || [];
    if (!Array.isArray(students)) {
        console.error('Invalid format for students data in localStorage.');
        return;
    }
    
    const paymentDetails = [];
    
    // Collect all payment details
    students.forEach(student => {
        const studentPayments = JSON.parse(localStorage.getItem(`studentDetails_${student.nic}`))?.payments || [];
        if (!Array.isArray(studentPayments)) {
            console.warn(`No valid payments found for student NIC: ${student.nic}`);
            return;
        }
        studentPayments.forEach(payment => {
            paymentDetails.push({
                paymentDate: payment.date,
                amount: payment.amount,
                studentNIC: student.nic,
                studentName: `${student.firstName} ${student.lastName}`,
                courseId: payment.courseId,
                courseName: getCourseName(payment.courseId),
                paymentType: payment.paymentType
            });
        });
    });

    // Function to get course name by course ID
    function getCourseName(courseId) {
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        if (!Array.isArray(courses)) {
            console.error('Invalid format for courses data in localStorage.');
            return 'Unknown';
        }
        const course = courses.find(c => c.courseId === courseId);
        return course ? course.courseName : 'Unknown';
    }

    // Populate the table with payment details
    const tableBody = document.querySelector('#paymentTable tbody');
    if (!tableBody) {
        console.error('Table body not found.');
        return;
    }
    paymentDetails.forEach(detail => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(detail.paymentDate).toLocaleDateString()}</td>
            <td>$${detail.amount.toFixed(2)}</td>
            <td>${detail.studentNIC}</td>
            <td>${detail.studentName}</td>
            <td>${detail.courseId}</td>
            <td>${detail.courseName}</td>
            <td>${detail.paymentType}</td>
        `;
        tableBody.appendChild(row);
    });
});
