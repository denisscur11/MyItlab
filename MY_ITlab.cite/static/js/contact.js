// JavaScript для сторінки Контактів (contact.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка контактів завантажена!');

    const feedbackForm = document.getElementById('feedback-form');
    const telegramLinks = document.querySelectorAll('a.social-icon.telegram');
    const instagramLinks = document.querySelectorAll('a.social-icon.instagram');

    // Заміна плейсхолдерів для посилань на соцмережі
    // Потрібно буде вказати реальні посилання тут або безпосередньо в HTML
    const actualTelegramLink = 'https://t.me/your_channel_or_username'; // ЗАМІНІТЬ ЦЕ
    const actualInstagramLink = 'https://instagram.com/your_profile'; // ЗАМІНІТЬ ЦЕ

    telegramLinks.forEach(link => {
        if (link.getAttribute('href') === 'YOUR_TELEGRAM_LINK') {
            if (actualTelegramLink === 'https://t.me/your_channel_or_username') {
                console.warn('Будь ласка, вкажіть реальне посилання на Telegram у js/contact.js або в contact.html');
            } else {
                link.setAttribute('href', actualTelegramLink);
            }
        }
    });

    instagramLinks.forEach(link => {
        if (link.getAttribute('href') === 'YOUR_INSTAGRAM_LINK') {
            if (actualInstagramLink === 'https://instagram.com/your_profile') {
                console.warn('Будь ласка, вкажіть реальне посилання на Instagram у js/contact.js або в contact.html');
            } else {
                link.setAttribute('href', actualInstagramLink);
            }
        }
    });


    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Запобігаємо стандартній відправці форми

            const feedbackName = document.getElementById('feedback-name').value;
            const feedbackContact = document.getElementById('feedback-contact').value;
            const feedbackQuestion = document.getElementById('feedback-question').value;

            // Формування даних для відправки
            const formData = {
                name: feedbackName,
                contact: feedbackContact,
                question: feedbackQuestion,
                timestamp: new Date().toLocaleString()
            };

            console.log('Дані форми зворотного зв\'язку:', formData);

            // TODO: Реалізувати відправку на email або в CRM/Telegram
            alert(`Дякуємо за ваше звернення, ${feedbackName}!\n\nВаше питання: "${feedbackQuestion}"\nМи зв'яжемося з вами за контактом: ${feedbackContact} найближчим часом.\n\n(Це повідомлення для демонстрації, дані нікуди не відправлені)`);

            feedbackForm.reset(); // Очищення форми після "відправки"
        });
    }
});