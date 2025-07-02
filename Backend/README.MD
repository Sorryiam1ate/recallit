# RecallIt

## Требования

- Python 3.11
- virtualenv (рекомендуется)
- SQLite (зависит от настроек)

## Структура проекта

- `frontend/` - React + Next.js приложение
- `backend/` - Django API (в разработке)

## Подготовка бэкенд-части для запуска

```bash
# Переход в директорию фронтенда
cd backend

# Создание виртуального окружения
python -m venv venv

# Запуск виртуального окружения
source venv/Scripts/activate

# Загрузить библиотеку для изолирования окружения
pip install virtualenv

# Подгрузка зависимостей
pip install -r requirements.txt

# Создать миграции БД
python manage.py makemigrations

# Приминить миграции
python manage.py migrate
```

## Запуск бэкенда на локальном сервере

```bash

python manage.py runserver
```

Приложение будет доступно по адресу [http://localhost:8000](http://localhost:8000)

Открыть Redoc или Swagger

```
http://127.0.0.1:8000/api/swagger/
```
