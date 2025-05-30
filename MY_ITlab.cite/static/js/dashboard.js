// JavaScript для Кабінету Учня (dashboard.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Кабінет учня завантажено!');

    // Приклад: отримання імені учня (в реальності це буде з сервера після логіну)
    const studentNamePlaceholder = document.querySelector('#student-dashboard h1');
    if (studentNamePlaceholder) {
        // Замість "[Ім'я Учня]" можна вставити реальне ім'я
        // Наприклад, з localStorage або після автентифікації
        const actualStudentName = localStorage.getItem('studentName') || "Шановний Учень"; // Приклад
        studentNamePlaceholder.textContent = `Вітаємо, ${actualStudentName}!`;
    }

    // Обробка кнопки "Написати викладачу"
    const contactTeacherButton = document.querySelector('#teacher-communication button');
    if (contactTeacherButton) {
        contactTeacherButton.addEventListener('click', function() {
            alert('Функція "Написати викладачу" буде реалізована.\nМожливо, відкриття модального вікна з формою або перехід на сторінку повідомлень.');
            // Наприклад: window.location.href = '/messages?teacher_id=XYZ';
        });
    }

    // Обробка посилань "Здати роботу (Google Form)"
    const submitHomeworkLinks = document.querySelectorAll('#homework a[href*="Google Form"]');
    submitHomeworkLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Запобігаємо переходу за замовчуванням
            const homeworkDescription = this.closest('.homework-item').querySelector('p:first-child').textContent;
            alert(`Відкриття Google Form для здачі завдання: ${homeworkDescription.split('.')[1].trim()}.\nURL: ${this.href} (буде відкрито в новій вкладці)`);
            window.open(this.href, '_blank');
        });
    });

    // Інша динамічна логіка для кабінету учня може бути додана тут
    // Наприклад, завантаження актуальних даних про курси, домашки, оплати через AJAX.
});