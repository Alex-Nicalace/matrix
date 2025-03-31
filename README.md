# Asset Portfolio Manager

## Что это

[Тестовое задание](https://docs.google.com/document/d/1PcYataTm6J2zJ7gXp-MBzBcY5c8yeegJhObGmCnkESo/edit?tab=t.0).

Демо - https://matrix-opal-nine.vercel.app/

## Запуск проекта

### Установка зависимостей

```bash
npm install
```

### Запуск проекта в режиме разработки

```bash
npm run dev
```

### Сборка проекта

```bash
npm run build
```

## Архитектура проекта

```
📦 project-root
 ┣ 📂 public               # Статические файлы (favicon, index.html и др.)
 ┣ 📂 src                  # Исходный код приложения
 ┃ ┣ 📂 assets             # Шрифты и другие медиафайлы
 ┃ ┣ 📂 components         # UI-компоненты (Button, Input, Dialog и др.)
 ┃ ┣ 📂 features           # Фичи приложения (например, управление активами)
 ┃ ┣ 📂 hooks              # Кастомные React-хуки
 ┃ ┣ 📂 services           # API-запросы (REST, WebSocket)
 ┃ ┣ 📂 styles             # Глобальные и модульные SCSS-стили
 ┃ ┣ 📂 types              # TypeScript-описания типов
 ┃ ┣ 📂 utils              # Вспомогательные функции
 ┃ ┣ 📜 App.tsx            # Главный компонент приложения
 ┃ ┣ 📜 main.tsx           # Точка входа в приложение
 ┃ ┗ 📜 store.ts           # Redux-хранилище
 ┣ 📜 .gitignore           # Исключения для Git
 ┣ 📜 package.json         # Зависимости и команды npm
 ┣ 📜 tsconfig.json        # Настройки TypeScript
 ┣ 📜 vite.config.ts       # Конфигурация Vite
 ┗ 📜 README.md            # Документация проекта
```

## Используемые технологии

- **React** + **TypeScript** — основа проекта
- **Vite** — инструмент для сборки
- **Redux Toolkit** — управление состоянием
- **SCSS** — стилизация
- **WebSocket API** — обновление данных в реальном времени
- **Binance API** — получение финансовых данных
