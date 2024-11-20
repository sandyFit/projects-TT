const form = document.querySelector('#student-form');
const alertText = document.querySelector('.alert');
const studentList = document.querySelector('#student-list');
const students = [];

const handleSubmit = (e) => {
    e.preventDefault();

    // Capture input values
    const name = document.querySelector('#name').value.trim();
    const age = document.querySelector('#age').value.trim();
    const subject = document.querySelector('#subject').value.trim();
    const grade = parseFloat(document.querySelector('#grade').value.trim());

    // === VALIDATIONS ===
    if (!name || !age || !subject || isNaN(grade)) {
        displayMessage('Por favor, complete todos los campos.');
        return;
    }

    // === GRADE RANGE ===
    if (grade < 0 || grade > 5) {
        displayMessage('La nota debe estar entre 0.0 y 5.0.');
        return;
    }

    // === ADD STUDENT TO THE ARRAY ===
    const student = {
        name,
        age: Number(age),
        subject,
        grade: Number(grade),
        sortName: function () {
            const nameParts = this.name.split(' ');
            if (nameParts.length > 1) {
                const lastName = nameParts.pop(); // Extract the last name
                const firstName = nameParts.join(' '); // Combine the rest as the first name
                this.name = `${lastName} ${firstName}`; // Format as "lastname, firstname"
            }
        },
        displayStudent: function () {
            studentList.innerHTML = ''; // Clear the current list

            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student-item');
            studentDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${this.name}</p>
                <p><strong>Edad:</strong> ${this.age}</p>
                <p><strong>Materia:</strong> ${this.subject}</p>
                <p><strong>Nota:</strong> ${this.grade}</p>
                <hr>`;
            studentList.appendChild(studentDiv);
        }
    };

    // Sort the name for display purposes
    student.sortName();

    // Add the student to the array
    students.push(student);

    // Display sorted students
    student.displayStudent();

    // Sort the array by last name
    students.sort((a, b) => {
        const lastNameA = a.name.split(', ')[0].toLowerCase(); // Extract last name from "lastname, firstname"
        const lastNameB = b.name.split(', ')[0].toLowerCase();
        return lastNameA.localeCompare(lastNameB); // Sort alphabetically
    });

    console.log(students);

    displayMessage('Datos enviados correctamente');

    // Reset form
    form.reset();
};

const displayMessage = (message) => {
    alertText.textContent = message;

    setTimeout(() => {
        alertText.textContent = '';
    }, 3000);
};

// Add event listener
form.addEventListener('submit', handleSubmit);
