// JavaScript для Адмін-панелі (admin.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Адмін-панель завантажена!');

    const adminNavButtons = document.querySelectorAll('.admin-sections-nav button');
    const adminSections = document.querySelectorAll('.admin-section');
    const adminContentArea = document.getElementById('admin-content-area'); // Якщо потрібен

    function showAdminSection(sectionId) {
        adminSections.forEach(section => {
            if (section.id === `admin-${sectionId}`) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        adminNavButtons.forEach(button => {
            if (button.dataset.section === sectionId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        // Зберігаємо активну секцію в URL для оновлення сторінки
        history.pushState(null, '', `admin.html?section=${sectionId}`);
    }

    adminNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            showAdminSection(sectionId);
        });
    });

    // Перевірка URL на параметр section при завантаженні
    const urlParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = urlParams.get('section');
    if (sectionFromUrl) {
        showAdminSection(sectionFromUrl);
    } else {
        // Показати першу секцію за замовчуванням, якщо нічого не вказано
        if (adminNavButtons.length > 0) {
            showAdminSection(adminNavButtons[0].dataset.section);
        }
    }

    // Імітація дій для кнопок в таблиці заявок (приклад)
    const applicationActionButtons = document.querySelectorAll('#admin-applications .action-btn');
    applicationActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('view') ? 'Перегляд деталей' : 
                           this.classList.contains('process') ? 'Обробка заявки' : 'Невідома дія';
            const applicationId = this.closest('tr').querySelector('td:first-child').textContent;
            alert(`${action} для заявки ID: ${applicationId}.\n(Функціонал буде реалізовано на бекенді)`);
        });
    });

    // Імітація кнопки "Додати новий курс"
    const addNewCourseButton = document.querySelector('#admin-courses .add-new');
    if (addNewCourseButton) {
        addNewCourseButton.addEventListener('click', function() {
            alert('Відкриття форми для додавання нового курсу.\n(Функціонал буде реалізовано)');
        });
    }

    // Додайте обробники для інших кнопок та дій в адмін-панелі за аналогією
});