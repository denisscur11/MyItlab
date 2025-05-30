// JavaScript для сторінки FAQ (faq.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка FAQ завантажена!');

    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.getElementById('faq-search-input');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const toggleSpan = item.querySelector('.faq-toggle');

        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                const isActive = questionButton.classList.contains('active');

                // Закрити всі інші відкриті відповіді (опціонально)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.querySelector('.faq-question').classList.remove('active');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //         otherItem.querySelector('.faq-answer').style.paddingTop = null;
                //         otherItem.querySelector('.faq-answer').style.paddingBottom = null;
                //         otherItem.querySelector('.faq-toggle').textContent = '+';
                //     }
                // });

                if (isActive) {
                    questionButton.classList.remove('active');
                    answerDiv.style.maxHeight = null;
                    answerDiv.style.paddingTop = null; // Скидаємо padding при закритті
                    answerDiv.style.paddingBottom = null;
                    if (toggleSpan) toggleSpan.textContent = '+';
                } else {
                    questionButton.classList.add('active');
                    answerDiv.style.paddingTop = '10px'; // Додаємо padding при відкритті
                    answerDiv.style.paddingBottom = '10px';
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                    if (toggleSpan) toggleSpan.textContent = '-';
                }
            });
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question span:first-child').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer p') ? item.querySelector('.faq-answer p').textContent.toLowerCase() : '';

                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.classList.remove('hidden-faq-item');
                } else {
                    item.classList.add('hidden-faq-item');
                }
            });
        });
    }
});