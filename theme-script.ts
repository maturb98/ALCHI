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
  content = content.replace(/bg-blue-600/g, 'bg-[#6366f1]');
  content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#4f46e5]');
  content = content.replace(/text-blue-50/g, 'text-[#e0e7ff]');
  content = content.replace(/text-blue-500/g, 'text-[#6366f1]');
  content = content.replace(/text-blue-600/g, 'text-[#6366f1]');
  content = content.replace(/text-blue-700/g, 'text-[#4f46e5]');
  content = content.replace(/bg-blue-50/g, 'bg-[#e0e7ff]');
  content = content.replace(/bg-slate-900/g, 'bg-[#ffffff]');
  content = content.replace(/bg-slate-950\/40/g, 'bg-[#ffffff]');
  content = content.replace(/bg-slate-950\/30/g, 'bg-[#ffffff]');
  // Make borders slate-200 rather than slate-800
  content = content.replace(/border-slate-800/g, 'border-slate-200');
  content = content.replace(/border-slate-850/g, 'border-slate-200');
  // Panel styles
  content = content.replace(/bg-white rounded-2xl shadow-xl border border-slate-200/g, 'panel');
  content = content.replace(/bg-white rounded-2xl shadow-lg border border-slate-200/g, 'panel');
  // Text for stats
  content = content.replace(/text-white/g, 'text-slate-800');
  content = content.replace(/text-slate-400 hover:text-slate-800/g, 'text-slate-500 hover:text-[#6366f1]');
  
  fs.writeFileSync(filepath, content);
});
console.log('Script completed.');
