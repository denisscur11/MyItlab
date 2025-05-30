// JavaScript для Кабінету Викладача (teacher-panel.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Кабінет викладача завантажено!');

    // Приклад: отримання імені викладача
    const teacherNamePlaceholder = document.querySelector('#teacher-panel h1');
    if (teacherNamePlaceholder) {
        const actualTeacherName = localStorage.getItem('teacherName') || "Шановний Викладач"; // Приклад
        teacherNamePlaceholder.textContent = `Панель Викладача: ${actualTeacherName}`;
    }

    // Обробка кнопок в картці "Мої групи / Учні"
    const viewStudentsButtons = document.querySelectorAll('.view-students');
    viewStudentsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-item-teacher').querySelector('h4').textContent;
            alert(`Перегляд учнів групи "${groupName}".\n(Буде реалізовано перехід на сторінку зі списком учнів або модальне вікно)`);
        });
    });

    const manageHomeworkButtons = document.querySelectorAll('.manage-homework');
    manageHomeworkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const groupName = this.closest('.group-item-teacher').querySelector('h4').textContent;
            alert(`Керування домашніми завданнями для групи "${groupName}".\n(Буде реалізовано перехід на сторінку керування ДЗ)`);
        });
    });

    // Обробка кнопок в картці "Керування домашніми завданнями"
    const checkHomeworkButtons = document.querySelectorAll('.check-homework');
    checkHomeworkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseInfo = this.closest('.homework-item-teacher').querySelector('p:first-child').textContent;
            alert(`Перевірка робіт для: ${courseInfo}.\n(Буде реалізовано перехід на сторінку перевірки)`);
        });
    });

    const addHomeworkButton = document.querySelector('.add-homework');
    if (addHomeworkButton) {
        addHomeworkButton.addEventListener('click', function() {
            alert('Додавання нового домашнього завдання.\n(Буде реалізовано відкриття форми для створення ДЗ)');
        });
    }

    // Обробка кнопок в картці "Відвідуваність"
    const markAttendanceButton = document.querySelector('#attendance-tracking button:first-of-type');
    if (markAttendanceButton) {
        markAttendanceButton.addEventListener('click', function() {
            alert('Відмітка відвідуваності.\n(Буде реалізовано відкриття інтерфейсу для відмітки)');
        });
    }
    const viewAttendanceStatsButton = document.querySelector('#attendance-tracking button:last-of-type');
    if (viewAttendanceStatsButton) {
        viewAttendanceStatsButton.addEventListener('click', function() {
            alert('Перегляд статистики відвідуваності.\n(Буде реалізовано перехід на сторінку статистики)');
        });
    }

    // Обробка кнопки в картці "Комунікація з учнями"
    const viewMessagesButton = document.querySelector('#student-communication button');
    if (viewMessagesButton) {
        viewMessagesButton.addEventListener('click', function() {
            alert('Перехід до системи повідомлень.\n(Буде реалізовано)');
        });
    }

});