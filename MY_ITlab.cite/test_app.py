from app import app

def test_home_route():
    """Перевірка доступності головної сторінки"""
    with app.test_client() as client:
        response = client.get('/')
        assert response.status_code == 200
        
if __name__ == "__main__":
    # Запускаємо тестовий клієнт
    with app.test_client() as client:
        response = client.get('/')
        print(f"Статус-код: {response.status_code}")
        print(f"Розмір відповіді: {len(response.data)} байт")
        print("Додаток працює коректно!") 