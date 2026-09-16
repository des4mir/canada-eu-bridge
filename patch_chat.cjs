const fs = require('fs');
let code = fs.readFileSync('src/components/ChatAssistant.tsx', 'utf8');

code = code.replace(/bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950/g, 'bg-slate-950 border-b border-slate-900');
code = code.replace(/shadow-2xl/g, 'shadow-lg'); // Avoid extreme soft shadows
code = code.replace(/font-extrabold/g, 'font-semibold');
code = code.replace(/font-bold/g, 'font-medium');

fs.writeFileSync('src/components/ChatAssistant.tsx', code);
