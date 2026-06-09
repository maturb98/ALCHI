import fs from 'fs';
import path from 'path';

const walkSync = (dir: string, callback: (filepath: string) => void) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      walkSync(filepath, callback);
    } else if (stats.isFile() && filepath.endsWith('.tsx')) {
      callback(filepath);
    }
  });
};

walkSync('./src/components', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/bg-white rounded-xl border border-slate-100 shadow-sm/g, 'panel');
  content = content.replace(/bg-white rounded-xl shadow-xl/g, 'panel shadow-2xl');
  content = content.replace(/bg-white rounded-xl border border-slate-150 overflow-hidden shadow-xs/g, 'panel overflow-hidden');
  content = content.replace(/w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200\/10/g, 'w-full max-w-md panel shadow-2xl border-none');
  fs.writeFileSync(filepath, content);
});
console.log('Script completed.');
