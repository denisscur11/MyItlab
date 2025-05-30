// JavaScript для сторінки Курсів (courses.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка курсів завантажена!');

    // Тут може бути логіка для фільтрації курсів,
    // динамічного завантаження або інших інтерактивних елементів.

    const detailButtons = document.querySelectorAll('.btn-details');

    detailButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Можна додати якусь анімацію чи перевірку перед переходом
            console.log(`Перехід на деталі курсу: ${this.href}`);
            // event.preventDefault(); // якщо потрібна додаткова логіка перед переходом
        });
    });
});