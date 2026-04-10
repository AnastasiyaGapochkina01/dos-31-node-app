# Node dual mode app

- `static` — контейнер только раздает содержимое `dist/`
- `serve` — контейнер запускает Node.js/Express сервер и API

## Локальный запуск

```bash
npm ci
npm run build
npm start
```

## Проверка

- static: `http://localhost:3000`
- serve: `http://localhost:3000`
- serve API: `http://localhost:3000/api/health`
