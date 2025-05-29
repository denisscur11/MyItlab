# MyItlab

Це Flask-проєкт для IT-лабораторії.

## Запуск локально

1. Встановіть залежності:
    ```
    pip install -r requirements.txt
    ```
2. Запустіть застосунок:
    ```
    python app.py
    ```

## Деплой на Render

- requirements.txt має бути в корені репозиторію.
- Build Command: `pip install -r requirements.txt`
- Start Command: `python app.py` або `gunicorn app:app`
