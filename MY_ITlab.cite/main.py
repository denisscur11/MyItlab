from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

# Дані про компанію
company_info = {
    'name': 'My ITlab',
    'founded': '2023',
    'slogan': 'Вчимося програмувати разом',
    'mission': 'Наша мета — створити дружнє середовище для навчання основ програмування',
    'phone': '+38 (050) 205-41-28',
    'email': 'myitlab2025@gmail.com',
    'social_media': {
        'facebook': 'https://www.facebook.com/people/%D0%9C%D1%96%D1%88%D0%B0-%D0%9C%D1%96%D1%88%D0%B0/pfbid02Zh8TJFJ17iFn2Jbxrzj2g9jrpNi2XT5HVVeigsgdWg3TgGhKQnWFFdgg4J6f6qCql/?locale=uk_UA',
        'instagram': 'https://www.instagram.com/my_it_lab/',
        'telegram': 'https://t.me/My_ITlab_bot',
        'linkedin': 'https://www.linkedin.com/in/денис-itlab-25a4a2368',
        'tiktok': 'https://www.tiktok.com/@myitlab.academy?is_from_webapp=1&sender_device=pc'
    }
}

# Дані про курси
courses = {
    'web-dev': {
        'title': 'Веб розробка',
        'description': 'Базовий курс з веброзробки для початківців. HTML, CSS та основи JavaScript — старт для розуміння як працюють веб-сайти.',
        'start_date': 'Старт у червні',
        'duration': '3 місяці',
        'bestseller': True,
        'color': '#2B3A67',
        'price': '2500₴ / місяць',
        'level': 'Початківець',
        'group_size': '12-15',
        'benefits': [
            'Щотижневі практичні завдання',
            '4 міні-проекти протягом курсу',
            'Індивідуальні консультації',
            'Відеозаписи занять',
            'Спільнота однодумців'
        ]
    },
    'python': {
        'title': 'Python',
        'description': 'Вступ до програмування на Python. Основи синтаксису, робота з даними, написання простих програм та автоматизація завдань.',
        'start_date': 'Старт у червні',
        'duration': '2 місяці',
        'bestseller': False,
        'color': '#2C5364',
        'price': '2000₴ / місяць',
        'level': 'Початківець',
        'group_size': '12-15',
        'benefits': [
            'Щотижневі практичні завдання',
            '3 міні-проекти протягом курсу',
            'Індивідуальні консультації',
            'Відеозаписи занять',
            'Спільнота однодумців'
        ]
    },
    'python-kids': {
        'title': 'Python для дітей',
        'description': 'Курс програмування для дітей 12-16 років. Створюй прості ігри та програми, вивчай основи логіки та алгоритмів.',
        'start_date': 'Старт у червні',
        'duration': '2 місяці',
        'bestseller': False,
        'color': '#373B44',
        'price': '1500₴ / місяць',
        'level': 'Початківець',
        'group_size': '12-15',
        'benefits': [
            'Навчання в ігровій формі',
            '4 цікавих проекти',
            'Вивчення через створення ігор',
            'Відеозаписи занять',
            'Дружня атмосфера'
        ]
    }
}

# Команда
team_members = [
    {
        'name': 'Не визначено',
        'position': 'Викладач',
        'photo': '/static/images/team/teacher-placeholder.svg',
        'bio': 'Інформація про викладача буде доступна пізніше.',
        'social': {
            'linkedin': '#',
            'github': '#'
        }
    }
]

# Дані для FAQ
faq_items = [
    {
        'question': 'Чи потрібні попередні знання для вивчення програмування?',
        'answer': 'Ні, наші курси розраховані саме на початківців без досвіду. Ми пояснюємо все з нуля, крок за кроком. Головне — ваше бажання вчитися та виконувати домашні завдання.',
        'category': 'Навчання'
    },
    {
        'question': 'Як проходить навчання в My ITlab?',
        'answer': 'Навчання включає онлайн-заняття двічі на тиждень (по 1,5-2 години), доступ до матеріалів та записів уроків, домашні завдання з перевіркою та зворотним зв\'язком. Ми зосереджуємося на практиці та неформальному спілкуванні.',
        'category': 'Навчання'
    },
    {
        'question': 'Скільки годин потрібно присвячувати навчанню?',
        'answer': 'Окрім занять (3-4 години на тиждень), рекомендуємо виділяти ще 4-6 годин на домашні завдання та закріплення матеріалу. Загалом це близько 8-10 годин на тиждень.',
        'category': 'Навчання'
    },
    {
        'question': 'Чи зможу я знайти роботу після курсу?',
        'answer': 'Наші курси дають базові знання та навички для старту в IT. Успішне працевлаштування залежить від вашої самостійної роботи, додаткової практики та ринкової ситуації.',
        'category': 'Працевлаштування'
    },
    {
        'question': 'Що я отримаю після закінчення курсу?',
        'answer': 'Після курсу ви отримаєте практичні навички, досвід роботи над реальними проектами та розуміння процесів розробки. Це дозволить вам продовжувати самостійно розвиватися в обраному напрямку.',
        'category': 'Навчання'
    },
    {
        'question': 'Як відбувається оплата курсів?',
        'answer': 'Ми пропонуємо гнучкі варіанти оплати: повна оплата курсу (зі знижкою 10%) або оплата двома частинами.',
        'category': 'Оплата'
    },
    {
        'question': 'Що робити, якщо я пропустив заняття?',
        'answer': 'Не хвилюйтеся! Всі заняття записуються, тому ви зможете переглянути матеріал у зручний час. Також ви можете задати запитання в нашому закритому чаті спільноти або на наступному занятті.',
        'category': 'Навчання'
    },
    {
        'question': 'Чи можу я змінити курс, якщо зрозумію, що обрав не той напрямок?',
        'answer': 'Так, протягом перших двох тижнів ви можете змінити курс. Ми перерахуємо оплату на новий курс. Наша мета — щоб ви отримали знання, які вам дійсно цікаві та корисні.',
        'category': 'Курси'
    },
    {
        'question': 'Чи є у вас система знижок?',
        'answer': 'Так, ми пропонуємо знижки для студентів, при оплаті повної вартості курсу, а також для тих, хто приводить друзів. Слідкуйте за нашими соціальними мережами для спеціальних пропозицій та акцій.',
        'category': 'Оплата'
    },
    {
        'question': 'Чи можу я навчатися, якщо у мене повна зайнятість на роботі?',
        'answer': 'Так, наші заняття проходять у вечірній час, а всі матеріали та записи доступні цілодобово. Також ви можете виконувати домашні завдання у вихідні дні. Багато наших студентів успішно поєднують навчання з роботою.',
        'category': 'Навчання'
    }
]

# Відгуки студентів
testimonials = [
    {
        'name': 'Анна Кравченко',
        'photo': '/static/images/team/student-1.svg',
        'course': 'Веб розробка',
        'rating': 5,
        'text': 'Чудовий курс для повних початківців! За 3 місяці я нарешті зрозуміла як працюють веб-сайти та створила свою першу сторінку. Дуже дружня атмосфера.',
        'position': 'Студентка'
    },
    {
        'name': 'Сергій Мельник',
        'photo': '/static/images/team/student-2.svg',
        'course': 'Python',
        'rating': 4,
        'text': 'Прийшов на курс без жодних знань у програмуванні. Завдяки практичним завданням та терплячому підходу викладача, зміг освоїти основи Python.',
        'position': 'Бухгалтер'
    },
    {
        'name': 'Оксана Литвин',
        'photo': '/static/images/team/student-3.svg',
        'course': 'Веб розробка',
        'rating': 5,
        'text': 'Давно хотіла спробувати програмування, але боялася. Завдяки курсу подолала свій страх! Тепер розумію основи HTML та CSS, і це дуже надихає.',
        'position': 'Маркетолог'
    }
]

@app.route('/')
def home():
    return render_template('index.html', courses=courses, testimonials=testimonials, 
                          company_info=company_info, faq_items=faq_items)

@app.route('/courses')
def courses_page():
    return render_template('courses.html', courses=courses, company_info=company_info)

@app.route('/course/<course_id>')
def course_detail(course_id):
    course = courses.get(course_id)
    if course:
        return render_template('course_detail.html', course=course, company_info=company_info)
    return redirect('/courses')

@app.route('/about')
def about_page():
    return render_template('about.html', team_members=team_members, company_info=company_info)

@app.route('/graduates')
def graduates_page():
    return render_template('graduates.html', testimonials=testimonials, company_info=company_info)

@app.route('/contact', methods=['GET', 'POST'])
def contact_page():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        # TODO: Add email sending logic
        return redirect('/contact')
    return render_template('contact.html', company_info=company_info)

@app.route('/faq')
def faq_page():
    return render_template('faq.html', faq_items=faq_items, company_info=company_info)

@app.route('/ask-question', methods=['GET', 'POST'])
def ask_question_page():
    if request.method == 'POST':
        # Обробка форми для питань
        return render_template('ask_question.html', success=True, company_info=company_info)
    return render_template('ask_question.html', company_info=company_info)

@app.route('/privacy')
def privacy_page():
    return render_template('privacy.html', company_info=company_info)

@app.route('/terms')
def terms_page():
    return render_template('terms.html', company_info=company_info)

@app.route('/cookies')
def cookies_page():
    return render_template('cookies.html', company_info=company_info)

@app.route('/enroll')
def enroll_page():
    return render_template('enroll.html', courses=courses, company_info=company_info)

@app.route('/thank-you')
def thank_you_page():
    return render_template('thank_you.html', company_info=company_info)

# API для надсилання форм
consultation_requests = []
contact_requests = []

@app.route('/api/submit-consultation', methods=['POST'])
def submit_consultation():
    if request.method == 'POST':
        data = request.json
        data['timestamp'] = request.json.get('timestamp', '')
        consultation_requests.append(data)
        return jsonify({"success": True, "message": "Заявка успішно отримана"}), 200
    return jsonify({"success": False, "message": "Помилка запиту"}), 400

@app.route('/api/submit-contact', methods=['POST'])
def submit_contact():
    if request.method == 'POST':
        data = request.json
        data['timestamp'] = request.json.get('timestamp', '')
        contact_requests.append(data)
        return jsonify({"success": True, "message": "Запитання успішно отримане"}), 200
    return jsonify({"success": False, "message": "Помилка запиту"}), 400

# Адмін-панель
@app.route('/admin/requests', methods=['GET'])
def admin_requests():
    password = request.args.get('key')
    if password != 'admin123':
        return "Доступ заборонено", 403
    
    return render_template('admin/requests.html', 
                          consultation_requests=consultation_requests,
                          contact_requests=contact_requests,
                          company_info=company_info)

@app.route('/admin', methods=['GET', 'POST'])
def admin_panel():
    if request.method == 'POST':
        password = request.form.get('password')
        if password == 'k4k4r4za':
            return render_template('admin/dashboard.html',
                                  consultation_requests=consultation_requests,
                                  contact_requests=contact_requests,
                                  company_info=company_info)
        else:
            return render_template('admin/login.html', error="Невірний пароль", company_info=company_info)
    
    return render_template('admin/login.html', company_info=company_info)

@app.route('/admin/dashboard/<key>', methods=['GET'])
def admin_direct(key):
    if key == 'k4k4r4za':
        return render_template('admin/dashboard.html',
                              consultation_requests=consultation_requests,
                              contact_requests=contact_requests,
                              company_info=company_info)
    else:
        return redirect('/admin')

if __name__ == '__main__':
    app.run(debug=True)
