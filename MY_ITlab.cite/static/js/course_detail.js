// JavaScript для сторінки Деталей Курсу (course_detail.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка деталей курсу завантажена!');

    const courseTitleElement = document.getElementById('course-title');
    const courseIntroElement = document.getElementById('course-intro');
    const courseProgramSection = document.getElementById('course-program');
    const courseTypeElement = document.getElementById('course-type');
    const lessonDurationElement = document.getElementById('lesson-duration');
    const totalDurationElement = document.getElementById('total-duration');
    const selectedCourseNameInput = document.getElementById('selected-course-name');
    const enrollForm = document.getElementById('course-enroll-form');

    // Мокові дані курсів (в реальному проекті це буде запит до сервера/API)
    const coursesData = {
        'python-basics': {
            title: 'Основи програмування Python',
            intro: 'Пориньте у світ Python та навчіться писати свої перші програми.',
            program: [
                { name: 'Модуль 1: Знайомство з Python', description: 'Змінні, типи даних, оператори.', topics: ['Встановлення Python', 'Перша програма "Hello, World!"', 'Коментарі та синтаксис'] },
                { name: 'Модуль 2: Умови та цикли', description: 'Керуючі конструкції для логіки програм.', topics: ['Оператори if-elif-else', 'Цикли for та while', 'Оператори break та continue'] },
                { name: 'Модуль 3: Функції та модулі', description: 'Організація коду та його повторне використання.', topics: ['Створення функцій', 'Аргументи та повернення значень', 'Імпорт модулів'] }
            ],
            format: 'Онлайн',
            lessonDuration: '1.5 години',
            totalDuration: '3 місяці',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Приклад
        },
        'web-development': {
            title: 'Веб-розробка для початківців (HTML, CSS, JS)',
            intro: 'Створіть свій перший інтерактивний веб-сайт з нуля.',
            program: [
                { name: 'Модуль 1: Основи HTML', description: 'Структура веб-сторінок.', topics: ['Теги, атрибути', 'Списки, таблиці, форми', 'Семантична розмітка'] },
                { name: 'Модуль 2: Стилізація з CSS', description: 'Надання вигляду вашим сторінкам.', topics: ['Селектори, властивості', 'Flexbox, Grid', 'Адаптивний дизайн'] },
                { name: 'Модуль 3: Введення в JavaScript', description: 'Додавання інтерактивності.', topics: ['Змінні, функції', 'DOM маніпуляції', 'Обробка подій'] }
            ],
            format: 'Онлайн + Офлайн (гібрид)',
            lessonDuration: '2 години',
            totalDuration: '4 місяці',
            videoUrl: null // Немає відео для цього курсу
        },
        'figma-design': {
            title: 'Графічний дизайн з Figma',
            intro: 'Навчіться створювати сучасні інтерфейси та прототипи.',
            program: [
                { name: 'Модуль 1: Інтерфейс Figma', description: 'Знайомство з інструментами.', topics: ['Робоча область', 'Основні інструменти', 'Шари та групи'] },
                { name: 'Модуль 2: Створення UI-елементів', description: 'Практична робота.', topics: ['Кнопки, поля вводу', 'Компоненти та стилі', 'Прототипування'] }
            ],
            format: 'Онлайн',
            lessonDuration: '2 години',
            totalDuration: '2 місяці',
            videoUrl: 'https://www.youtube.com/embed/some_figma_tutorial_id'
        }
        // Додайте дані для інших курсів
    };

    function getCourseIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function displayCourseDetails(courseId) {
        const course = coursesData[courseId];

        if (course) {
            if (courseTitleElement) courseTitleElement.textContent = course.title;
            if (courseIntroElement) courseIntroElement.textContent = course.intro;
            if (selectedCourseNameInput) selectedCourseNameInput.value = course.title;

            if (courseProgramSection) {
                courseProgramSection.innerHTML = '<h2>Програма курсу</h2>'; // Очищаємо попередні модулі
                course.program.forEach(moduleData => {
                    const moduleDiv = document.createElement('div');
                    moduleDiv.classList.add('module');
                    let topicsHTML = '';
                    if (moduleData.topics && moduleData.topics.length > 0) {
                        topicsHTML = '<ul>' + moduleData.topics.map(topic => `<li>${topic}</li>`).join('') + '</ul>';
                    }
                    moduleDiv.innerHTML = `
                        <h3>${moduleData.name}</h3>
                        <p>${moduleData.description}</p>
                        ${topicsHTML}
                    `;
                    courseProgramSection.appendChild(moduleDiv);
                });
            }

            if (courseTypeElement) courseTypeElement.textContent = course.format;
            if (lessonDurationElement) lessonDurationElement.textContent = course.lessonDuration;
            if (totalDurationElement) totalDurationElement.textContent = course.totalDuration;

            const videoPlaceholder = document.querySelector('#course-demo .video-placeholder');
            if (videoPlaceholder) {
                if (course.videoUrl) {
                    videoPlaceholder.innerHTML = `<iframe width="100%" height="100%" src="${course.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    videoPlaceholder.innerHTML = '<p>Відео-презентація для цього курсу наразі відсутня.</p>';
                }
            }

        } else {
            if (courseTitleElement) courseTitleElement.textContent = 'Курс не знайдено';
            if (courseIntroElement) courseIntroElement.textContent = 'На жаль, інформація про цей курс відсутня або URL неправильний.';
            // Можна приховати інші секції або показати повідомлення про помилку
            document.querySelector('.course-layout').style.display = 'none';
        }
    }

    const courseId = getCourseIdFromURL();
    if (courseId) {
        displayCourseDetails(courseId);
    } else {
        if (courseTitleElement) courseTitleElement.textContent = 'ID курсу не вказано';
        if (courseIntroElement) courseIntroElement.textContent = 'Будь ласка, перейдіть на сторінку курсу через список курсів.';
        document.querySelector('.course-layout').style.display = 'none';
    }

    // Обробка форми заявки
    if (enrollForm) {
        enrollForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const studentName = document.getElementById('student-name').value;
            const studentAge = document.getElementById('student-age').value;
            const studentContact = document.getElementById('student-contact').value;
            const courseName = selectedCourseNameInput.value;

            // В реальному проекті тут буде відправка даних на сервер або в Telegram-бот/CRM
            alert(`Заявка на курс "${courseName}" відправлена!\nІм'я: ${studentName}\nВік: ${studentAge}\nКонтакт: ${studentContact}\n\n(Це повідомлення для демонстрації, дані нікуди не відправлені)`);
            enrollForm.reset(); // Очищення форми
        });
    }
});