document.getElementById('addCourseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const courseName = document.getElementById('courseName').value;
    const category = document.getElementById('category').value;
    const duration = document.getElementById('duration').value;
    const fee = document.getElementById('fee').value;
    const lecturer = document.getElementById('lecturer').value;
    const description = document.getElementById('description').value;
    const photo = document.getElementById('photo').files[0];

    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onloadend = function () {
        const coursePhoto = reader.result;

        const course = {
            courseId,
            courseName,
            category,
            duration,
            fee,
            lecturer,
            description,
            coursePhoto
        };

        // Store course details in local storage
        let courses = JSON.parse(localStorage.getItem('courses')) || [];    
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));

        alert('Course added successfully');
        document.getElementById('addCourseForm').reset();
    };
});
