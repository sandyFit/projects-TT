// === Selectors ===
const form = document.querySelector('#student-form');
const alertText = document.querySelector('#alert');
const studentList = document.querySelector('#student-list');
const failedList = document.querySelector('.failed-list'); // Correct selector
const studentsTableBody = document.querySelector('#students-table tbody');
const students = [];

// === Event Handlers ===
const handleSubmit = (e) => {
    e.preventDefault();

    // Capture input values
    const name = document.querySelector('#name').value.trim();
    const age = document.querySelector('#age').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const grade1 = parseFloat(document.querySelector('#grade1').value.trim());
    const grade2 = parseFloat(document.querySelector('#grade2').value.trim());
    const grade3 = parseFloat(document.querySelector('#grade3').value.trim());
    const averageGrade = (grade1 + grade2 + grade3) / 3;

    // === Validations ===
    if (!name || !age || !subject || isNaN(averageGrade)) {
        displayMessage('Por favor, complete todos los campos.');
        return;
    }

    if (averageGrade < 0 || averageGrade > 5) {
        displayMessage('La nota debe estar entre 0.0 y 5.0.');
        return;
    }

    // === Add Student to the Array ===
    const student = {
        name,
        age: Number(age),
        subject,
        grade: Number(averageGrade),
        // Sort name and format as "lastname, firstname"
        sortName: function () {
            const nameParts = this.name.split(' ');
            if (nameParts.length > 1) {
                const lastName = nameParts.pop(); // Extract the last name
                const firstName = nameParts.join(' '); // Remaining part as the first name
                this.name = `${lastName} ${firstName}`; // Format as "lastname, firstname"
            }
        },
    };

    // Sort the name for display purposes
    student.sortName();

    // Add the student to the array
    students.push(student);

    // Sort the array by last name
    students.sort((a, b) => {
        const lastNameA = a.name.split(', ')[0].toLowerCase(); // Extract last name from "lastname, firstname"
        const lastNameB = b.name.split(', ')[0].toLowerCase();
        return lastNameA.localeCompare(lastNameB); // Sort alphabetically
    });

    // Update UI
    listStudents();
    countStudentsByAgeRange();
    listFailedStudents();

    // Display success message
    displayMessage('Datos enviados correctamente');

    // Reset the form
    form.reset();
};

const displayMessage = (message) => {
    alertText.classList.add('alert');
    alertText.textContent = message;

    setTimeout(() => {
        alertText.textContent = '';
        alertText.classList.remove('alert');
    }, 3000);
};

const listStudents = () => {
    // Clear the existing table rows
    studentsTableBody.innerHTML = '';

    // Loop through the students array and create table rows
    students.forEach((student) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.subject}</td>
            <td>${student.grade.toFixed(1)}</td>
        `;

        studentsTableBody.appendChild(row);
    });
};

const countStudentsByAgeRange = () => {
    let range15to20 = 0;
    let range20to25 = 0;
    let range26plus = 0;

    students.forEach((student) => {
        if (student.age >= 15 && student.age <= 20) range15to20++;
        else if (student.age > 20 && student.age <= 25) range20to25++;
        else if (student.age > 25) range26plus++;
    });

    document.querySelector('#range1').textContent = `15-20 años: ${range15to20}`;
    document.querySelector('#range2').textContent = `21-25 años: ${range20to25}`;
    document.querySelector('#range3').textContent = `26+ años: ${range26plus}`;
};

const listFailedStudents = () => {
    // Clear the failed list
    failedList.innerHTML = '';

    const failedStudents = students.filter((student) => student.grade < 3.0);

    if (failedStudents.length === 0) {
        failedList.innerHTML = '<p>No hay estudiantes reprobados.</p>';
        return;
    }

    failedStudents.forEach((student) => {
        const listItem = document.createElement('p'); // Use paragraph for failed students
        listItem.textContent = `${student.name} - Nota: ${student.grade.toFixed(1)}`;
        failedList.appendChild(listItem);
    });
};

// === Event Listener ===
form.addEventListener('submit', handleSubmit);
