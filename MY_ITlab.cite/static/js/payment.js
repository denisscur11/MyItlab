// JavaScript для сторінки Оплати (payment.js)

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сторінка оплати завантажена!');

    const courseSelect = document.getElementById('payment-course-selection');
    const paymentTypeRadios = document.querySelectorAll('input[name="paymentType"]');
    const fullPaymentAmountSpan = document.getElementById('full-payment-amount');
    const partialPaymentAmountSpan = document.getElementById('partial-payment-amount');
    const totalAmountDisplay = document.getElementById('total-amount-display');
    const paymentForm = document.getElementById('course-payment-form');
    const proceedToPaymentBtn = document.getElementById('proceed-to-payment-btn');
    const paymentMessage = document.getElementById('payment-message');

    function updatePaymentAmounts() {
        const selectedOption = courseSelect.options[courseSelect.selectedIndex];
        if (!selectedOption || selectedOption.value === "") {
            if (fullPaymentAmountSpan) fullPaymentAmountSpan.textContent = '0';
            if (partialPaymentAmountSpan) partialPaymentAmountSpan.textContent = '0';
            if (totalAmountDisplay) totalAmountDisplay.textContent = '0 грн';
            return;
        }

        const fullPrice = parseFloat(selectedOption.dataset.fullprice) || 0;
        const partialPrice = parseFloat(selectedOption.dataset.partialprice) || 0;

        if (fullPaymentAmountSpan) fullPaymentAmountSpan.textContent = fullPrice.toFixed(2);
        if (partialPaymentAmountSpan) partialPaymentAmountSpan.textContent = partialPrice.toFixed(2);

        let amountToPay = 0;
        document.querySelectorAll('input[name="paymentType"]').forEach(radio => {
            if (radio.checked) {
                if (radio.value === 'full') {
                    amountToPay = fullPrice;
                } else if (radio.value === 'partial') {
                    amountToPay = partialPrice;
                }
            }
        });
        if (totalAmountDisplay) totalAmountDisplay.textContent = `${amountToPay.toFixed(2)} грн`;
    }

    if (courseSelect) {
        courseSelect.addEventListener('change', updatePaymentAmounts);
        // Перевірка, чи є параметр course_id в URL для попереднього вибору курсу
        const urlParams = new URLSearchParams(window.location.search);
        const courseIdFromUrl = urlParams.get('course_id');
        if (courseIdFromUrl) {
            courseSelect.value = courseIdFromUrl;
        }
    }

    paymentTypeRadios.forEach(radio => {
        radio.addEventListener('change', updatePaymentAmounts);
    });

    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener('click', function() {
            const payerName = document.getElementById('payer-name').value;
            const payerEmail = document.getElementById('payer-email').value;
            const selectedCourseOption = courseSelect.options[courseSelect.selectedIndex];

            if (!selectedCourseOption || selectedCourseOption.value === "") {
                displayMessage('Будь ласка, оберіть курс для оплати.', 'error');
                return;
            }
            if (!payerName || !payerEmail) {
                displayMessage('Будь ласка, заповніть ім\'я та email платника.', 'error');
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(payerEmail)) {
                displayMessage('Будь ласка, введіть коректний email.', 'error');
                return;
            }


            const courseName = selectedCourseOption.text.split(' - ')[0];
            const amount = totalAmountDisplay.textContent;

            displayMessage(`Підготовка до оплати курсу "${courseName}" на суму ${amount}...`, 'success');
            // Імітація переходу до платіжної системи
            setTimeout(() => {
                alert(`Симуляція переходу до платіжної системи для оплати ${amount} за курс "${courseName}".\nПлатник: ${payerName}, Email: ${payerEmail}\n\n(В реальному проекті тут буде інтеграція з LiqPay/Stripe тощо)`);
                // paymentForm.submit(); // Якщо форма відправляється на сервер для обробки платежу
                paymentForm.reset();
                updatePaymentAmounts(); // Оновити суми до нулів
                displayMessage('Форму очищено.', 'success');
            }, 2000);
        });
    }

    function displayMessage(message, type) {
        if (paymentMessage) {
            paymentMessage.textContent = message;
            paymentMessage.className = `form-message ${type}`; // 'success' or 'error'
            paymentMessage.style.display = 'block';
            setTimeout(() => {
                paymentMessage.style.display = 'none';
            }, 5000); // Приховати повідомлення через 5 секунд
        }
    }

    // Ініціалізація сум при завантаженні сторінки
    updatePaymentAmounts();
});