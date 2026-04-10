import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const file of fs.readdirSync(publicDir)) {
  fs.copyFileSync(path.join(publicDir, file), path.join(distDir, file));
}

const stamp = new Date().toISOString();
fs.writeFileSync(path.join(distDir, 'build-info.json'), JSON.stringify({ builtAt: stamp }, null, 2));
console.log(`Build completed at ${stamp}`);
