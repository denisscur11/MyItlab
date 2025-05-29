// JavaScript для сторінки Заявки (enroll.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка заявки завантажена!');

    const enrollForm = document.getElementById('general-enroll-form');
    const courseSelection = document.getElementById('course-selection');

    // Можливо, динамічне заповнення списку курсів, якщо вони беруться з JS
    // Наприклад, якщо курси визначені в main.js або іншому спільному файлі
    // const availableCourses = { /* ... об'єкт з курсами ... */ };
    // for (const courseId in availableCourses) {
    //     if (availableCourses.hasOwnProperty(courseId)) {
    //         const option = document.createElement('option');
    //         option.value = courseId;
    //         option.textContent = availableCourses[courseId].title;
    //         if (courseSelection) courseSelection.appendChild(option);
    //     }
    // }
    // Поки що список курсів жорстко заданий в HTML.

    if (enrollForm) {
        enrollForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Запобігаємо стандартній відправці форми

            const userName = document.getElementById('user-name').value;
            const userAge = document.getElementById('user-age').value;
            const userContact = document.getElementById('user-contact').value;
            const selectedCourse = courseSelection.options[courseSelection.selectedIndex].text;
            const userComments = document.getElementById('user-comments').value;
            const consentChecked = document.getElementById('consent').checked;

            if (!consentChecked) {
                alert('Будь ласка, надайте згоду на обробку персональних даних.');
                return;
            }

            // Формування даних для відправки
            const formData = {
                name: userName,
                age: userAge,
                contact: userContact,
                course: selectedCourse,
                comments: userComments,
                timestamp: new Date().toLocaleString()
            };

            console.log('Дані форми заявки:', formData);

            // TODO: Реалізувати відправку в Telegram-бот або CRM
            // TODO: Реалізувати повідомлення на пошту або бот про успішну заявку

            // Поки що просто виведемо повідомлення
            alert(`Дякуємо за вашу заявку, ${userName}!\n\nОбраний курс: ${selectedCourse}\nВаш контакт: ${userContact}\nМи зв'яжемося з вами найближчим часом.\n\n(Це повідомлення для демонстрації, дані нікуди не відправлені)`);

            enrollForm.reset(); // Очищення форми після "відправки"
        });
    }
});