document.addEventListener('DOMContentLoaded', function () {
    const reportContainer = document.getElementById('reportContainer');

    document.getElementById('generateStudentReport').addEventListener('click', generateStudentReport);
    document.getElementById('generateCourseEnrollmentReport').addEventListener('click', generateCourseEnrollmentReport);
    document.getElementById('generateFinancialReport').addEventListener('click', generateFinancialReport);

    function generateStudentReport() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const reportHTML = `
            <div class="report">
                <h2>Student Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>NIC</th>
                            <th>Date of Birth</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Courses Enrolled</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${students.map(student => `
                            <tr>
                                <td>${student.firstName}</td>
                                <td>${student.lastName}</td>
                                <td>${student.nic}</td>
                                <td>${student.dob}</td>
                                <td>${student.phone}</td>
                                <td>${student.address}</td>
                                <td>${student.gender}</td>
                                <td>${student.email}</td>
                                <td>${getCoursesEnrolled(student.nic).join(', ')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        reportContainer.innerHTML = reportHTML;
    }

    function generateCourseEnrollmentReport() {
        const courses = JSON.parse(localStorage.getItem('courses')) || [];
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const courseEnrollments = courses.map(course => {
            const enrolledStudents = students.filter(student => {
                const studentDetails = JSON.parse(localStorage.getItem(`studentDetails_${student.nic}`)) || { payments: [] };
                return studentDetails.payments.some(payment => payment.courseId === course.courseId);
            }).length;
            return { ...course, enrolledStudents };
        });

        const reportHTML = `
            <div class="report">
                <h2>Course Enrollment Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Category</th>
                            <th>Fee</th>
                            <th>Enrolled Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${courseEnrollments.map(course => `
                            <tr>
                                <td>${course.courseName}</td>
                                <td>${course.category}</td>
                                <td>$${course.fee}</td>
                                <td>${course.enrolledStudents}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        reportContainer.innerHTML = reportHTML;
    }

    function generateFinancialReport() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const payments = students.flatMap(student => {
            const studentDetails = JSON.parse(localStorage.getItem(`studentDetails_${student.nic}`)) || { payments: [] };
            return studentDetails.payments.map(payment => ({
                ...payment,
                studentName: `${student.firstName} ${student.lastName}`
            }));
        });

        const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

        const reportHTML = `
            <div class="report">
                <h2>Financial Report</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Payment Date</th>
                            <th>Amount</th>
                            <th>Student Name</th>
                            <th>Course ID</th>
                            <th>Payment Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payments.map(payment => `
                            <tr>
                                <td>${new Date(payment.date).toLocaleDateString()}</td>
                                <td>$${payment.amount.toFixed(2)}</td>
                                <td>${payment.studentName}</td>
                                <td>${payment.courseId}</td>
                                <td>${payment.paymentType}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <h3>Total Revenue: $${totalRevenue.toFixed(2)}</h3>
            </div>
        `;
        reportContainer.innerHTML = reportHTML;
    }

    function getCoursesEnrolled(studentNIC) {
        const studentDetails = JSON.parse(localStorage.getItem(`studentDetails_${studentNIC}`)) || { payments: [] };
        return studentDetails.payments.map(payment => {
            const course = JSON.parse(localStorage.getItem('courses'))?.find(c => c.courseId === payment.courseId);
            return course ? course.courseName : 'Unknown';
        });
    }
});
