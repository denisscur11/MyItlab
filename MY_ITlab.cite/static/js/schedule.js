// JavaScript для сторінки Розкладу (schedule.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка розкладу завантажена!');

    const courseFilterSelect = document.getElementById('course-filter');
    const applyFilterButton = document.getElementById('apply-filter');
    const scheduleTableRows = document.querySelectorAll('.schedule-table-container tbody tr');

    function filterSchedule() {
        const selectedCourse = courseFilterSelect.value;

        scheduleTableRows.forEach(row => {
            // Атрибут data-course може містити кілька значень через пробіл
            const rowCourses = row.getAttribute('data-course') ? row.getAttribute('data-course').split(' ') : [];

            if (selectedCourse === 'all' || rowCourses.includes(selectedCourse)) {
                row.classList.remove('hidden-row');
            } else {
                row.classList.add('hidden-row');
            }
        });
    }

    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', filterSchedule);
    }

    // Можна також застосовувати фільтр одразу при зміні селекта
    if (courseFilterSelect) {
        courseFilterSelect.addEventListener('change', filterSchedule);
    }

    // Початкове застосування фільтра (якщо потрібно, хоча за замовчуванням "Всі курси")
    // filterSchedule();
});