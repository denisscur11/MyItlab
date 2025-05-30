document.addEventListener('DOMContentLoaded', function() {
    // Дані про курси (мають відповідати app.py)
    const courses = {
        'python': {
            title: 'Python',
            description: 'Вивчи найпопулярнішу мову програмування. Від основ до створення власних програм та автоматизації.',
            price: '799$',
            duration: '6 місяців',
            level: 'Початківець',
            group: '12',
            start: '27 травня',
            icon: '<i class="fab fa-python"></i>',
            link: '/course/python'
        },
        'python-kids': {
            title: 'Python для дітей',
            description: 'Курс програмування для дітей 12-16 років. Створюй ігри, програми та починай свій шлях в IT.',
            price: '599$',
            duration: '4 місяці',
            level: 'Початківець',
            group: '10',
            start: '10 червня',
            icon: '<i class="fas fa-child"></i>',
            link: '/course/python-kids'
        },
        'web-dev': {
            title: 'Веб розробка',
            description: 'Навчись створювати сучасні вебсайти з нуля. HTML, CSS, JavaScript та основи бекенду на Python.',
            price: '899$',
            duration: '8 місяців',
            level: 'Початківець',
            group: '15',
            start: '20 травня',
            icon: '<i class="fas fa-code"></i>',
            link: '/course/web-dev'
        }
    };

    const courseCards = document.querySelectorAll('.course-card');
    const modal = document.querySelector('.pricing-modal');
    const closeModal = document.querySelector('.close-modal');

    // Елементи модального вікна
    const modalIcon = document.getElementById('modalCourseIcon');
    const modalTitle = document.getElementById('modalCourseTitle');
    const modalPrice = document.getElementById('modalCoursePrice');
    const modalStart = document.getElementById('modalCourseStart');
    const modalGroupBadge = document.getElementById('modalCourseGroupBadge');
    const modalDescription = document.getElementById('modalCourseDescription');
    const modalDuration = document.getElementById('modalCourseDuration');
    const modalLevel = document.getElementById('modalCourseLevel');
    const modalLink = document.getElementById('modalCourseLink');

    // Відкриття модального вікна з даними курсу
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseKey = this.getAttribute('data-course');
            const course = courses[courseKey];
            if (course) {
                modalIcon.innerHTML = course.icon;
                modalTitle.textContent = course.title;
                modalPrice.textContent = `Ціна: ${course.price}`;
                modalStart.textContent = `Старт: ${course.start}`;
                modalGroupBadge.textContent = `Місць у групі: ${course.group}`;
                modalDescription.textContent = course.description;
                modalDuration.innerHTML = `<i class='far fa-clock'></i> Тривалість: ${course.duration}`;
                modalLevel.innerHTML = `<i class='fas fa-signal'></i> Рівень: ${course.level}`;
                modalLink.href = course.link;
            }
            modal.classList.add('active');
        });
    });

    // Закриття модального вікна
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}); 