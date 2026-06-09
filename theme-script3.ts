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

walkSync('./src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/bg-\[#6366f1\] text-slate-800/g, 'bg-[#6366f1] text-white');
  content = content.replace(/bg-blue-300/g, 'bg-indigo-300');
  content = content.replace(/file:bg-\[#6366f1\] file:text-slate-800 hover:file:bg-blue-700/g, 'file:bg-[#6366f1] file:text-white hover:file:bg-[#4f46e5]');
  fs.writeFileSync(filepath, content);
});
console.log('Script completed.');
