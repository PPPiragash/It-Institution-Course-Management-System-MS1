document.addEventListener('DOMContentLoaded', function () {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const tbody = document.querySelector('#coursesTable tbody');

    courses.forEach((course, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td><img src="${course.coursePhoto}" alt="Course Photo"></td>
            <td>${course.courseId}</td>
            <td>${course.courseName}</td>
            <td>${course.category}</td>
            <td>${course.duration}</td>
            <td>${course.fee}</td>
            <td>${course.lecturer}</td>
            <td>${course.description}</td>
            <td>
                <button class="view" onclick="viewCourse(${index})">View</button>
                <button class="edit" onclick="editCourse(${index})">Edit</button>
                <button class="delete" onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
});

function viewCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses[index];
    alert(`
        Course ID: ${course.courseId}
        Course Name: ${course.courseName}
        Category: ${course.category}
        Duration: ${course.duration} months
        Fee: ${course.fee}
        Lecturer: ${course.lecturer}
        Description: ${course.description}
    `);
}

function editCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses[index];

    const newCourseId = prompt('Course ID:', course.courseId);
    const newCourseName = prompt('Course Name:', course.courseName);
    const newCategory = prompt('Category (Beginner/Intermediate):', course.category);
    const newDuration = prompt('Duration (Months):', course.duration);
    const newFee = prompt('Course Fee:', course.fee);
    const newLecturer = prompt('Lecturer:', course.lecturer);
    const newDescription = prompt('Description:', course.description);

    courses[index] = {
        courseId: newCourseId,
        courseName: newCourseName,
        category: newCategory,
        duration: newDuration,
        fee: newFee,
        lecturer: newLecturer,
        description: newDescription,
        coursePhoto: course.coursePhoto
    };

    localStorage.setItem('courses', JSON.stringify(courses));
    location.reload();
}

function deleteCourse(index) {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    if (confirm('Are you sure you want to delete this course?')) {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        location.reload();
    }
}
