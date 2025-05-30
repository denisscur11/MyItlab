// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initializeForms();
    initializeConsultationForm();
    initializeFooterFeedbackForm();
});

// Навігація
function initializeNavigation() {
    // Мобільне меню
    const menuButton = document.querySelector('.menu-button');
    const navContent = document.querySelector('.nav-content');
    
    if (menuButton && navContent) {
        menuButton.addEventListener('click', () => {
            navContent.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }

    // Підсвічування активного пункту меню
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || 
            (currentPath.includes('/course/') && href.includes('/courses')) ||
            (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        }
    });

    // Плавна прокрутка для якірних посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Закриваємо мобільне меню після кліку
                if (navContent && navContent.classList.contains('active')) {
                    navContent.classList.remove('active');
                    menuButton.classList.remove('active');
                }
            }
        });
    });

    // Зміна стилю навігації при прокрутці
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Анімації
function initializeAnimations() {
    // Анімація при прокрутці
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Для старих браузерів без підтримки IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
}

// Форми
function initializeForms() {
    const forms = document.querySelectorAll('form:not(#consultationForm)');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) return;
            
            const originalText = submitButton.innerHTML;
            
            try {
                // Показуємо стан завантаження
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner"></span> Відправляємо...';
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Симулюємо відправку даних на сервер
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                showNotification('Успішно відправлено!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Сталася помилка. Спробуйте ще раз.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    });
}

// Сповіщення
function showNotification(message, type = 'success') {
    // Перевіряємо, чи вже є нотифікація на сторінці
    let notification = document.querySelector('.notification');
    
    // Якщо нотифікації немає, створюємо нову
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
    }
    
    // Встановлюємо клас залежно від типу повідомлення
    notification.className = 'notification ' + type;
    notification.textContent = message;
    
    // Показуємо нотифікацію
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Приховуємо нотифікацію через 3 секунди
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Видаляємо елемент через 500мс після зникнення
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Ініціалізація форми консультації
function initializeConsultationForm() {
    const showModalButtons = document.querySelectorAll('.show-consultation-modal');
    const modal = document.getElementById('consultationModal');
    const form = document.getElementById('consultationForm');
    
    if (!modal || !form) return;
    
    // Показати модальне вікно при кліку на кнопку
    showModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }, 10);
        });
    });

    // Закрити модальне вікно при кліку поза формою
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    });

    // Маска для телефону
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 9) value = value.slice(0, 9);
            
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i === 2 || i === 5 || i === 7) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            
            e.target.value = formatted;
        });
    }

    // Промокод
    const hasPromoCheckbox = document.getElementById('hasPromo');
    const promoCodeGroup = document.querySelector('.promo-code-input');
    
    if (hasPromoCheckbox && promoCodeGroup) {
        hasPromoCheckbox.addEventListener('change', () => {
            promoCodeGroup.style.display = hasPromoCheckbox.checked ? 'block' : 'none';
        });
    }

    // Обробка відправки форми
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Відправляємо...';
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.timestamp = new Date().toLocaleString();
            
            // Відправка даних на сервер
            const response = await fetch('/api/submit-consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Помилка при відправці даних');
            }
            
            showNotification('Дякуємо за заявку! Ми зв\'яжемося з вами найближчим часом.', 'success');
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
            form.reset();
        } catch (error) {
            showNotification('Сталася помилка. Спробуйте ще раз.', 'error');
            console.error('Помилка:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}

// Обробка форми зворотного зв'язку у футері
function initializeFooterFeedbackForm() {
    const footerFeedbackForm = document.getElementById('footer-feedback-form');
    
    if (footerFeedbackForm) {
        footerFeedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('footer-name').value;
            const phone = document.getElementById('footer-phone').value;
            const message = document.getElementById('footer-message').value;
            
            if (!name || !phone || !message) {
                showNotification('Будь ласка, заповніть всі поля', 'error');
                return;
            }
            
            const submitButton = footerFeedbackForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            try {
                submitButton.disabled = true;
                submitButton.innerHTML = '<span class="spinner"></span> Відправляємо...';
                
                const data = {
                    name: name,
                    phone: phone,
                    message: message,
                    timestamp: new Date().toLocaleString()
                };
                
                // Відправка даних на сервер
                const response = await fetch('/api/submit-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    throw new Error('Помилка при відправці даних');
                }
                
                showNotification('Дякуємо за повідомлення! Ми зв\'яжемось з вами найближчим часом.', 'success');
                footerFeedbackForm.reset();
            } catch (error) {
                showNotification('Сталася помилка. Спробуйте ще раз.', 'error');
                console.error('Помилка:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }
} 