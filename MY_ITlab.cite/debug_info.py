import os
import sys

# Виведення поточної директорії
print("Поточна директорія:", os.getcwd())

# Виведення вмісту поточної директорії
print("Вміст директорії:")
for item in os.listdir():
    print(" -", item)

# Виведення шляхів пошуку модулів Python
print("\nШляхи пошуку модулів Python:")
for path in sys.path:
    print(" -", path)

# Спробуємо імпортувати модуль app
try:
    import app
    print("\nМодуль app успішно імпортовано")
    print("Розташування модуля app:", app.__file__)
except ImportError as e:
    print("\nПомилка імпорту модуля app:", str(e))

# Перевірка наявності файлу app.py
if os.path.exists("app.py"):
    print("\nФайл app.py існує в поточній директорії")
    print("Повний шлях:", os.path.abspath("app.py"))
else:
    print("\nФайл app.py не знайдено в поточній директорії") 