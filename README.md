# RecallIt

## Требования

### FRONT
- Node.js >= 18.18.0 (рекомендуется)
- npm или yarn

### BACK
- Python 3.11
- virtualenv (рекомендуется)
- SQLite (зависит от настроек)

## Структура проекта

- `frontend/` - React + Next.js приложение
- `backend/` - Django API

## Запуск FRONTEND-части

```bash
# Переход в директорию фронтенда
cd frontend

# Установка зависимостей
npm install
# или
yarn install

# Запуск в режиме разработки
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Дополнительные команды

```bash
# Сборка для продакшена
npm run build

# Запуск собранного приложения
npm run start

# Проверка кода линтером
npm run lint
```

## Примечание

Текущая версия Next.js (15.3.4) требует Node.js версии 18.18.0 или выше. При использовании более старой версии Node.js могут возникать предупреждения, но базовая функциональность должна работать.


## Подготовка BACKEND-части для запуска

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
