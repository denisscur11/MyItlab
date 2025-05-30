import sys
import os

# Додавання поточної директорії до шляху пошуку модулів
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app as application

# Для сумісності з деякими WSGI серверами
app = application

if __name__ == "__main__":
    application.run() 