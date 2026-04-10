import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', mode: 'server', time: new Date().toISOString() });
});

app.get('/api/message', (_req, res) => {
  res.json({
    message: 'Hello from Node server mode',
    pid: process.pid,
    env: process.env.NODE_ENV || 'development'
  });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server mode listening on ${port}`);
});
